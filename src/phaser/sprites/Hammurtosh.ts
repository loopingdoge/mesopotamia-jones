import { Game } from 'phaser-ce'

import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class Hammurtosh extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'hammurtosh')
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
