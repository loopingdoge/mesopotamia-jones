import * as Phaser from 'phaser-ce'
import { centerGameObjects } from '../utils'

import * as DoorImage from '../../../assets/images/door.png'
import * as DudeImage from '../../../assets/images/dude.png'

import * as Room1 from '../../../assets/tilemaps/room1.json'
import * as Room2 from '../../../assets/tilemaps/room2.json'

import * as Tiles from '../../../assets/images/sheet.png'

import * as innerJoystick from '../../../assets/images/inner-circle.png'
import * as outerJoystick from '../../../assets/images/outer-circle.png'

import * as pressF from '../../../assets/images/pressf.png'

export default class Splash extends Phaser.State {
    loaderBg: Phaser.Sprite
    loaderBar: Phaser.Sprite

    init() {}

    preload() {
        this.loaderBg = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBg'
        )
        this.loaderBar = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBar'
        )
        centerGameObjects([this.loaderBg, this.loaderBar])

        this.load.setPreloadSprite(this.loaderBar)
        //
        // load your assets
        //
        this.load.spritesheet('player', DudeImage as any, 32, 48)
        this.load.spritesheet('npc', DudeImage as any, 32, 48)
        this.load.tilemap('room1', '', Room1, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room2', '', Room2, Phaser.Tilemap.TILED_JSON)
        this.load.image('tiles', Tiles)

        this.load.image('joystick', outerJoystick)
        this.load.image('innerJoystick', innerJoystick)
        this.load.image('actionButton', innerJoystick)
        this.load.image('pressf', pressF)
    }

    create() {
        this.state.start('Game')
    }
}
