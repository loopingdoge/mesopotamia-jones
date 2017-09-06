import { Game, Point, Sprite } from 'phaser-ce'

export default class Npc extends Sprite {
    constructor(game: Game, x: number, y: number, key: string) {
        super(game, x, y, key)

        this.anchor.set(0.5)

        this.game.physics.arcade.enableBody(this)
        this.body.collideWorldBounds = true
        this.body.immovable = true
        this.body.height += 6
    }

    dialogueInRoom(roomId: string): string {
        return ''
    }
}
