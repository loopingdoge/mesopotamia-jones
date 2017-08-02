// Inspired by: https://github.com/netcell, https://gist.github.com/netcell/9083b5cef97125128420

import { Point, Pointer, Sprite } from 'phaser-ce'
import gameStore, { GAME } from '../../stores/gameStore'
import ISprite from '../classes/ISprite'
import PlayerEvents from '../classes/PlayerEvents'

export interface JoystickProps {
    spriteProps: ISprite
    events: PlayerEvents
}

const linearMap = (x: number) => (x - 1) * -250 - 250

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
            const distance = position.getMagnitude()
            const direction = Point.normalize(position, this.direction)

            innerCirclePos.copyFrom(position)
            if (distance > 30) {
                innerCirclePos.setMagnitude(30)
            }

            if (direction.x > 0) {
                this.events.onMoveRight.dispatch(-linearMap(direction.x))
            } else if (direction.x < 0) {
                this.events.onMoveLeft.dispatch(-linearMap(direction.x))
            }

            if (direction.y > 0) {
                this.events.onMoveDown.dispatch(-linearMap(direction.y))
            } else if (direction.y < 0) {
                this.events.onMoveUp.dispatch(-linearMap(direction.y))
            }
        }
    }
}
