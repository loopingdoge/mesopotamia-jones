import * as MesopotamiaJonesImage from '../../assets/images/mesopotamia-jones.png'
import * as Hammurtossi from '../../assets/images/mummy.png'
import * as Rock from '../../assets/images/rock.png'
import * as VonDogen from '../../assets/images/von-dogen.png'
import * as VonTalin from '../../assets/images/von-talin.png'
import { computerKey, Item, translator } from './inventory'

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
    loot: Item[]
}

const character = (id: string, name: string, image: string): Character => ({
    id,
    name,
    image
})

const line = (character: Character, text: string): Line => ({ character, text })

const dialogue = (id: string, lines: Line[], loot: Item[]): Dialogue => ({
    id,
    lines,
    loot
})

export const characters: Character[] = [
    character('mj', 'Mesopotamia Jones', MesopotamiaJonesImage as any),
    character('fv', 'Farren Von Talin', VonTalin as any),
    character('ab', 'An-Ki Hammurtossi', Hammurtossi as any),
    character('do', 'Wow Von Dogen', VonDogen as any),
    character('rs', 'Roccia Senziente', Rock as any)
]

export const NEED_KEY = 'NEED_KEY'

export const dialogues: Dialogue[] = [
    dialogue(
        'dialog1',
        [
            line(
                characters[0],
                'Accidenti, mentre esploravo sono caduto in buco di questa piramide... devo cercare di uscire da qui'
            )
        ],
        []
    ),
    dialogue(
        'dialog2',
        [
            line(
                characters[1],
                "Sono il fantasma della piramide, ti vorrei raccontare la mia storia e di come An-Ki Hammurtossi mi ha rinchiuso dentro questa stanza, ma ora l'autore del dialogo non ha molta voglia di scriverlo.\nQuindi prendi questa chiave e recupera il mio computer."
            ),
            line(characters[0], 'Ok lol'),
            line(
                characters[1],
                'Torna qui con il computer, se me lo lasci aggiornare a Windows 10 ti farò un regalo'
            )
        ],
        [computerKey]
    ),
    dialogue(
        'dialog3',
        [
            line(
                characters[1],
                'Ora che hai il computer ti sarà più facile uscire dalla piramide, ma lascia che ti aiuti ancora...ecco fatto, ti ho installato Minecraft e Angry Birds proprio come mi avevi chiesto.'
            ),
            line(
                characters[0],
                'Veramente non ricordo di avertelo chiesto, inoltre non credo che mi saranno di aiuto. Non hai qualcosa di più utile?'
            ),
            line(
                characters[1],
                'Vabbè lo hai voluto tu, sembra che ti serva compagnia ed inoltre è pericoloso andare da solo! Prendi questo.'
            )
        ],
        [translator]
    ),
    dialogue(
        'dialog4',
        [line(characters[1], 'Per caso hai visto il mio cane?')],
        []
    ),
    dialogue(
        'dialog5',
        [
            line(characters[2], "Benvenuthi all'inferno"),
            line(characters[0], 'Sei proprio diaboliho')
        ],
        []
    ),
    dialogue(
        'dialog6',
        [
            line(characters[3], 'Wow...'),
            line(
                characters[4],
                'Traduzione: "Attento esploratore, oltra quella porta troverai solo pericolo"'
            )
        ],
        []
    ),
    dialogue(
        NEED_KEY,
        [line(characters[0], "E' chiuso... servirebbe una chiave")],
        []
    )
]

const dialogById = (dialogId: string) => (dialog: Dialogue) =>
    dialog.id === dialogId

export const getDialogById = (dialogId: string) =>
    dialogues.filter(dialogById(dialogId))[0]
