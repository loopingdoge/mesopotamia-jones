import { Game } from 'phaser-ce'

import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class Hammurtossi extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'npc')
        this.frame = 4
    }

    dialogue(state: GameState): string {
        switch (state.room.id) {
            case 'room5':
                return 'dialog5'
            default:
                return ''
        }
    }
}
