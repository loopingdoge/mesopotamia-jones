/* globals __DEV__ */
declare const __DEV__: boolean
import * as Phaser from 'phaser-ce'
import Dude from '../sprites/Dude'
import gameStore from '../../stores/gameStore'
import { GameDoor, getGameDoorById } from '../../config/map'

export default class Game extends Phaser.State {
    player: Phaser.Sprite
    walls: Phaser.Group
    layer: Phaser.TilemapLayer

    init() {}

    preload() {}

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
            let lastDoor: GameDoor = getGameDoorById(
                gameStore.lastDoor,
                gameStore.room
            )
            let lastDoorTile = map.getTile(lastDoor.x, lastDoor.y, this.layer)
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
            new Dude({
                game: this.game,
                x: centerX,
                y: centerY,
                key: 'dude'
            })
        )
    }

    render() {
        if (__DEV__) {
            // this.game.debug.spriteInfo(this.player, 32, 32)
            // this.game.debug.body(this.ldoor)
            // this.game.debug.body(this.player)
        }
    }

    update() {
        this.game.physics.arcade.collide(
            this.player,
            this.layer,
            this.onCollision,
            null,
            this
        )
    }

    reloadRoom() {
        this.game.add.tilemap(gameStore.room.id)
    }

    onCollision(player: Phaser.Sprite, collidedObject: Phaser.TilemapLayer) {
        if (collidedObject.index === 63) gameStore.showDialog('dialog1')
        if (this.isCollisionWithDoor(collidedObject)) {
            this.activateDoor(collidedObject.x, collidedObject.y)
        }
    }

    isCollisionWithDoor(collidedObject: Phaser.TilemapLayer) {
        const c = collidedObject as any
        return c.properties.isDoor
    }

    activateDoor(x: number, y: number) {
        gameStore.activateRiddle(x, y)
    }
}
