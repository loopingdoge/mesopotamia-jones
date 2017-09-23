import * as React from 'react'

import * as ComputerImage from '../../assets/images/computer.png'
import * as ComputerKeyImage from '../../assets/images/key.png'
import * as CuneiformLegendImage from '../../assets/images/legend.png'
import * as TranslatorImage from '../../assets/images/rock.png'

export interface Item {
    id: string
    name: string
    description: string
    image: any
}

export class Computer implements Item {
    id: string = COMPUTER
    name = 'HAL 1337'
    description = 'La macchina che Von Talin in passato ha costruito. Questo macchina si collega alle porte e permette di risolvere gli enigmi automaticamente, se programmato correttamente.'
    workspace: { [riddleId: string]: string } = {}
    image = ComputerImage
}

// Computer allows user to have the blockly editor
export const COMPUTER = 'COMPUTER'
// export const ROCK_SMASHER = 'ROCK_SMASHER'
export const COMPUTER_KEY = 'COMPUTER_KEY'
export const TRANSLATOR = 'CUNEIFORM_TRANSLATOR'
export const LEGEND = 'LEGEND'

export const toolboxEntries: any = [
    // {
    //     id: 'math_number',
    //     xml: `<block type="math_number"></block>`
    // }
    // {
    //     id: 'variables_get',
    //     xml: `<block type="variables_get">
    //         <field name="VAR">variable</field>
    //     </block>`
    // }
]

export const addToolboxEntry = (id: string, xml: string) =>
    toolboxEntries.push({ id, xml })

export const getToolbox = (additionalEntries: any[]) => {
    let toolbox = '<xml id="toolbox" style="display: none">'
    // tslint:disable:curly
    for (const entry of additionalEntries) toolbox += entry
    for (const entry of toolboxEntries) toolbox += entry.xml
    // tslint:enable:curly
    toolbox += '</xml>'
    return toolbox
}
// <block type="controls_if"></block>
// <block type="controls_repeat_ext"></block>
// <block type="logic_compare"></block>
// <block type="math_arithmetic"></block>
// <block type="text"></block>
// <block type="text_print"></block>

const createItem = (
    id: string,
    name: string,
    description: string,
    image: any
): Item => ({
    id,
    name,
    description,
    image
})

export const computer = new Computer()
// export const rockSmasher = createItem(ROCK_SMASHER, 'rock smasher', '')
export const computerKey = createItem(
    COMPUTER_KEY,
    'vecchia chiave',
    'questa chiave serve ad aprire una cassa contenente il computer di Von Talin.',
    ComputerKeyImage
)

export const translator = createItem(
    TRANSLATOR,
    'roccia senziente',
    'questo oggetto traduce automaticamente i testi degli indovinelli. Sembra contenere il fantasma di un maestro di cuneiforme.',
    TranslatorImage
)

export const legend = createItem(
    LEGEND,
    'legenda di cuneiforme',
    "una legenda che permette di tradurre l'alfabeto cuneiforme nel nostro alfabeto.",
    CuneiformLegendImage
)

const items: Item[] = [computer]

export type Inventory = Item[]

export const getItemById = (id: string) =>
    items.filter((item: Item) => item.id === id)[0]

export const defaultInventory = (): Inventory => [legend]

export const hasItem = (inventory: Inventory, item: Item): boolean =>
    inventory.filter(i => i.id === item.id).length > 0

export const addItem = (inventory: Inventory, item: Item): Inventory => {
    if (hasItem(inventory, item)) {
        return [...inventory]
    } else {
        return [...inventory, item]
    }
}

export const reactourInventory = (inventory: Inventory) => {
    const tutorials = inventory.map(item => {
        if (item.id === COMPUTER) {
            return [
                {
                    selector: '#blocklyArea',
                    text:
                        "Ogni volta che passo da una porta l'indovinello rimane lo stesso, ma cambiano sempre i numeri! Con il computer posso risolvere l'indovinello in modo che vada bene per qualsiasi numero, così facendo la porta di aprirà automaticamente."
                },
                {
                    selector: '.blocklyFlyout',
                    text:
                        "Per risolvere l'indovinello posso comporre assieme questi blocchi, funzionano come un puzzle! I pezzi compatibili possono essere incastrati assieme. In questa barra ci sono i blocchi che posso usare, e li posso comporre spostandoli nell'area bianca a destra."
                },
                {
                    selector: '#play',
                    text:
                        'Una volta che sono soddisfatto della mia soluzione, posso premere questo bottone per provarla. Se non ci sono errori, gli ingranaggi della porta si muoveranno automaticamente, formando la soluzione generata dai blocchi che ho composto.'
                }
            ]
        }
    })
    return tutorials.reduce(
        (prev, curr) => (curr ? prev.concat(curr) : prev),
        []
    )
}
