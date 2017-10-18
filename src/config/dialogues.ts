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
    nameId: string
    image: string
}

export interface Line {
    character: Character
    dialogueId: string
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
    nameId: string,
    image: string
): Character => ({
    id,
    nameId,
    image
})

const line = (character: Character, dialogueId: string): Line => ({
    character,
    dialogueId
})

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
    createCharacter('mj', 'mesopotamia_jones', MesopotamiaJonesImage as any),
    createCharacter('fv', 'von_talin', VonTalin as any),
    createCharacter('ab', 'hammurtosh', Hammurtosh as any),
    createCharacter('do', 'von_dogen', VonDogen as any),
    createCharacter('rs', 'conscious_rock', Rock as any)
]

export const NEED_KEY = 'NEED_KEY'
export const DOOR_ROCK_REQUIRED = 'DOOR_ROCK_REQUIRED'

export const dialogues: Dialogue[] = [
    dialogue('dialog1', [line(characters[0], 'dialogue_1_0')], []),
    dialogue(
        'dialog2',
        [
            line(characters[0], 'dialogue_2_0'),
            line(characters[1], 'dialogue_2_1'),
            line(characters[0], 'dialogue_2_2'),
            line(characters[1], 'dialogue_2_3'),
            line(characters[1], 'dialogue_2_4'),
            line(characters[1], 'dialogue_2_5'),
            line(characters[1], 'dialogue_2_6'),
            line(characters[1], 'dialogue_2_7')
        ],
        [computerKey]
    ),
    dialogue(
        'dialog3',
        [
            line(characters[1], 'dialogue_3_0'),
            line(characters[0], 'dialogue_3_1'),
            line(characters[1], 'dialogue_3_2')
        ],
        [translator],
        undefined,
        'dialog4'
    ),
    dialogue('dialog4', [line(characters[1], 'dialogue_4_0')], []),
    dialogue(
        'dialog5',
        [
            line(characters[2], 'dialogue_5_0'),
            line(characters[2], 'dialogue_5_1'),
            line(characters[0], 'dialogue_5_2'),
            line(characters[2], 'dialogue_5_3')
        ],
        []
    ),
    dialogue(
        'dialog6',
        [line(characters[3], 'dialogue_6_0')],
        [],
        undefined,
        'dialog7'
    ),
    dialogue('dialog7', [line(characters[4], 'dialogue_7_0')], []),
    dialogue('dialog8', [line(characters[1], 'dialogue_8_0')], []),
    dialogue(
        'dialog9',
        [
            line(characters[3], 'dialogue_9_0'),
            line(characters[4], 'dialogue_9_1')
        ],
        []
    ),
    dialogue(NEED_KEY, [line(characters[0], 'dialogue_need_key')], []),
    dialogue(
        DOOR_ROCK_REQUIRED,
        [line(characters[0], 'dialogue_need_rock')],
        []
    )
]

const dialogById = (dialogId: string) => (dialog: Dialogue) =>
    dialog.id === dialogId

export const getDialogById = (dialogId: string) =>
    dialogues.find(dialogById(dialogId))
