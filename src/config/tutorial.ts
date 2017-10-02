import { compact, flatten } from 'lodash'

import * as DragGif from '../../assets/images/drag-tutorial.gif'

import { computer, hasItem, Inventory } from './inventory'

import { onlyIf } from '../utils'

export interface Tutorial {
    title: string
    selector: string
    text: string
    image?: string
}

export const tutorialSteps = (inventory: Inventory) => {
    const baseTutorial: Tutorial[] = [
        {
            title: "L'indovinello...",
            selector: '#cuneiformRiddle',
            text:
                'Per aprire la porta devi risolvere questo indovinello.\n ATTENTO! I dati cambiano sempre'
        },
        {
            title: "Tradurre l'indovinello...",
            selector: '#cuneiformRiddle',
            text:
                'Selezionando una lettera puoi scoprire a quale simbolo corrisponda nella legenda'
        },
        {
            title: 'Aprire la porta...',
            selector: '#lockcodes',
            text:
                "Per aprire la porta devi inserire qui la soluzione dell'indovinello"
        }
    ]
    const computerTutorial: Tutorial[] = [
        {
            title: 'Il Computer...',
            selector: '#blocklyArea',
            text:
                'Il computer cerca di aprire la porta con la soluzioni che hai inventato'
        },
        {
            title: 'I blocchi...',
            selector: '.blocklyFlyout',
            text:
                "Per creare una soluzione devi trascinare questi blocchi nell'area bianca ed unirli come i pezzi di un puzzle",
            image: DragGif as any
        },
        {
            title: 'Provare la soluzione...',
            selector: '#play',
            text:
                'Questo pulsante eseguire la tua soluzione. Con un risultato corretto si apre la porta'
        }
    ]

    return compact(
        flatten([
            baseTutorial,
            onlyIf(hasItem(inventory, computer), computerTutorial)
        ])
    )
}
