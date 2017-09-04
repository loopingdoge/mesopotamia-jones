import { Game, Point, Sprite } from 'phaser-ce'

export default class InteractionHint extends Sprite {
    initialX: number
    initialY: number
    intervalHandler: number
    down = false

    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'pressf')
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
            this.intervalHandler = 0
        }
    }

    destroy() {
        super.destroy()
        clearInterval(this.intervalHandler)
    }
}
