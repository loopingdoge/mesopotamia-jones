import { Game } from 'phaser-ce'

import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class VonTalin extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'npc')
        this.frame = 4
    }

    dialogue(state: GameState): string {
        switch (state.room.id) {
            case 'room2':
                return 'dialog2'
            default:
                return ''
        }
    }
}
