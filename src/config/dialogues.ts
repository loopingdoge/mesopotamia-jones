import * as MesopotamiaJonesImage from '../../assets/images/mesopotamia-jones.png'
import * as Hammurtosh from '../../assets/images/mummy.png'
import * as Rock from '../../assets/images/rock.png'
import * as VonDogen from '../../assets/images/von-dogen.png'
import * as VonTalin from '../../assets/images/von-talin.png'

import { computer, computerKey, Item, translator } from './inventory'
import { Riddle } from './riddles'

import l10nStore from '../stores/l10nStore'

export interface Character {
    id: string
    name: string
    image: string
}

export interface Line {
    character: Character
    text: string
}

export interface Dialogue {
    id: string
    lines: Line[]
    loot: Item[]
    requiredItem?: Item
    nextDialogueId?: string
}

const createCharacter = (
    id: string,
    name: string,
    image: string
): Character => ({
    id,
    name,
    image
})

const line = (character: Character, text: string): Line => ({ character, text })

const dialogue = (
    id: string,
    lines: Line[],
    loot: Item[],
    requiredItem?: Item,
    nextDialogueId?: string
): Dialogue => ({
    id,
    lines,
    loot,
    requiredItem,
    nextDialogueId
})

export const characters: Character[] = [
    createCharacter('mj', 'Mesopotamia Jones', MesopotamiaJonesImage as any),
    createCharacter('fv', 'Farren Von Talin', VonTalin as any),
    createCharacter('ab', 'An-Ki Hammurtosh', Hammurtosh as any),
    createCharacter('do', 'Wow Von Dogen', VonDogen as any),
    createCharacter('rs', l10nStore.dictionary.conscious_rock, Rock as any)
]

export const NEED_KEY = 'NEED_KEY'
export const DOOR_ROCK_REQUIRED = 'DOOR_ROCK_REQUIRED'

export const dialogues: Dialogue[] = [
    dialogue(
        'dialog1',
        [line(characters[0], l10nStore.dictionary.dialogue_1_0)],
        []
    ),
    dialogue(
        'dialog2',
        [
            line(characters[0], l10nStore.dictionary.dialogue_2_0),
            line(characters[1], l10nStore.dictionary.dialogue_2_1),
            line(characters[0], l10nStore.dictionary.dialogue_2_2),
            line(characters[1], l10nStore.dictionary.dialogue_2_3),
            line(characters[1], l10nStore.dictionary.dialogue_2_4),
            line(characters[1], l10nStore.dictionary.dialogue_2_5),
            line(characters[1], l10nStore.dictionary.dialogue_2_6),
            line(characters[1], l10nStore.dictionary.dialogue_2_7)
        ],
        [computerKey]
    ),
    dialogue(
        'dialog3',
        [
            line(characters[1], l10nStore.dictionary.dialogue_3_0),
            line(characters[0], l10nStore.dictionary.dialogue_3_1),
            line(characters[1], l10nStore.dictionary.dialogue_3_2)
        ],
        [translator],
        undefined,
        'dialog4'
    ),
    dialogue(
        'dialog4',
        [line(characters[1], l10nStore.dictionary.dialogue_4_0)],
        []
    ),
    dialogue(
        'dialog5',
        [
            line(characters[2], l10nStore.dictionary.dialogue_5_0),
            line(characters[2], l10nStore.dictionary.dialogue_5_1),
            line(characters[0], l10nStore.dictionary.dialogue_5_2),
            line(characters[2], l10nStore.dictionary.dialogue_5_3)
        ],
        []
    ),
    dialogue(
        'dialog6',
        [line(characters[3], l10nStore.dictionary.dialogue_6_0)],
        [],
        undefined,
        'dialog7'
    ),
    dialogue(
        'dialog7',
        [line(characters[4], l10nStore.dictionary.dialogue_7_0)],
        []
    ),
    dialogue(
        'dialog8',
        [line(characters[1], l10nStore.dictionary.dialogue_8_0)],
        []
    ),
    dialogue(
        'dialog9',
        [
            line(characters[3], l10nStore.dictionary.dialogue_9_0),
            line(characters[4], l10nStore.dictionary.dialogue_9_1)
        ],
        []
    ),
    dialogue(
        NEED_KEY,
        [line(characters[0], l10nStore.dictionary.dialogue_need_key)],
        []
    ),
    dialogue(
        DOOR_ROCK_REQUIRED,
        [line(characters[0], l10nStore.dictionary.dialogue_need_rock)],
        []
    )
]

const dialogById = (dialogId: string) => (dialog: Dialogue) =>
    dialog.id === dialogId

export const getDialogById = (dialogId: string) =>
    dialogues.find(dialogById(dialogId))
