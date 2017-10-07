import { compact, flatten } from 'lodash'

import * as BlocksSrc from '../../assets/tutorials/blocks.webm'
import * as ComputerSrc from '../../assets/tutorials/computer-big.webm'
import * as LockCodeSrc from '../../assets/tutorials/lockcode.webm'
import * as TranslateSrc from '../../assets/tutorials/translate.webm'

import { computer, hasItem, Inventory } from './inventory'

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
            title: "L'indovinello",
            selector: '#cuneiformRiddle',
            text:
                'Per aprire la porta devi risolvere questo indovinello.\n ATTENTO! I dati cambiano sempre'
        },
        {
            title: "Tradurre l'indovinello",
            selector: '#cuneiformRiddle',
            text:
                'Selezionando una lettera puoi scoprire a quale simbolo corrisponde nella legenda',
            video: TranslateSrc as any
        },
        {
            title: 'Aprire la porta',
            selector: '#lockcode',
            text:
                "Per aprire la porta devi inserire qui la soluzione dell'indovinello",
            video: LockCodeSrc as any
        }
    ]
    const computerTutorial: Tutorial[] = [
        {
            title: 'Il Computer',
            selector: '#blocklyArea',
            text:
                'Il computer cerca di aprire la porta con la soluzione che hai inventato',
            video: ComputerSrc as any
        },
        {
            title: 'I blocchi',
            selector: '.blocklyFlyout',
            text:
                "Per creare una soluzione devi trascinare questi blocchi nell'area bianca ed unirli come i pezzi di un puzzle",
            video: BlocksSrc
        },
        {
            title: 'Provare la soluzione',
            selector: '#play',
            text:
                'Questo pulsante esegue la tua soluzione. Con un risultato corretto si apre la porta'
        }
    ]

    return compact(
        flatten([
            baseTutorial,
            onlyIf(hasItem(inventory, computer), computerTutorial)
        ])
    )
}
