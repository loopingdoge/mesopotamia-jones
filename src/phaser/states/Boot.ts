import * as Phaser from 'phaser-ce'

import gameStore from '../../stores/gameStore'

import * as DogeImage from '../../../assets/images/doge-sprite.png'
import * as DoorImage from '../../../assets/images/door.png'
import * as HammurtoshSprite from '../../../assets/images/hammurtosh-sprite.png'
import * as JonesSprite from '../../../assets/images/jones-sprite.png'
import * as VonTalinSprite from '../../../assets/images/von-talin-sprite.png'

import * as ChestClose from '../../../assets/images/chest-close.png'
import * as ChestOpen from '../../../assets/images/chest-open.png'

import * as Room1 from '../../../assets/tilemaps/room1.json'
import * as Room2 from '../../../assets/tilemaps/room2.json'
import * as Room3 from '../../../assets/tilemaps/room3.json'
import * as Room4 from '../../../assets/tilemaps/room4.json'
import * as Room5 from '../../../assets/tilemaps/room5.json'
import * as Room6 from '../../../assets/tilemaps/room6.json'

import * as Tiles from '../../../assets/images/sheet.png'

import * as innerJoystick from '../../../assets/images/inner-circle.png'
import * as outerJoystick from '../../../assets/images/outer-circle.png'

import * as pressSpace from '../../../assets/images/pressSpace.png'

export default class Boot extends Phaser.State {
    loaderBg: Phaser.Sprite
    loaderBar: Phaser.Sprite

    preload() {
        this.load.spritesheet('player', JonesSprite as any, 32, 48)
        this.load.spritesheet('von-talin', VonTalinSprite as any, 32, 48)
        this.load.spritesheet('hammurtosh', HammurtoshSprite as any, 32, 48)
        this.load.spritesheet('doge', DogeImage as any, 32, 32)
        // this.load.image('doge', DogeImage as any) doge enhance
        this.load.tilemap('room1', '', Room1, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room2', '', Room2, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room3', '', Room3, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room4', '', Room4, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room5', '', Room5, Phaser.Tilemap.TILED_JSON)
        this.load.tilemap('room6', '', Room6, Phaser.Tilemap.TILED_JSON)
        this.load.image('tiles', Tiles)

        this.load.image('joystick', outerJoystick)
        this.load.image('innerJoystick', innerJoystick)
        this.load.image('actionButton', innerJoystick)
        this.load.image('pressSpace', pressSpace)
        this.load.image('chest-close', ChestClose)
        this.load.image('chest-open', ChestOpen)
    }

    create() {
        this.state.start('Game')
    }
}
