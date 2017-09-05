import { Riddle } from './riddles'

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

const dialog = (id: string, lines: Line[]): Dialogue => ({ id, lines })

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
    character(
        'ab',
        'An-Ki Hammurtossi',
        'http://3.bp.blogspot.com/-6JLvoXcxvNU/U3IdCOWrW9I/AAAAAAACDPc/wwO1wCLLXh0/s1600/Mummy+(5).png'
    )
]

export const dialogs: Dialogue[] = [
    dialog('dialog1', [
        line(
            characters[0],
            'Ah che bello faccio una passeggiata nel deserto...'
        ),
        line(characters[0], 'Accidenti, sono finito in un buco...'),
        line(characters[0], '...e non ho goduto nemmeno')
    ]),
    dialog('dialog2', [
        line(characters[1], 'La tua vita fa schifo'),
        line(characters[0], 'Quando escono i voti di UUX caputtana?')
    ]),
    dialog('dialog3', [
        line(characters[2], "Benvenuthi all'inferno"),
        line(characters[1], 'Sei proprio diaboliho')
    ])
]

const dialogById = (dialogId: string) => (dialog: Dialogue) =>
    dialog.id === dialogId

export const getDialogById = (dialogId: string) =>
    dialogs.filter(dialogById(dialogId))[0]
