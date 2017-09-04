import { CursorKeys, Point, Sprite } from 'phaser-ce'
import gameStore, { GAME } from '../../stores/gameStore'
import { linearMap } from '../../utils'
import ISprite from '../classes/ISprite'
import PlayerEvents from '../classes/PlayerEvents'
import InteractionHint from './InteractionHint'

export default class Player extends Sprite {
    interactionHint: InteractionHint
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

        this.interactionHint = game.add.existing(
            new InteractionHint(game, 25, 0)
        )

        this.events.onMoveBottomDown.add((velocity = 1) => {
            this.body.velocity.y = linearMap(0, 1, 0, 250, velocity)
            // this.animations.play('up')
        })

        this.events.onMoveBottomUp.add(() => {
            this.body.velocity.y = 0
        })

        this.events.onMoveTopDown.add((velocity = 1) => {
            this.body.velocity.y = -linearMap(0, 1, 0, 250, velocity)
            // this.animations.play('down')
        })

        this.events.onMoveTopUp.add(() => {
            this.body.velocity.y = 0
        })

        this.events.onMoveRightDown.add((velocity = 1) => {
            this.body.velocity.x = linearMap(0, 1, 0, 250, velocity)
            this.animations.play('right')
        })

        this.events.onMoveRightUp.add(() => {
            this.body.velocity.x = 0
            this.animations.stop('right')
        })

        this.events.onMoveLeftDown.add((velocity = 1) => {
            this.body.velocity.x = -linearMap(0, 1, 0, 250, velocity)
            this.animations.play('left')
        })

        this.events.onMoveLeftUp.add((velocity: number) => {
            this.body.velocity.x = 0
            this.animations.stop('left')
        })

        this.events.onStopMoving.add(this.stopMoving)
    }

    stopMoving = () => {
        this.animations.stop()
        this.frame = 4
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        this.floorPosition()
    }

    floorPosition() {
        this.position.x = Math.floor(this.position.x)
        this.position.y = Math.floor(this.position.y)
    }

    showInteractionHint() {
        this.addChild(this.interactionHint)
    }

    hideInteractionHint() {
        this.removeChild(this.interactionHint)
    }

    update() {
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.stopMoving()
        }
    }
}
