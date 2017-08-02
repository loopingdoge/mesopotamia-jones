import { CursorKeys, Point, Sprite } from 'phaser-ce'
import gameStore, { GAME } from '../../stores/gameStore'
import ISprite from '../classes/ISprite'
import PlayerEvents from '../classes/PlayerEvents'

export default class Player extends Sprite {
    events: PlayerEvents

    constructor({ game, x, y, key }: ISprite) {
        super(game, x, y, key)
        this.events = new PlayerEvents(this)

        this.anchor.setTo(0.5)

        this.game.physics.enable(this)
        this.body.collideWorldBounds = true

        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)
        this.body.offset = new Point(0, 34)
        this.body.height = 13

        this.events.onMoveDown.add((velocity: number) => {
            this.body.velocity.y = velocity || 250
            // this.animations.play('up')
        })

        this.events.onMoveUp.add((velocity: number) => {
            this.body.velocity.y = velocity || -250
            // this.animations.play('down')
        })

        this.events.onMoveRight.add((velocity: number) => {
            this.body.velocity.x = velocity || 250
            this.animations.play('right')
        })

        this.events.onMoveLeft.add((velocity: number) => {
            this.body.velocity.x = velocity || -250
            this.animations.play('left')
        })

        this.events.onStopMoving.add(() => {
            this.animations.stop()
            this.frame = 4
            this.body.velocity.x = 0
            this.body.velocity.y = 0
            this.floorPosition()
        })
    }

    floorPosition() {
        this.position.x = Math.floor(this.position.x)
        this.position.y = Math.floor(this.position.y)
    }
}
