import { LocalizedStrings } from '.'

const english: LocalizedStrings = {
    new_game: 'New Game',
    continue_game: 'Continue',
    credits: 'Credits',

    map: 'Map',
    inventory: 'Inventory',
    help: 'Help',
    menu: 'Menu',
    continue_hint_keyboard: 'Press space to continue',
    continue_hint_mobile: 'Touch to continue',
    controls_game_controls: 'Game Controls',
    controls_move: 'Move',
    controls_interact: 'Interact',
    controls_space: '\u2423 (space)',
    controls_shortcuts: 'Shortcuts',
    notification_automatic_door_message:
        'The computer has automatically opened the door using your previous solution',
    close_game: 'Exit game',

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
    riddle_loop_question: ([a]: number[]) =>
        `If you want to exit from this pyramid, ${a} times you have to knock on this door`,

    block_number: 'number',
    block_letter: 'letter',
    block_magic_number: 'magic_number',
    block_result: 'result',
    block_join: 'join',
    block_if: 'if',
    block_then: 'then',
    block_else: 'else',
    block_is_even: 'is even',
    block_riddle_return_given_number: 'Given the number',
    block_riddle_return_given_numbers: 'Given the numbers',
    block_riddle_return_given_letters: 'Given the letters',
    block_riddle_return_open_with: 'open the door with',
    block_riddle_return_numbers_tooltip:
        'The parameters are numbers, so the result must be a number',

    conscious_rock: 'Conscious Rock',

    computer_name: 'HAL 1337',
    computer_description:
        'The machine that Von Talin developed in the past. This machine connects to the doors and allows to automatically solve riddles, if properly programmed.',
    old_key_name: 'old key',
    old_key_description:
        "a key that opens the chest containing Von Talin's machine",
    conscious_rock_name: 'conscious rock',
    conscious_rock_description:
        'a rock that automatically translates the riddles on the doors. Seems like it contains the ghost of a cuneiform teacher',
    cuneiform_legend_name: 'cuneiform legend',
    cuneiform_legend_description:
        'this legend allows translating letters from cuneiform to our alphabet.',
    map_name: 'map of the pyramid',
    map_description: "a map showing all the explored pyramid's rooms",

    tut_riddle_title: 'The riddle',
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

    dialogue_1_0:
        "Oh darn, I must find an exit. There's a door over there, let's see what's beyond it",

    dialogue_2_0:
        "There's a person here, how is it possible? These ruins should have been buried for thousands of years.",
    dialogue_2_1:
        "Who dares to draw me out of my eternal sleep!? Well, I've been asleep for 104 years it's time to wake up... I'm Farren Von Talin and I used to be an explorer like you then...",
    dialogue_2_2: '... Then you got hurt to the knee?',
    dialogue_2_3:
        'What? No, like you I got trapped in these ruins! Perhaps you already noticed it, but the doors in this place are cursed!',
    dialogue_2_4:
        'Everytime you pass through them, the numbers in the riddles do change and force you to solve again the same riddle! For this reason I started building a machine able to automatically solve them automatically.',
    dialogue_2_5:
        'Unfortunately An-Ki Hammurtosh prowls in this cave, he is an evil mummy who cursed this place and turned me into a ghost, condemning to live here forever.',
    dialogue_2_6:
        "To protect it from the clutches of Hammurtosh, I hid the machine in a chest in the room where you have landed, here's the key to open it.",
    dialogue_2_7:
        "Once you have recovered it, come back to me and I'll give you a present!",

    dialogue_3_0:
        'Now that you have the computer it will be easier to escape this cave, but let me help you one more time... there you go, I installed the pre-alphabet versions of Minecraft and Angry Birds like you asked me to.',
    dialogue_3_1:
        "Actually I don't recall asking you that, also I don't think they will help me. Don't you have something more useful?",
    dialogue_3_2:
        "Alright, as you wish, it looks like you need some company and also, it's dangerous to go alone! Take this.",

    dialogue_4_0:
        'Did you see my dog by any chance? I taught him to bark in cuneiform...',

    dialogue_5_0: 'Wellhome to hell.',
    dialogue_5_1: "You're so diabolihal.",
    dialogue_5_2: 'TODO',
    dialogue_5_3: 'TODO',

    dialogue_6_0: 'Wow.',

    dialogue_7_0:
        'Translation: be careful explorer, you will find only danger beyond that door.',

    dialogue_need_key: "It's closed, I need a key.",

    dialogue_need_rock:
        'This door is closed... seems like I need to insert a small rock in this hole.'
}

export default english
