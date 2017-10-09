import { LocalizedStrings } from '.'

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

export default english
