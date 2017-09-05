// Inspired by: https://github.com/netcell, https://gist.github.com/netcell/9083b5cef97125128420

import { Point, Pointer, Sprite } from 'phaser-ce'
import gameStore from '../../stores/gameStore'
import { linearMap } from '../../utils'
import ISprite from '../classes/ISprite'
import PlayerEvents from '../classes/PlayerEvents'

export interface JoystickProps {
    spriteProps: ISprite
    events: PlayerEvents
}

export default class Joystick extends Sprite {
    innerCircle: Sprite
    invisibleDrag: Sprite

    isDragging: boolean
    direction: Point

    events: PlayerEvents

    constructor({ game, x, y, key }: ISprite, events: PlayerEvents) {
        super(game, x, y, key)
        this.events = events
        this.anchor.setTo(0.5, 0.5)
        this.isDragging = false

        this.innerCircle = this.game.add.sprite(0, 0, 'innerJoystick')
        this.innerCircle.anchor.setTo(0.5, 0.5)
        this.addChild(this.innerCircle)

        this.invisibleDrag = game.add.sprite(0, 0, null)

        this.invisibleDrag.anchor.setTo(0.5, 0.5)
        this.invisibleDrag.width = this.invisibleDrag.height = 50

        this.invisibleDrag.inputEnabled = true
        this.invisibleDrag.input.enableDrag(true, false)
        this.invisibleDrag.events.onDragStart.add(this.onDragStart, this)
        this.invisibleDrag.events.onDragStop.add(this.onDragStop, this)

        this.addChild(this.invisibleDrag)
    }

    onDragStart(gameObject: Sprite, trigger: Pointer, x: number, y: number) {
        this.isDragging = true
    }

    onDragStop() {
        this.isDragging = false
        this.innerCircle.position.setTo(0, 0)
        this.invisibleDrag.position.setTo(0, 0)
        this.events.onStopMoving.dispatch()
    }

    update() {
        if (this.isDragging) {
            const position = this.invisibleDrag.position
            const innerCirclePos = this.innerCircle.position
            const angle = new Point(0, 0).angle(position)
            let distance = position.getMagnitude()
            const direction = Point.normalize(position, this.direction)

            innerCirclePos.copyFrom(position)
            if (distance > 30) {
                innerCirclePos.setMagnitude(30)
                distance = 30
            }

            const mappedDistance = linearMap(0, 30, 0, 1, distance)

            if (direction.x > 0) {
                this.events.onMoveRightDown.dispatch(
                    Math.abs(direction.x * mappedDistance)
                )
            } else if (direction.x < 0) {
                this.events.onMoveLeftDown.dispatch(
                    Math.abs(direction.x * mappedDistance)
                )
            }

            if (direction.y > 0) {
                this.events.onMoveBottomDown.dispatch(
                    Math.abs(direction.y * mappedDistance)
                )
            } else if (direction.y < 0) {
                this.events.onMoveTopDown.dispatch(
                    Math.abs(direction.y * mappedDistance)
                )
            }
        }
    }
}
