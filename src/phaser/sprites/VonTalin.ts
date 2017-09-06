import { Game } from 'phaser-ce'

import Npc from './Npc'

export default class VonTalin extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'npc')
        this.frame = 4
    }

    dialogueInRoom(roomId: string): string {
        switch (roomId) {
            case 'room2':
                return 'dialog2'
            default:
                return ''
        }
    }
}
