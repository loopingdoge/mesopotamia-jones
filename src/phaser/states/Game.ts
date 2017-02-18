/* globals __DEV__ */
declare const __DEV__: boolean
import * as Phaser from 'phaser'
import Dude from '../sprites/Dude'
import gameStore from '../../stores/gameStore'

export default class Game extends Phaser.State {

    player: Phaser.Sprite
    walls: Phaser.Group
    rdoor: Phaser.Sprite
    ldoor: Phaser.Sprite
    layer: Phaser.TilemapLayer

    init() {}

    preload() {}

    create() {
        this.game.stage.backgroundColor = '#E37710'
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        const map = this.game.add.tilemap(gameStore.room.id)
        map.addTilesetImage('sheet', 'tiles')

        this.layer = map.createLayer('Livello tile 1')
        map.setCollisionByExclusion([7, 8, 9, 21, 22, 23, 35, 36, 37].map(n => n + 1))

        //  This resizes the game world to match the layer dimensions
        this.layer.resizeWorld()

        this.player = this.game.add.existing(new Dude({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            key: 'dude'
        }))

    }

    render() {
        if (__DEV__) {
            // this.game.debug.spriteInfo(this.player, 32, 32)
            // this.game.debug.body(this.ldoor)
            // this.game.debug.body(this.player)
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.layer, this.onCollision, null, this)
    }

    reloadRoom() {
        this.game.add.tilemap(gameStore.room.id)
    }

    onCollision(player: Phaser.Sprite, collidedObject: Phaser.TilemapLayer) {
        if (this.isCollisionWithDoor(collidedObject)) {
            this.activateDoor(collidedObject.x, collidedObject.y)
        }
    }

    isCollisionWithDoor(collidedObject: Phaser.TilemapLayer) {
        // TODO: Aggiungere gli indici anche delle altre porte
        return collidedObject.index === 113
    }

    activateDoor(x: number, y: number) {
        gameStore.activateRiddle(x, y)
    }

}