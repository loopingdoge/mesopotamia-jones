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
    continue_hint_keyboard: string
    continue_hint_mobile: string
    controls_game_controls: string
    controls_move: string
    controls_interact: string
    controls_space: string
    controls_shortcuts: string
    notification_automatic_door_message: string

    // Riddle
    back: string
    riddle_solved: string
    riddle_open_door: string
    riddle_solved_hint: string

    // Riddle questions
    riddle_return_question: (...args: any[]) => string
    riddle_sum_question: (...args: any[]) => string
    riddle_word_question: (...args: any[]) => string
    riddle_if_question: (...args: any[]) => string

    // Blocks
    block_number: string
    block_letter: string
    block_magic_number: string
    block_result: string
    block_join: string
    block_if: string
    block_then: string
    block_else: string
    block_is_even: string
    block_riddle_return_given_numbers: string
    block_riddle_return_given_letters: string
    block_riddle_return_open_with: string
    block_riddle_return_numbers_tooltip: string

    // Characters
    conscious_rock: string

    // Items
    computer_name: string
    computer_description: string
    old_key_name: string
    old_key_description: string
    conscious_rock_name: string
    conscious_rock_description: string
    cuneiform_legend_name: string
    cuneiform_legend_description: string
    map_name: string
    map_description: string

    // Tutorials
    tut_riddle_title: string
    tut_riddle_text: string

    tut_translate_riddle_title: string
    tut_translate_riddle_text: string

    tut_open_door_title: string
    tut_open_door_text: string

    tut_computer_title: string
    tut_computer_text: string

    tut_blocks_title: string
    tut_blocks_text: string

    tut_solution_title: string
    tut_solution_text: string

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
    continue_hint_keyboard: 'Tocca per continuare',
    continue_hint_mobile: 'Premi spazio per continuare',
    controls_game_controls: 'Controlli di gioco',
    controls_move: 'Muovi',
    controls_interact: 'Interagisci',
    controls_space: '\u2423 (spazio)',
    controls_shortcuts: 'Shortcuts',
    notification_automatic_door_message:
        'Il computer ha automaticamente aperto la porta usando la tua precedente soluzione',

    back: 'Indietro',
    riddle_solved: 'Indovinello risolto!',
    riddle_open_door: 'Apri la porta',
    riddle_solved_hint: 'Clicca il pulsante o premi spazio',

    riddle_return_question: ([a]: number[]) => `Inserisci il numero ${a}`,
    riddle_sum_question: ([a, b]: number[]) =>
        `Quanto fa la somma di ${a} e ${b}?`,
    riddle_word_question: ([a, b, c, d]: string[]) =>
        `Se la porta aprire vorrai, queste lettere inserire dovrai: ${a}, ${b}, ${c}, ${d}`,
    riddle_if_question: ([a, b, c]: number[]) =>
        `Se il numero magico è pari, la porta si apre con la somma di ${a} e ${b}, altrimenti con il prodotto.\n Il numero magico è ${c}`,

    block_number: 'numero',
    block_letter: 'lettera',
    block_magic_number: 'numero_magico',
    block_result: 'risultato',
    block_join: 'unisci',
    block_if: 'se',
    block_then: 'allora',
    block_else: 'altrimenti',
    block_is_even: 'è pari',
    block_riddle_return_given_numbers: 'Dati i numeri',
    block_riddle_return_given_letters: 'Date le lettere',
    block_riddle_return_open_with: 'apri la porta con',
    block_riddle_return_numbers_tooltip:
        'I dati sono numeri, quindi il risultato deve essere un numero',

    conscious_rock: 'Roccia Senziente',

    computer_name: 'HAL 1337',
    computer_description:
        'La macchina che Von Talin in passato ha costruito. Questo macchina si collega alle porte e permette di risolvere gli enigmi automaticamente, se programmato correttamente.',
    old_key_name: 'vecchia chiave',
    old_key_description:
        'questa chiave serve ad aprire una cassa contenente il computer di Von Talin.',
    conscious_rock_name: 'roccia senziente',
    conscious_rock_description:
        'questo oggetto traduce automaticamente i testi degli indovinelli. Sembra contenere il fantasma di un maestro di cuneiforme.',
    cuneiform_legend_name: 'legenda di cuneiforme',
    cuneiform_legend_description:
        "una legenda che permette di tradurre l'alfabeto cuneiforme nel nostro alfabeto.",
    map_name: 'mappa della piramide',
    map_description: 'una mappa che mostra le stanze visitate della piramide.',

    tut_riddle_title: "L'indovinello",
    tut_riddle_text:
        'Per aprire la porta devi risolvere questo indovinello. Fai attenzione, i dati cambiano ogni volta',

    tut_translate_riddle_title: "Tradurre l'indovinello",
    tut_translate_riddle_text:
        'Selezionando una lettera puoi scoprire a quale simbolo corrisponde nella legenda in basso',

    tut_open_door_title: 'Aprire la porta',
    tut_open_door_text:
        "Per aprire la porta devi inserire qui la soluzione dell'indovinello",

    tut_computer_title: 'Il Computer',
    tut_computer_text:
        'Il computer si collega alla porta e cerca di aprirla con la soluzione che hai inventato',

    tut_blocks_title: 'I blocchi',
    tut_blocks_text:
        "Per creare una soluzione devi trascinare questi blocchi nell'area bianca ed unirli come i pezzi di un puzzle",

    tut_solution_title: 'Provare la soluzione',
    tut_solution_text:
        'Questo pulsante esegue la tua soluzione. Con un risultato corretto si apre la porta',

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
    continue_hint_keyboard: 'Touch to continue',
    continue_hint_mobile: 'Press space to continue',
    controls_game_controls: 'Controls',
    controls_move: 'Move',
    controls_interact: 'Interact',
    controls_space: '\u2423 (space)',
    controls_shortcuts: 'Shortcuts',
    notification_automatic_door_message:
        'The computer has automatically opened the door using your previous solution',

    back: 'Back',
    riddle_solved: 'Riddle solved!',
    riddle_open_door: 'Open the door',
    riddle_solved_hint: 'Click the button or press space to continue',

    riddle_return_question: ([a]: number[]) => `Insert the number ${a}`,
    riddle_sum_question: ([a, b]: number[]) =>
        `What is the sum of ${a} and ${b}?`,
    riddle_word_question: ([a, b, c, d]: string[]) =>
        `If this door you want to open, to insert these letters you need ${a}, ${b}, ${c}, ${d}`,
    riddle_if_question: ([a, b, c]: number[]) =>
        `If the magic number is even, the door will open with the sum of ${a} and ${b}, otherwise with the product of them.\n The magic number is ${c}`,

    block_number: 'number',
    block_letter: 'letter',
    block_magic_number: 'magic_number',
    block_result: 'result',
    block_join: 'join',
    block_if: 'if',
    block_then: 'then',
    block_else: 'else',
    block_is_even: 'is even',
    block_riddle_return_given_numbers: 'Given the numbers',
    block_riddle_return_given_letters: 'Given the letters',
    block_riddle_return_open_with: 'open the door with',
    block_riddle_return_numbers_tooltip:
        'The parameters are numbers, so the result must be a number',

    conscious_rock: 'Conscious Rock',

    computer_name: 'string',
    computer_description: 'string',
    old_key_name: 'string',
    old_key_description: 'string',
    conscious_rock_name: 'string',
    conscious_rock_description: 'string',
    cuneiform_legend_name: 'string',
    cuneiform_legend_description: 'string',
    map_name: 'string',
    map_description: 'string',

    tut_riddle_title: 'string',
    tut_riddle_text: 'string',

    tut_translate_riddle_title: 'string',
    tut_translate_riddle_text: 'string',

    tut_open_door_title: 'string',
    tut_open_door_text: 'string',

    tut_computer_title: 'string',
    tut_computer_text: 'string',

    tut_blocks_title: 'string',
    tut_blocks_text: 'string',

    tut_solution_title: 'string',
    tut_solution_text: 'string',

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
