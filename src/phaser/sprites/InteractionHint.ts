import { Game, Point, Sprite } from 'phaser-ce'

export default class InteractionHint extends Sprite {
    initialX: number
    initialY: number
    intervalHandler: any
    down = false

    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'pressSpace')
        this.initialX = x
        this.initialY = y
        this.anchor.setTo(0.5, 0.5)
        this.startAnimation()
    }

    move = () => {
        const increment = this.down ? -5 : 5
        this.y += increment
        this.down = !this.down
    }

    startAnimation() {
        if (!this.intervalHandler) {
            this.intervalHandler = setInterval(this.move, 500)
        }
    }

    stopAnimation() {
        if (this.intervalHandler) {
            this.x = this.initialX
            this.y = this.initialY
            this.down = false
            clearInterval(this.intervalHandler)
            this.intervalHandler = null
        }
    }

    destroy() {
        super.destroy()
        clearInterval(this.intervalHandler)
    }
}
