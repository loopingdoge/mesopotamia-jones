import { compact, flatten } from 'lodash'

import * as BlocksSrc from '../../assets/tutorials/blocks.webm'
import * as ComputerSrc from '../../assets/tutorials/computer-big.webm'
import * as LockCodeSrc from '../../assets/tutorials/lockcode.webm'
import * as TranslateSrc from '../../assets/tutorials/translate.webm'

import { computer, hasItem, Inventory } from './inventory'

import l10n from '../l10n'

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
            title: l10n.tut_riddle_title,
            selector: '#cuneiformRiddle',
            text: l10n.tut_riddle_text
        },
        {
            title: l10n.tut_translate_riddle_title,
            selector: '#cuneiformRiddle',
            text: l10n.tut_translate_riddle_text,
            video: TranslateSrc as any
        },
        {
            title: l10n.tut_open_door_title,
            selector: '#lockcode',
            text: l10n.tut_open_door_text,
            video: LockCodeSrc as any
        }
    ]
    const computerTutorial: Tutorial[] = [
        {
            title: l10n.tut_computer_title,
            selector: '#blocklyArea',
            text: l10n.tut_computer_text,
            video: ComputerSrc as any
        },
        {
            title: l10n.tut_blocks_title,
            selector: '.blocklyFlyout',
            text: l10n.tut_blocks_text,
            video: BlocksSrc
        },
        {
            title: l10n.tut_solution_title,
            selector: '#play',
            text: l10n.tut_solution_text
        }
    ]

    return compact(
        flatten([
            baseTutorial,
            onlyIf(hasItem(inventory, computer), computerTutorial)
        ])
    )
}
