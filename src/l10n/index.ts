import * as getLocale from 'browser-locale'

import english from './en'
import italian from './it'

export type Language = 'it' | 'en'
type DictFunc = (...args: any[]) => string

export interface L10N {
    [id: string]: any
}

// export interface L10N {
//     // Home
//     new_game: string
//     continue_game: string
//     credits: string

//     // Game
//     map: string
//     inventory: string
//     help: string
//     menu: string
//     continue_hint_keyboard: string
//     continue_hint_mobile: string
//     controls_game_controls: string
//     controls_move: string
//     controls_interact: string
//     controls_space: string
//     controls_shortcuts: string
//     notification_automatic_door_message: string
//     close_game: string

//     // Characters
//     mesopotamia_jones: string
//     von_talin: string
//     hammurtosh: string
//     von_dogen: string
//     conscious_rock: string

//     // Riddle
//     back: string
//     knock: string
//     riddle_solved: string
//     riddle_open_door: string
//     riddle_solved_hint: string

//     // Riddle questions
//     riddle_return_question: (...args: any[]) => string
//     riddle_sum_question: (...args: any[]) => string
//     riddle_word_question: (...args: any[]) => string
//     riddle_if_question: (...args: any[]) => string
//     riddle_loop_question: (...args: any[]) => string

//     // Blocks
//     block_number: string
//     block_letter: string
//     block_magic_number: string
//     block_result: string
//     block_knock_door: string
//     block_join: string
//     block_if: string
//     block_then: string
//     block_else: string
//     block_loop: string
//     block_times: string
//     block_is_even: string
//     block_riddle_return_given_number: string
//     block_riddle_return_given_numbers: string
//     block_riddle_return_given_letters: string
//     block_riddle_return_open_with: string
//     block_riddle_return_numbers_tooltip: string

//     // Items
//     computer_name: string
//     computer_description: string
//     old_key_name: string
//     old_key_description: string
//     conscious_rock_name: string
//     conscious_rock_description: string
//     cuneiform_legend_name: string
//     cuneiform_legend_description: string
//     map_name: string
//     map_description: string

//     // Tutorials
//     tut_riddle_title: string
//     tut_riddle_text: string

//     tut_translate_riddle_title: string
//     tut_translate_riddle_text: string

//     tut_open_door_title: string
//     tut_open_door_text: string

//     tut_computer_title: string
//     tut_computer_text: string

//     tut_blocks_title: string
//     tut_blocks_text: string

//     tut_solution_title: string
//     tut_solution_text: string

//     // Dialogues
//     dialogue_1_0: string

//     dialogue_2_0: string
//     dialogue_2_1: string
//     dialogue_2_2: string
//     dialogue_2_3: string
//     dialogue_2_4: string
//     dialogue_2_5: string
//     dialogue_2_6: string
//     dialogue_2_7: string

//     dialogue_3_0: string
//     dialogue_3_1: string
//     dialogue_3_2: string

//     dialogue_4_0: string

//     dialogue_5_0: string
//     dialogue_5_1: string
//     dialogue_5_2: string
//     dialogue_5_3: string

//     dialogue_6_0: string

//     dialogue_7_0: string

//     dialogue_8_0: string

//     dialogue_9_0: string
//     dialogue_9_1: string

//     dialogue_need_key: string

//     dialogue_need_rock: string
// }

export const getL10NDictionary = (language?: Language) => {
    if (language) {
        switch (language) {
            case 'it':
                return italian
            case 'en':
                return english
        }
    } else {
        const locale = getLocale()
        switch (locale) {
            case 'it-IT':
                return italian
            default:
                return english
        }
    }
}

export const l10n = getL10NDictionary()

export default l10n
