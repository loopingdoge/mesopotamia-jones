import { Game } from 'phaser-ce'

import { computer, hasItem, translator } from '../../config/inventory'
import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class VonTalin extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'von-talin')
        this.alpha = 0.8
    }

    dialogue(state: GameState): string {
        switch (state.room.id) {
            case 'room3':
                // tslint:disable:curly
                if (!hasItem(state.inventory, computer)) return 'dialog2'
                if (!hasItem(state.inventory, translator)) return 'dialog3'
                else return 'dialog4'
            // tslint:enable:curly
            case 'room6':
                return 'dialog8'
            default:
                return ''
        }
    }
}
