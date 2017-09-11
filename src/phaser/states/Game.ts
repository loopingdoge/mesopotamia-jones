import * as Phaser from 'phaser-ce'

import { Chest } from '../../config/chests'
import { GameDoor, getGameDoorById } from '../../config/map'

import gameStore from '../../stores/gameStore'
import { coord2Pixel } from '../config'
import ActionButton from '../sprites/ActionButton'
import ChestSprite from '../sprites/Chest'
import Hammurtossi from '../sprites/Hammurtossi'
import InteractionHint from '../sprites/InteractionHint'
import Joystick from '../sprites/Joystick'
import Keyboard from '../sprites/Keyboard'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import VonTalin from '../sprites/VonTalin'

type GameObject = ChestSprite

export default class Game extends Phaser.State {
    player: Player
    npcs: Npc[]
    joystick: Joystick
    keyboard: Keyboard
    actionButton: ActionButton
    map: Phaser.Tilemap
    scene: Phaser.TilemapLayer
    characters: Phaser.Group
    objects: Phaser.Group
    detectCollisionLines: Phaser.Line[]

    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    }

    create() {
        this.game.stage.backgroundColor = '#E37710'
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.map = this.game.add.tilemap(gameStore.room.id)

        this.map.addTilesetImage('sheet', 'tiles')

        this.scene = this.map.createLayer('Livello tile 1')

        this.map.setCollisionByExclusion(
            [7, 8, 9, 21, 22, 23, 35, 36, 37].map(n => n + 1)
        )

        //  This resizes the game world to match the layer dimensions
        this.scene.resizeWorld()

        this.createPlayer()

        this.createNpcs()

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
    }

    createPlayer() {
        let playerX: number = this.world.centerX
        let playerY: number = this.world.centerY

        if (gameStore.lastDoor) {
            const lastDoor: GameDoor = getGameDoorById(
                gameStore.lastDoor,
                gameStore.room
            )
            const lastDoorTile = this.map.getTile(
                lastDoor.x,
                lastDoor.y,
                this.scene
            )
            let cX = lastDoorTile.centerX + lastDoorTile.left
            let cY = lastDoorTile.centerY + lastDoorTile.top

            switch (lastDoorTile.properties.direction) {
                case 'top':
                    cY -= lastDoorTile.height + 10 // TODO: distanza precisa dal muro
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
            playerX = cX || playerX
            playerY = cY || playerY
        }

        this.player = this.game.add.existing(
            new Player(this.game, playerX, playerY)
        )
    }

    createObjects() {
        this.objects = this.game.add.group()
        this.objects.enableBody = true
        const objects = this.map.objects as any
        objects.items.forEach((object: any) => {
            if (object.type === 'chest') {
                this.objects.add(
                    this.game.add.existing(
                        new ChestSprite(
                            this.game,
                            object.x,
                            object.y,
                            object.name
                        )
                    )
                )
            }
        })
    }

    createNpcs() {
        this.npcs = []

        if (gameStore.room.id === 'room3') {
            this.npcs = [
                new VonTalin(this.game, coord2Pixel(7.5), coord2Pixel(2))
            ]
            this.game.add.existing(this.npcs[0])
        }
        if (gameStore.room.id === 'room5') {
            this.npcs = [
                new Hammurtossi(this.game, coord2Pixel(7.5), coord2Pixel(1))
            ]
            this.game.add.existing(this.npcs[0])
        }

        this.createObjects()

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

        this.game.physics.arcade.collide(this.player, this.objects)
        this.game.physics.arcade.collide(this.player, this.characters)

        let nearTiles: Phaser.Tile[] = []
        let nearNpc: Npc = null
        let nearItem: GameObject = null

        this.detectCollisionLines.forEach(line => {
            const tiles = this.scene
                .getRayCastTiles(line, 1, true)
                .filter(tile => tile.index === 63 || tile.properties.isDoor)
            nearTiles = [...nearTiles, ...tiles]
        })

        nearTiles.forEach(tile => {
            if (tile.properties.isDoor) {
                this.onNearTile(tile)
            }
        })

        this.npcs.forEach(npc => {
            if (this.isSpriteNearPlayer(npc)) {
                nearNpc = npc
                this.onNearNpc(npc)
            }
        })

        this.objects.forEach((item: GameObject) => {
            if (this.isSpriteNearPlayer(item)) {
                switch (item.objectId) {
                    case 'chest':
                        if (!gameStore.state.chests[item.chestId].open) {
                            nearItem = item
                            this.onNearChest(item)
                        }
                        break
                }
            }
        }, this)

        if (nearTiles.length === 0 && nearNpc === null && nearItem === null) {
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
                this.activateChest('chest1')
            }
            if (this.isCollisionWithDoor(tile)) {
                this.activateDoor(tile.x, tile.y)
            }
        }
    }

    onNearChest(chest: ChestSprite) {
        if (gameStore.controlsEnabled) {
            this.activateChest(chest.chestId)
        }
    }

    onNearNpc(npc: Npc) {
        if (gameStore.controlsEnabled) {
            const dialogueId = npc.dialogue(gameStore.state)
            this.activateDialogue(dialogueId)
        }
    }

    isCollisionWithDoor(tile: Phaser.Tile) {
        return tile.properties.isDoor
    }

    isSpriteNearPlayer = (sprite: Phaser.Sprite) =>
        Phaser.Math.distance(this.player.x, this.player.y, sprite.x, sprite.y) <
        40

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
