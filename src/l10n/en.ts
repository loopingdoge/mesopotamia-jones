import { L10N } from '.'

const english: L10N = {
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
    controls_shortcuts: 'Map/Inventory shortcuts',
    notification_automatic_door_message:
        'The computer has automatically opened the door using your previous solution',
    close_game: 'Main menu',

    // Characters
    mesopotamia_jones: 'Mesopotamia Jones',
    von_talin: 'Farren Von Talin',
    hammurtosh: 'An-Ki Hammurtos',
    von_dogen: 'Wow Von Dogen',
    conscious_rock: 'Conscious Rock',

    // Riddle
    back: 'Back',
    knock: 'Kock on the door',
    riddle_solved: 'Riddle solved!',
    riddle_open_door: 'Open the door',
    riddle_solved_hint: 'Click the button or press space to continue',
    hint_execute: 'Execute',
    hint_result: 'Result',
    hint_clear: 'Clear',

    // Riddle questions
    riddle_return_question: ([a]: number[]) => `Insert the number ${a}`,
    riddle_sum_question: ([a, b]: number[]) =>
        `What is the sum of ${a} and ${b}?`,
    riddle_word_question: ([a, b, c, d]: string[]) =>
        `If this door you want to open, to insert these letters you need ${a}, ${b}, ${c}, ${d}`,
    riddle_if_question: ([a, b, c]: number[]) =>
        `If the magic number is even, the door will open with the sum of ${a} and ${b}, otherwise with the product of them.\n The magic number is ${c}`,
    riddle_loop_question: ([a]: number[]) =>
        `If you want to exit from this pyramid, ${a} times you have to knock on this door`,

    // Blocks
    block_number: 'number',
    block_letter: 'letter',
    block_magic_number: 'magic_number',
    block_result: 'solution',
    block_knock_door: 'knockDoor',
    block_join: 'join',
    block_if: 'if',
    block_then: 'then',
    block_else: 'else',
    block_loop: 'repeat',
    block_times: 'times',
    block_is_even: 'is even',
    block_riddle_return_given_number: 'Given the number',
    block_riddle_return_given_numbers: 'Given the numbers',
    block_riddle_return_given_letters: 'Given the letters',
    block_riddle_return_open_with: 'open the door with',
    block_riddle_return_numbers_tooltip:
        'The parameters are numbers, so the result must be a number',

    // Items
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

    // Tutorials
    tut_riddle_title: 'The riddle',
    tut_riddle_text:
        'You have to solve this riddle to open the door. Be careful, the data changes every time.',

    tut_translate_riddle_title: 'Riddle translation',
    tut_translate_riddle_text:
        'Selecting a letter you can find out which letter of the alphabet corresponds to from the legend below.',

    tut_open_door_title: 'The lock',
    tut_open_door_text:
        'To open the door and advance to the next room you have to set the correct solution in the lock. You can also use the ▲ e ▼ keys on your keyboard',

    tut_computer_title: 'The computer',
    tut_computer_text:
        'The computer allows to create a solution and tries to open the door using the solution you created.',

    tut_blocks_title: 'The blocks',
    tut_blocks_text:
        'You can create a solution by dragging these block in the white area and connecting them like puzzle pieces.',

    tut_solution_title: 'Try the solution',
    tut_solution_text:
        'This button executes your solution, if it is correct the door will open.',

    // Dialogues
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

    dialogue_5_0:
        'Look this stranger explorer, congratulation for gettin this far! You are free to leave...',
    dialogue_5_1:
        "...you just have to solve the riddle on the last door. It's unfortunate that none has succeded...",
    dialogue_5_2: "You're so diabolihal.",
    dialogue_5_3: 'Wellhome to hell muhauhau.',

    dialogue_6_0: 'Wow.',

    dialogue_7_0:
        'Translation: be careful explorer, you will find only danger beyond that door.',

    dialogue_8_0: 'Thanks for freeing us! My dog wants to talk with you',

    dialogue_9_0: 'WOW! AH-ROO.',
    dialogue_9_1:
        'Translation: I am your boss. Test passed. Such Developer. Game is ended. End credits... wow!',

    dialogue_need_key: "It's closed, I need a key.",

    dialogue_need_rock:
        "This door is closed... the engraving says it's needed a rock that has a Bacon number."
}

export default english
