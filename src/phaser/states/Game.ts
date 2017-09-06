import * as Phaser from 'phaser-ce'

import { GameDoor, getGameDoorById } from '../../config/map'
import gameStore from '../../stores/gameStore'
import { coord2Pixel } from '../config'
import ActionButton from '../sprites/ActionButton'
import InteractionHint from '../sprites/InteractionHint'
import Joystick from '../sprites/Joystick'
import Keyboard from '../sprites/Keyboard'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import VonTalin from '../sprites/VonTalin'

export default class Game extends Phaser.State {
    player: Player
    npcs: Npc[] = []
    joystick: Joystick
    keyboard: Keyboard
    actionButton: ActionButton
    scene: Phaser.TilemapLayer
    characters: Phaser.Group
    detectCollisionLines: Phaser.Line[]

    create() {
        this.game.stage.backgroundColor = '#E37710'
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        const map = this.game.add.tilemap(gameStore.room.id)

        map.addTilesetImage('sheet', 'tiles')

        this.scene = map.createLayer('Livello tile 1')

        map.setCollisionByExclusion(
            [7, 8, 9, 21, 22, 23, 35, 36, 37].map(n => n + 1)
        )

        //  This resizes the game world to match the layer dimensions
        this.scene.resizeWorld()

        let centerX: number = this.world.centerX
        let centerY: number = this.world.centerY

        if (gameStore.lastDoor) {
            const lastDoor: GameDoor = getGameDoorById(
                gameStore.lastDoor,
                gameStore.room
            )
            const lastDoorTile = map.getTile(lastDoor.x, lastDoor.y, this.scene)
            let cX = lastDoorTile.centerX + lastDoorTile.left
            let cY = lastDoorTile.centerY + lastDoorTile.top
            switch (lastDoorTile.properties.direction) {
                case 'top':
                    cY -= lastDoorTile.height
                    break
                case 'left':
                    cX -= lastDoorTile.width
                    break
                case 'bottom':
                    cY += lastDoorTile.height
                    break
                case 'right':
                    cX += lastDoorTile.width
                    break
            }
            centerX = cX || centerX
            centerY = cY || centerY
        }

        this.player = this.game.add.existing(
            new Player(this.game, centerX, centerY)
        )

        if (this.game.device.touch) {
            this.joystick = this.game.add.existing(
                new Joystick(this.game, 100, 200, this.player.events)
            )
            this.actionButton = this.game.add.existing(
                new ActionButton(this.game, 400, 200)
            )
        } else {
            this.keyboard = this.game.add.existing(
                new Keyboard(this.game, this.player.events)
            )
        }

        if (gameStore.room.id === 'room2') {
            this.npcs = [
                new VonTalin(this.game, coord2Pixel(13), coord2Pixel(1))
            ]
            this.game.add.existing(this.npcs[0])
        }

        this.characters = new Phaser.Group(this.game)
        this.characters.add(this.player)
        this.characters.addMultiple(this.npcs)
        this.characters.bringToTop(this.player)
    }

    render() {
        // if ('debug') {
        //     this.detectCollisionLines.forEach(line => {
        //         this.game.debug.geom(line)
        //     })
        //     this.game.debug.spriteInfo(this.player, 32, 32)
        //     this.game.debug.body(this.player)
        //     this.game.debug.body(this.npcs[0])
        //     this.game.debug.body(this.joystick.getChildAt(1) as Phaser.Sprite)
        //     this.game.debug.spriteInfo(this.joystick.getChildAt(1) as Phaser.Sprite, 32, 32)
        // }
    }

    update() {
        this.detectCollisionLines = [
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x,
                this.player.position.y + 30
            ), // down
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x + 30,
                this.player.position.y
            ), // right
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x,
                this.player.position.y - 15
            ), // up
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x - 30,
                this.player.position.y
            ) // left
        ]

        this.game.physics.arcade.collide(
            this.player,
            this.scene,
            null,
            null,
            this
        )

        this.npcs.forEach(npc =>
            this.game.physics.arcade.collide(this.player, npc, null, null, this)
        )

        let nearTiles: Phaser.Tile[] = []
        let nearNpc: Npc = null

        this.detectCollisionLines.forEach(line => {
            const tiles = this.scene
                .getRayCastTiles(line, 1, true)
                .filter(tile => tile.index === 63 || tile.properties.isDoor)
            nearTiles = [...nearTiles, ...tiles]
        })

        nearTiles.forEach(tile => {
            this.onNearTile(tile)
        })

        this.npcs.forEach(npc => {
            if (
                Phaser.Math.distance(
                    this.player.x,
                    this.player.y,
                    npc.x,
                    npc.y
                ) < 40
            ) {
                nearNpc = npc
                this.onNearNpc(npc)
            }
        })

        if (nearTiles.length === 0 && nearNpc === null) {
            this.player.hideInteractionHint()
            gameStore.removeInteraction()
        } else {
            this.player.showInteractionHint()
        }
    }

    reloadRoom() {
        this.game.add.tilemap(gameStore.room.id)
    }

    onNearTile(tile: Phaser.Tile) {
        if (gameStore.controlsEnabled) {
            if (tile.index === 63) {
                // this.activateDialogue('dialog1')
                this.activateChest('chest1')
            }
            if (this.isCollisionWithDoor(tile)) {
                this.activateDoor(tile.x, tile.y)
            }
        }
    }

    onNearNpc(npc: Npc) {
        if (gameStore.controlsEnabled) {
            const dialogueId = npc.dialogueInRoom(gameStore.room.id)
            this.activateDialogue(dialogueId)
        }
    }

    isCollisionWithDoor(tile: Phaser.Tile) {
        return tile.properties.isDoor
    }

    activateChest(chestId: string) {
        gameStore.readyInteraction({ type: 'object', id: chestId })
    }

    activateDialogue(dialogueId: string) {
        gameStore.readyInteraction({ type: 'npc', id: dialogueId })
    }

    activateDoor(x: number, y: number) {
        gameStore.readyInteraction({ type: 'door', x, y })
    }
}
