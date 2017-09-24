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
    nextDialogueId?: string
}

const character = (id: string, name: string, image: string): Character => ({
    id,
    name,
    image
})

const line = (character: Character, text: string): Line => ({ character, text })

const dialogue = (
    id: string,
    lines: Line[],
    loot: Item[],
    nextDialogueId?: string
): Dialogue => ({
    id,
    lines,
    loot,
    nextDialogueId
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
                "Accidenti, mentre esploravo delle antiche rovine si è rotto il pavimento e sono finito in questa caverna... devo cercare di uscire da qui. Più avanti c'è una porta, vediamo cosa c'è oltre."
            )
        ],
        []
    ),
    dialogue(
        'dialog2',
        [
            line(
                characters[0],
                "Com'è possibile che ci sia una persona qui, queste rovine dovrebbero essere state chiuse da migliaia di anni... Chi sei tu?"
            ),
            line(
                characters[1],
                'Chi osa risvegliarmi dal mio eterno sonno! Vabbè sto dormendo da 104 anni, forse era anche ora che mi svegliassi... Mi chiamo Farren Von Talin ed anche io ero un esploratore come te ma poi...'
            ),
            line(characters[0], '... Poi ti sei fatto male al ginocchio?'),
            line(
                characters[1],
                'Cosa? E perché mai!? No, come te sono rimasto intrappolato in queste rovine, forse lo avrai già notato ma le porte in questo posto sono maledette!'
            ),
            line(
                characters[1],
                'Ogni volta che ci passi i numeri degli indovinelli cambiano e ti costringono a risolvere sempre lo stesso enigma! Per questo motivo avevo iniziato a costruire una macchina programmabile in grado di risolvere gli indovinelli automaticamente.'
            ),
            line(
                characters[1],
                "Sfortunatamente in queste caverne si aggira anche An-Ki Hammurtossi, lo spirito malvagio che ha maledetto questo posto e che mi ha trasformato in un fantasma, condannandomi a vivere qui per l'eternità."
            ),
            line(
                characters[1],
                'Per proteggerlo dalle grinfie di Hammurtossi, ho nascosto la mia macchina in una cassa nella stanza in cui sei caduto inizialmente, tieni la chiave per aprirla.'
            ),
            line(
                characters[1],
                'Una volta recuperata la macchina, torna da me e ti farò un regalo!'
            )
        ],
        [computerKey]
    ),
    dialogue(
        'dialog3',
        [
            line(
                characters[1],
                'Ora che hai il computer ti sarà più facile uscire dalla caverna, ma lascia che ti aiuti ancora... ecco fatto, ti ho installato le versioni pre-alphabeto di Minecraft e Angry Birds proprio come mi avevi chiesto.'
            ),
            line(
                characters[0],
                'Veramente non ricordo di avertelo chiesto, inoltre non credo che mi saranno di aiuto. Non hai qualcosa di più utile?'
            ),
            line(
                characters[1],
                'Vabbè come vuoi, sembra che ti serva compagnia ed inoltre è pericoloso andare da solo! Prendi questo.'
            )
        ],
        [translator],
        'dialog4'
    ),
    dialogue(
        'dialog4',
        [
            line(
                characters[1],
                'Per caso hai visto il mio cane? Gli avevo insegnato a parlare in cuneiforme...'
            )
        ],
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
    dialogue('dialog6', [line(characters[3], 'Wow...')], [], 'dialog7'),
    dialogue(
        'dialog7',
        [
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
