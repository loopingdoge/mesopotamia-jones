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
            title: 'Tradurre i simboli',
            selector: '#cuneiformRiddle',
            text:
                'Sulla porta sono incisi questi simboli, sembra essere un indovinello. Fortunatamente ho una legenda che mi permette di tradurre questi simboli! Passando con il mouse sopra a questi simboli, la lettera corrispondente si illuminerà nella legenda!'
        },
        {
            title: 'Aprire la porta',
            selector: '#lockcodes',
            text:
                "Una volta tradotto l'indovinello, devo inserire qui la soluzione, una volta trovata quella corretta la porta si aprirà."
        }
    ]
    const computerTutorial: Tutorial[] = [
        {
            title: 'Computer',
            selector: '#blocklyArea',
            text:
                "Ogni volta che passo da una porta l'indovinello rimane lo stesso, ma cambiano sempre i numeri! Con il computer posso risolvere l'indovinello in modo che vada bene per qualsiasi numero, così facendo la porta si aprirà automaticamente."
        },
        {
            title: 'Blocchi',
            selector: '.blocklyFlyout',
            text:
                "Per risolvere l'indovinello posso comporre assieme questi blocchi, funzionano come un puzzle! I pezzi compatibili possono essere incastrati assieme. In questa barra ci sono i blocchi che posso usare, e li posso comporre spostandoli nell'area bianca a destra.",
            image: DragGif as any
        },
        {
            title: 'Eseguire il programma',
            selector: '#play',
            text:
                'Una volta che sono soddisfatto della mia soluzione, posso premere questo bottone per provarla. Se non ci sono errori, gli ingranaggi della porta si muoveranno automaticamente, formando la soluzione generata dai blocchi che ho composto.'
        }
    ]

    return compact(
        flatten([
            baseTutorial,
            onlyIf(hasItem(inventory, computer), computerTutorial)
        ])
    )
}
