import { L10N } from '.'

const italian: L10N = {
    // Home
    new_game: 'Nuova Partita',
    continue_game: 'Continua',
    credits: 'Crediti',

    // Game
    map: 'Mappa',
    inventory: 'Inventario',
    help: 'Aiuto',
    menu: 'Menu',
    continue_hint_keyboard: 'Premi spazio per continuare',
    continue_hint_mobile: 'Tocca per continuare',
    controls_game_controls: 'Controlli di gioco',
    controls_move: 'Muovi',
    controls_interact: 'Interagisci',
    controls_space: '\u2423 (spazio)',
    controls_shortcuts: 'Scorciatoie Mappa/Inventario',
    notification_automatic_door_message:
        'Il computer ha automaticamente aperto la porta usando la tua precedente soluzione',
    close_game: 'Menu principale',

    // Characters
    mesopotamia_jones: 'Mesopotamia Jones',
    von_talin: 'Farren Von Talin',
    hammurtosh: 'An-Ki Hammurtos',
    von_dogen: 'Wow Von Dogen',
    conscious_rock: 'Roccia Senziente',

    // Riddle
    back: 'Indietro',
    knock: 'Bussa alla porta',
    riddle_solved: 'Indovinello risolto!',
    riddle_open_door: 'Apri la porta',
    riddle_solved_hint: 'Clicca il pulsante o premi spazio',
    hint_execute: 'Esegui',
    hint_result: 'Risultato',
    hint_clear: 'Ripristina',

    // Riddle questions
    riddle_return_question: ([a]: number[]) => `Inserisci il numero ${a}`,
    riddle_sum_question: ([a, b]: number[]) =>
        `Quanto fa la somma di ${a} e ${b}?`,
    riddle_word_question: ([a, b, c, d]: string[]) =>
        `Se la porta aprire vorrai, queste lettere inserire dovrai: ${a}, ${b}, ${c}, ${d}`,
    riddle_if_question: ([a, b, c]: number[]) =>
        `Se il numero magico è pari, la porta si apre con la somma di ${a} e ${b}, altrimenti con il prodotto.\n Il numero magico è ${c}`,
    riddle_loop_question: ([a]: number[]) =>
        `Se dalla piramide uscire vorrai, ${a} volte bussare sulla porta dovrai`,

    // Blocks
    block_number: 'numero',
    block_letter: 'lettera',
    block_magic_number: 'numero_magico',
    block_result: 'soluzione',
    block_knock_door: 'bussaPorta',
    block_join: 'unisci',
    block_if: 'se',
    block_then: 'allora',
    block_else: 'altrimenti',
    block_loop: 'ripeti',
    block_times: 'volte',
    block_is_even: 'è pari',
    block_riddle_return_given_number: 'Dato il numero',
    block_riddle_return_given_numbers: 'Dati i numeri',
    block_riddle_return_given_letters: 'Date le lettere',
    block_riddle_return_open_with: 'apri la porta con',
    block_riddle_return_numbers_tooltip:
        'I dati sono numeri, quindi il risultato deve essere un numero',

    // Items
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

    // Tutorials
    tut_riddle_title: "L'indovinello",
    tut_riddle_text:
        'Per aprire la porta devi risolvere questo indovinello. Fai attenzione, i dati cambiano ogni volta.',

    tut_translate_riddle_title: "Tradurre l'indovinello",
    tut_translate_riddle_text:
        "Selezionando una lettera puoi scoprire a quale carattere dell'alfabeto corrisponde nella legenda in basso.",

    tut_open_door_title: 'Il lucchetto',
    tut_open_door_text:
        "Per aprire la porta e passare alla stanza successiva devi inserire nel lucchetto la soluzione dell'indovinello. Puoi usare anche le frecce ▲ e ▼ della tastiera.",

    tut_computer_title: 'Il Computer',
    tut_computer_text:
        'Il computer ti permette di creare una soluzione e si collega alla porta cercando di aprirla usando la soluzione che hai inventato.',

    tut_blocks_title: 'I blocchi',
    tut_blocks_text:
        "Per creare una soluzione devi trascinare questi blocchi nell'area bianca ed unirli come i pezzi di un puzzle.",

    tut_solution_title: 'Provare la soluzione',
    tut_solution_text:
        'Questo pulsante esegue la tua soluzione, se è corretta si aprirá la porta.',

    // Dialogues
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
        'Ogni volta che ci passi i numeri degli indovinelli cambiano e ti costringono a risolvere sempre lo stesso enigma! Per questo motivo avevo iniziato a costruire una macchina in grado di risolvere gli indovinelli automaticamente.',
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
        'Per caso hai visto il mio cane? Gli avevo insegnato ad abbaiare in cuneiforme...',

    dialogue_5_0:
        'Guarda guarda un esploratore sconosciuto, complimenti per essere arrivato fin qui! Sei libero di uscire...',
    dialogue_5_1:
        "...basta solo che risolvi l'indovinello sull'ultima porta. È una sfortuna non ci sia mai riuscito nessuno...",
    dialogue_5_2: 'Sei proprio diaboliho.',
    dialogue_5_3: "Benvenuto all'infernoh muhauhau.",

    dialogue_6_0: 'Wow.',

    dialogue_7_0:
        'Traduzione: "Attento esploratore, oltre quella porta troverai solo pericolo".',

    dialogue_8_0: 'Grazie per averci liberati! Il mio cane vuole parlarti',

    dialogue_9_0: 'WOW! AH-ROO',
    dialogue_9_1:
        'Traduzione: Sono il tuo capo. Test passato. Such Developer. Gioco finito. Titoli di coda... wow!',

    dialogue_need_key: "E' chiuso... servirebbe una chiave.",

    dialogue_need_rock:
        "Questa porta non si apre... l'incisione dice che serve una roccia con un numero di Bacon."
}

export default italian
