import { Game, Sprite } from 'phaser-ce'

export default class InteractionHint extends Sprite {
    intervalHandler: number
    down = false

    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'pressf')
        this.anchor.setTo(0.5, 0.5)
        this.intervalHandler = setInterval(this.move, 500)
    }

    move = () => {
        const increment = this.down ? -5 : 5
        this.y += increment
        this.down = !this.down
    }

    destroy() {
        super.destroy()
        clearInterval(this.intervalHandler)
    }
}
