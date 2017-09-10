import * as Phaser from 'phaser-ce'

import gameStore from '../../stores/gameStore'

import * as DoorImage from '../../../assets/images/door.png'
import * as DudeImage from '../../../assets/images/dude.png'

import * as Room1 from '../../../assets/tilemaps/room1.json'
import * as Room2 from '../../../assets/tilemaps/room2.json'
import * as Room3 from '../../../assets/tilemaps/room3.json'
import * as Room4 from '../../../assets/tilemaps/room4.json'
import * as Room5 from '../../../assets/tilemaps/room5.json'

import * as Tiles from '../../../assets/images/sheet.png'

import * as innerJoystick from '../../../assets/images/inner-circle.png'
import * as outerJoystick from '../../../assets/images/outer-circle.png'

import * as pressF from '../../../assets/images/pressf.png'

export default class Boot extends Phaser.State {
    loaderBg: Phaser.Sprite
    loaderBar: Phaser.Sprite

    preload() {
        this.load.spritesheet('player', DudeImage as any, 32, 48)
        this.load.spritesheet('npc', DudeImage as any, 32, 48)
        this.load.tilemap('room1', '', Room1, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room2', '', Room2, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room3', '', Room3, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room4', '', Room4, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room5', '', Room5, Phaser.Tilemap.TILED_JSON)
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
