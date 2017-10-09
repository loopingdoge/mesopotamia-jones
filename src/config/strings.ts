import * as getLocale from 'browser-locale'

export interface LocalizedStrings {
    // Home
    new_game: string
    continue_game: string
    credits: string

    // Game
    map: string
    inventory: string
    help: string

    // Characters
    conscious_rock: string

    // Dialogues
    dialogue_1_0: string

    dialogue_2_0: string
    dialogue_2_1: string
    dialogue_2_2: string
    dialogue_2_3: string
    dialogue_2_4: string
    dialogue_2_5: string
    dialogue_2_6: string
    dialogue_2_7: string

    dialogue_3_0: string
    dialogue_3_1: string
    dialogue_3_2: string

    dialogue_4_0: string

    dialogue_5_0: string
    dialogue_5_1: string

    dialogue_6_0: string

    dialogue_7_0: string

    dialogue_need_key: string

    dialogue_need_rock: string
}

const italian: LocalizedStrings = {
    new_game: 'Nuova Partita',
    continue_game: 'Continua',
    credits: 'Crediti',

    map: 'Mappa',
    inventory: 'Inventario',
    help: 'Aiuto',

    conscious_rock: 'Roccia Senziente',

    dialogue_1_0:
        "Accidenti, mentre esploravo delle antiche rovine si è rotto il pavimento e sono finito in questa caverna... devo cercare di uscire da qui. Più avanti c'è una porta, vediamo cosa c'è oltre.",

    dialogue_2_0:
        "Com'è possibile che ci sia una persona qui, queste rovine dovrebbero essere state chiuse da migliaia di anni... Chi sei tu?",
    dialogue_2_1:
        'Chi osa risvegliarmi dal mio eterno sonno! Vabbè sto dormendo da 104 anni, forse era anche ora che mi svegliassi... Mi chiamo Farren Von Talin ed anche io ero un esploratore come te ma poi...',
    dialogue_2_2: '... Poi ti sei fatto male al ginocchio?',
    dialogue_2_3:
        'Cosa? E perché mai!? No, come te sono rimasto intrappolato in queste rovine, forse lo avrai già notato ma le porte in questo posto sono maledette!',
    dialogue_2_4:
        'Ogni volta che ci passi i numeri degli indovinelli cambiano e ti costringono a risolvere sempre lo stesso enigma! Per questo motivo avevo iniziato a costruire una macchina programmabile in grado di risolvere gli indovinelli automaticamente.',
    dialogue_2_5:
        "Sfortunatamente in queste caverne si aggira anche An-Ki Hammurtosh, la mummia malvagia che ha maledetto questo posto e che mi ha trasformato in un fantasma, condannandomi a vivere qui per l'eternità.",
    dialogue_2_6:
        'Per proteggerlo dalle grinfie di Hammurtosh, ho nascosto la mia macchina in una cassa nella stanza in cui sei caduto inizialmente, tieni la chiave per aprirla.',
    dialogue_2_7:
        'Una volta recuperata la macchina, torna da me e ti farò un regalo!',

    dialogue_3_0:
        'Ora che hai il computer ti sarà più facile uscire dalla caverna, ma lascia che ti aiuti ancora... ecco fatto, ti ho installato le versioni pre-alphabeto di Minecraft e Angry Birds proprio come mi avevi chiesto.',
    dialogue_3_1:
        'Veramente non ricordo di avertelo chiesto, inoltre non credo che mi saranno di aiuto. Non hai qualcosa di più utile?',
    dialogue_3_2:
        'Vabbè come vuoi, sembra che ti serva compagnia ed inoltre è pericoloso andare da solo! Prendi questo.',

    dialogue_4_0:
        'Per caso hai visto il mio cane? Gli avevo insegnato a parlare in cuneiforme...',

    dialogue_5_0: "Benvenuthi all'inferno",
    dialogue_5_1: 'Sei proprio diaboliho',

    dialogue_6_0: 'Wow...',

    dialogue_7_0:
        'Traduzione: "Attento esploratore, oltre quella porta troverai solo pericolo"',

    dialogue_need_key: "E' chiuso... servirebbe una chiave",

    dialogue_need_rock:
        'Questa porta non si apre... sembra ci sia una cavità per inserirci una piccola roccia.'
}

const english: LocalizedStrings = {
    new_game: 'New Game',
    continue_game: 'Continue',
    credits: 'Credits',

    map: 'Map',
    inventory: 'Inventory',
    help: 'Help',

    conscious_rock: 'Conscious Rock',

    dialogue_1_0: 'string',

    dialogue_2_0: 'string',
    dialogue_2_1: 'string',
    dialogue_2_2: 'string',
    dialogue_2_3: 'string',
    dialogue_2_4: 'string',
    dialogue_2_5: 'string',
    dialogue_2_6: 'string',
    dialogue_2_7: 'string',

    dialogue_3_0: 'string',
    dialogue_3_1: 'string',
    dialogue_3_2: 'string',

    dialogue_4_0: 'string',

    dialogue_5_0: 'string',
    dialogue_5_1: 'string',

    dialogue_6_0: 'string',

    dialogue_7_0: 'string',

    dialogue_need_key: 'string',

    dialogue_need_rock: 'string'
}

export const getStrings: () => LocalizedStrings = () => {
    const locale = getLocale()
    switch (locale) {
        case 'it-IT':
            return italian
        default:
            return english
    }
}

export const strings = getStrings()

export default strings
