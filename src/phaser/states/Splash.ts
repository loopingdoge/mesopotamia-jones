import * as Phaser from 'phaser-ce'
import { centerGameObjects } from '../utils'

import * as DoorImage from '../../../assets/images/door.png'
import * as DudeImage from '../../../assets/images/dude.png'

import * as Room1 from '../../../assets/tilemaps/room1.json'
import * as Room2 from '../../../assets/tilemaps/room2.json'

import * as Tiles from '../../../assets/images/sheet.png'

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
        this.load.tilemap('room1', '', Room1, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room2', '', Room2, Phaser.Tilemap.TILED_JSON)
        this.load.image('tiles', Tiles)
        // this.load.image('mushroom', 'assets/images/mushroom2.png', 32, 48)
    }

    create() {
        this.state.start('Game')
    }
}
