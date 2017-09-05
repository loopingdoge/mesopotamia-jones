import * as Phaser from 'phaser-ce'

import { GameDoor, getGameDoorById } from '../../config/map'
import gameStore from '../../stores/gameStore'
import ActionButton from '../sprites/ActionButton'
import InteractionHint from '../sprites/InteractionHint'
import Joystick from '../sprites/Joystick'
import Keyboard from '../sprites/Keyboard'
import Player from '../sprites/Player'

export default class Game extends Phaser.State {
    player: Player
    joystick: Joystick
    keyboard: Keyboard
    actionButton: ActionButton
    walls: Phaser.Group
    layer: Phaser.TilemapLayer
    detectCollisionLines: Phaser.Line[]

    create() {
        this.game.stage.backgroundColor = '#E37710'
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        const map = this.game.add.tilemap(gameStore.room.id)

        map.addTilesetImage('sheet', 'tiles')

        this.layer = map.createLayer('Livello tile 1')

        map.setCollisionByExclusion(
            [7, 8, 9, 21, 22, 23, 35, 36, 37].map(n => n + 1)
        )

        //  This resizes the game world to match the layer dimensions
        this.layer.resizeWorld()

        let centerX: number = this.world.centerX
        let centerY: number = this.world.centerY

        if (gameStore.lastDoor) {
            const lastDoor: GameDoor = getGameDoorById(
                gameStore.lastDoor,
                gameStore.room
            )
            const lastDoorTile = map.getTile(lastDoor.x, lastDoor.y, this.layer)
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
            new Player({
                game: this.game,
                x: centerX,
                y: centerY,
                key: 'player'
            })
        )

        if (this.game.device.touch) {
            this.joystick = this.game.add.existing(
                new Joystick(
                    {
                        game: this.game,
                        x: 100,
                        y: 200,
                        key: 'joystick'
                    },
                    this.player.events
                )
            )
            this.actionButton = this.game.add.existing(
                new ActionButton({
                    game: this.game,
                    x: 400,
                    y: 200,
                    key: 'actionButton'
                })
            )
        } else {
            this.keyboard = this.game.add.existing(
                new Keyboard(this.game, this.player.events)
            )
        }
    }

    render() {
        // if ('debug') {
        //     this.detectCollisionLines.forEach(line => {
        //         this.game.debug.geom(line)
        //     })
        //     this.game.debug.spriteInfo(this.player, 32, 32)
        //     this.game.debug.body(this.player)
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
            this.layer,
            null,
            null,
            this
        )

        let nearTiles: Phaser.Tile[] = []

        this.detectCollisionLines.forEach(line => {
            const tiles = this.layer
                .getRayCastTiles(line, 1, true)
                .filter(tile => tile.index === 63 || tile.properties.isDoor)
            nearTiles = [...nearTiles, ...tiles]
        })

        nearTiles.forEach(tile => {
            this.onNearTile(tile)
        })

        if (nearTiles.length === 0) {
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
                this.activateDialogue('dialog1')
            }
            if (this.isCollisionWithDoor(tile)) {
                this.activateDoor(tile.x, tile.y)
            }
        }
    }

    isCollisionWithDoor(tile: Phaser.Tile) {
        return tile.properties.isDoor
    }

    activateDialogue(dialogueId: string) {
        gameStore.readyInteraction({ type: 'object', id: dialogueId })
    }

    activateDoor(x: number, y: number) {
        gameStore.readyInteraction({ type: 'door', x, y })
    }
}
