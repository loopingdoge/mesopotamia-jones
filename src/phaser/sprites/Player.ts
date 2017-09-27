import { CursorKeys, Game, Point, Sprite } from 'phaser-ce'
import gameStore from '../../stores/gameStore'
import { linearMap } from '../../utils'
import PlayerEvents from '../classes/PlayerEvents'
import InteractionHint from './InteractionHint'

export default class Player extends Sprite {
    interactionHint: InteractionHint
    events: PlayerEvents

    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'player')
        this.events = new PlayerEvents(this)

        this.anchor.setTo(0.5)

        this.game.physics.enable(this)
        this.body.collideWorldBounds = true

        this.animations.add('down', [0, 1, 2, 3], 10, true)
        this.animations.add('left', [4, 5, 6, 7], 10, true)
        this.animations.add('right', [8, 9, 10, 11], 10, true)
        this.animations.add('up', [12, 13, 14, 15], 10, true)

        this.body.offset = new Point(0, 34)
        this.body.width = 30
        this.body.height = 13

        this.frame = 1

        this.interactionHint = game.add.existing(
            new InteractionHint(game, 25, 0)
        )
        this.addChild(this.interactionHint)

        this.events.onMoveBottomDown.add((velocity = 1) => {
            this.body.velocity.y = linearMap(0, 1, 0, 250, velocity)
            this.animations.play('down')
        })

        this.events.onMoveBottomUp.add(() => {
            this.body.velocity.y = 0
            this.animations.stop('down')
            this.frame = 0
        })

        this.events.onMoveTopDown.add((velocity = 1) => {
            this.body.velocity.y = -linearMap(0, 1, 0, 250, velocity)
            this.animations.play('up')
        })

        this.events.onMoveTopUp.add(() => {
            this.body.velocity.y = 0
            this.animations.stop('up')
            this.frame = 12
        })

        this.events.onMoveRightDown.add((velocity = 1) => {
            this.body.velocity.x = linearMap(0, 1, 0, 250, velocity)
            this.animations.play('right')
        })

        this.events.onMoveRightUp.add(() => {
            this.body.velocity.x = 0
            this.animations.stop('right')
            this.frame = 8
        })

        this.events.onMoveLeftDown.add((velocity = 1) => {
            this.body.velocity.x = -linearMap(0, 1, 0, 250, velocity)
            this.animations.play('left')
        })

        this.events.onMoveLeftUp.add((velocity: number) => {
            this.body.velocity.x = 0
            this.animations.stop('left')
            this.frame = 4
        })

        this.events.onStopMoving.add(this.stopMoving)
    }

    stopMoving = () => {
        this.animations.stop()
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        this.floorPosition()
    }

    floorPosition() {
        this.position.x = Math.floor(this.position.x)
        this.position.y = Math.floor(this.position.y)
    }

    showInteractionHint() {
        this.interactionHint.visible = true
        this.interactionHint.startAnimation()
    }

    hideInteractionHint() {
        this.interactionHint.visible = false
        this.interactionHint.stopAnimation()
    }

    update() {
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.stopMoving()
        }
    }
}
