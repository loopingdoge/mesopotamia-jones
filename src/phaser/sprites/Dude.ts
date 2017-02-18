import * as Phaser from 'phaser'
import ISprite from '../classes/ISprite'
import gameStore, { GAME } from '../../stores/gameStore'

export default class Dude extends Phaser.Sprite {

    cursors: Phaser.CursorKeys

    constructor ({ game, x, y, key}: ISprite) {
        super(game, x, y, key)
        this.anchor.setTo(0.5)
        this.cursors = this.game.input.keyboard.createCursorKeys()

        this.game.physics.enable(this)
        this.body.bounce.y = 20
        this.body.bounce.x = 20
        this.body.collideWorldBounds = true

        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)
        this.body.offset = new Phaser.Point(0, 34)
        this.body.height = 13
    }

    update() {
        let movingHorizontal = false
        let movingVertical = false
        if (gameStore.state === GAME) {
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -250
                this.animations.play('left')
                movingHorizontal = true
            } else if (this.cursors.right.isDown) {
                //  Move to the right
                this.body.velocity.x = 250
                this.animations.play('right')
                movingHorizontal = true
            } else {
                this.body.velocity.x = 0
            }
            if (this.cursors.up.isDown) {
                this.body.velocity.y = -250
                // this.animations.play('up')
                movingVertical = true
            } else if (this.cursors.down.isDown) {
                this.body.velocity.y = 250
                // this.animations.play('down')
                movingVertical = true
            } else {
                this.body.velocity.y = 0
            }
        }

        if ((!movingHorizontal && !movingVertical) || gameStore.state !== GAME) {
            this.animations.stop()
            this.frame = 4
            this.body.velocity.x = 0
            this.body.velocity.y = 0
        }

    }

}