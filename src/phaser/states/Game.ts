/* globals __DEV__ */
declare const __DEV__: boolean
import * as Phaser from 'phaser'
import Dude from '../sprites/Dude'
import gameStore from '../../stores/gameStore'
import Scene from '../classes/Scene'

export default class Game extends Phaser.State {

    player: Phaser.Sprite
    walls: Phaser.Group
    rdoor: Phaser.Sprite
    ldoor: Phaser.Sprite

    init() {}
    preload() {
        this.game.load.tilemap('room1', '../../../assets/tilemaps/room1.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('tiles', '../../../assets/images/sheet.png')
    }

    // TODO: Fatto giusto per il concetto, e' da mettere a posto
    loadScene(scene: Scene) {
        scene.walls.forEach( wall => {
            this.walls.create(wall.x, wall.y, 'wall')
        })
        scene.doors.forEach( door => {
            const d = this.game.add.sprite(door.x, door.y, 'door')
            this.game.physics.enable(d)
            d.body.immovable = true
        })
        this.game.add.existing(new Dude({
            game: this.game,
            x: scene.player.x,
            y: scene.player.y,
            key: 'dude',
        }))
    }

    create() {
        this.game.stage.backgroundColor = '#E37710'
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        const map = this.game.add.tilemap('room1')
        map.addTilesetImage('sheet', 'tiles')
        const layer = map.createLayer('Livello tile 1')

        //  This resizes the game world to match the layer dimensions
        layer.resizeWorld()

        // this.walls = this.game.add.group()
        // this.walls.enableBody = true // Abilito la fisica per ogni oggetto del gruppo

        // // top e bottom sono alti 40, left e right sono larghi 58
        // let top = this.walls.create(0, 0, 'wall')
        // top.scale.setTo(4.5, 2)
        // top.body.immovable = true
        // top.body.setSize(this.game.width, 2, 0, 0)

        // let bottom = this.walls.create(0, this.game.height - 40, 'wall')
        // bottom.scale.setTo(4.5, 2)
        // bottom.body.immovable = true
        // bottom.body.setSize(this.game.width, 40, 0, -4)

        // let left = this.walls.create(0, 0, 'wall')
        // left.scale.setTo(0.2, 36)
        // left.body.immovable = true

        // let right = this.walls.create(this.game.width - 58, 0, 'wall')
        // right.scale.setTo(0.2, 36)
        // right.body.immovable = true

        // this.rdoor = this.game.add.sprite(this.game.width, this.world.centerY - 58, 'door')
        // this.game.physics.enable(this.rdoor)
        // this.rdoor.scale.setTo(0.15, 0.10)
        // this.rdoor.angle = 90
        // this.rdoor.body.setSize(58 / 0.15, 58 / 0.10, -60 / 0.15, 34 / 0.1)
        // this.rdoor.body.immovable = true

        // this.ldoor = this.game.add.sprite(0, this.world.centerY + 58, 'door')
        // this.game.physics.enable(this.ldoor)
        // this.ldoor.scale.setTo(0.15, 0.10)
        // this.ldoor.angle = -90
        // this.ldoor.body.setSize(58 / 0.15, 58 / 0.10, 2, -140 / 0.15)
        // this.ldoor.body.immovable = true



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
        this.game.physics.arcade.collide(this.player, this.walls)
        this.game.physics.arcade.collide(this.player, this.rdoor, this.goToRiddle, null, this)
        this.game.physics.arcade.collide(this.player, this.ldoor, this.goToRiddle, null, this)
    }

    goToRiddle () {
        gameStore.goToRiddle(0)
        console.warn('onPrevRiddle', gameStore.level)
    }

}