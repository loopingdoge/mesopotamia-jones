import { compact, flatten } from 'lodash'

import * as BlocksSrc from '../../assets/tutorials/blocks.webm'
import * as ComputerSrc from '../../assets/tutorials/computer-big.webm'
import * as LockCodeSrc from '../../assets/tutorials/lockcode.webm'
import * as TranslateSrc from '../../assets/tutorials/translate.webm'

import { computer, hasItem, Inventory } from './inventory'

import strings from '../config/strings'

import { onlyIf } from '../utils'

export interface Tutorial {
    title: string
    selector: string
    text: string
    video?: string
}

export const tutorialSteps = (inventory: Inventory) => {
    const baseTutorial: Tutorial[] = [
        {
            title: strings.tut_riddle_title,
            selector: '#cuneiformRiddle',
            text: strings.tut_riddle_text
        },
        {
            title: strings.tut_translate_riddle_title,
            selector: '#cuneiformRiddle',
            text: strings.tut_translate_riddle_text,
            video: TranslateSrc as any
        },
        {
            title: strings.tut_open_door_title,
            selector: '#lockcode',
            text: strings.tut_open_door_text,
            video: LockCodeSrc as any
        }
    ]
    const computerTutorial: Tutorial[] = [
        {
            title: strings.tut_computer_title,
            selector: '#blocklyArea',
            text: strings.tut_computer_text,
            video: ComputerSrc as any
        },
        {
            title: strings.tut_blocks_title,
            selector: '.blocklyFlyout',
            text: strings.tut_blocks_text,
            video: BlocksSrc
        },
        {
            title: strings.tut_solution_title,
            selector: '#play',
            text: strings.tut_solution_text
        }
    ]

    return compact(
        flatten([
            baseTutorial,
            onlyIf(hasItem(inventory, computer), computerTutorial)
        ])
    )
}
