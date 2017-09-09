import * as Hammurtossi from '../../assets/images/mummy.png'
import { Riddle } from './riddles'

setTimeout(() => console.log(typeof Hammurtossi), 10000)

export interface Character {
    id: string
    name: string
    image: string // TODO provvisorio
}

export interface Line {
    character: Character
    text: string
}

export interface Dialogue {
    id: string
    lines: Line[]
}

const character = (id: string, name: string, image: string): Character => ({
    id,
    name,
    image
})

const line = (character: Character, text: string): Line => ({ character, text })

const dialogue = (id: string, lines: Line[]): Dialogue => ({ id, lines })

export const characters: Character[] = [
    character(
        'mj',
        'Mesopotamia Jones',
        'http://www.fun-lover.com/graphic-shop/Clips/images/Misc/IndianaJones.png'
    ),
    character(
        'fv',
        'Farren Von Talin',
        'http://vignette2.wikia.nocookie.net/witcher/images/4/49/People_Leos_ghost.png'
    ),
    character('ab', 'An-Ki Hammurtossi', Hammurtossi as any)
]

export const NEED_KEY = 'NEED_KEY'

export const dialogues: Dialogue[] = [
    dialogue('dialog1', [
        line(
            characters[0],
            'Ah che bello faccio una passeggiata nel deserto...'
        ),
        line(characters[0], 'Accidenti, sono finito in un buco...'),
        line(characters[0], '...e non ho goduto nemmeno')
    ]),
    dialogue('dialog2', [
        line(
            characters[1],
            "Sono il fantasma della piramide, ti vorrei raccontare la mia storia e di come An-Ki Hammurtossi mi ha rinchiuso dentro questa stanza, ma ora l'autore del dialogo non ha molta voglia di scriverlo.\nQuindi prendi questa chiave e recupera il mio computer."
        ),
        line(characters[0], 'Ok lol')
    ]),
    dialogue('dialog3', [
        line(characters[2], "Benvenuthi all'inferno"),
        line(characters[0], 'Sei proprio diaboliho')
    ]),
    dialogue(NEED_KEY, [
        line(characters[0], "E' chiuso... servirebbe una chiave")
    ])
]

const dialogById = (dialogId: string) => (dialog: Dialogue) =>
    dialog.id === dialogId

export const getDialogById = (dialogId: string) =>
    dialogues.filter(dialogById(dialogId))[0]
