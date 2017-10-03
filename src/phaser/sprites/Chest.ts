import { when } from 'mobx'
import { Game, Point, Sprite } from 'phaser-ce'

import gameStore from '../../stores/gameStore'

import { Chest } from '../../config/chests'

export default class ChestSprite extends Sprite {
    objectId = 'chest'
    chestId: string

    constructor(game: Game, x: number, y: number, chestId: string) {
        super(game, x, y, 'chest-close')
        this.chestId = chestId

        this.anchor.set(0.5)

        this.game.physics.arcade.enableBody(this)
        this.body.collideWorldBounds = true
        this.body.immovable = true
        this.body.height += 6

        if (gameStore.state.chests[this.chestId].open) {
            this.loadTexture('chest-open')
        } else {
            when(
                () => gameStore.state.chests[this.chestId].open,
                () => {
                    try {
                        this.loadTexture('chest-open')
                    } catch (e) {
                        console.error(e)
                    }
                }
            )
        }
    }
}
