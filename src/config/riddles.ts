export interface Riddle {
    id: string
    question: (variables: any[]) => string
    defaultWorkspace: (variables: any[]) => string
    // defaultCode: (variables: any[]) => string
    parameters: (variables: any[]) => string[]
    solution: (variables: any[]) => string
    solutionLength: number
    solutionType: SolutionType
    argsGenerator: () => any[]
}

export type SolutionType = 'string' | 'number'

const randomNum = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const userSolutionInit = (type: SolutionType, length: number) => {
    let str = ''
    for (let i = 0; i < length; i++)
        str = str.concat(type === 'string' ? 'a' : '0')
    return str
}

const riddles: Riddle[] = [
    {
        id: 'return',
        question: ([a]: number[]) => `Inserisci il numero ${a}`,
        defaultWorkspace: ([a]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="sum" id="tu=J+M:Ap=x8XtDF-,-Y" deletable="false" x="38" y="38"></block>
        </xml>`,
        parameters: ([a]: number[]) => [`var a = ${a};`],
        solution: ([a]: number[]) => `${a}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 9)]
    },
    {
        id: 'somma',
        question: ([a, b]: number[]) => `Quanto fa la somma di ${a} e ${b}?`,
        defaultWorkspace: ([a, b]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="procedures_defreturn" id="tu=J+M:Ap=x8XtDF-,-Y" deletable="false" x="38" y="38">
                <mutation>
                    <arg name="x"></arg>
                    <arg name="y"></arg>
                </mutation>
                <field name="NAME">sum</field>
                <comment pinned="false" h="80" w="160">Sum of two numbers</comment>
            </block>
        </xml>`,
        parameters: ([a, b]: number[]) => [`var a = ${a};`, `var b = ${b};`],
        solution: ([a, b]: number[]) => `${a + b}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 4), randomNum(1, 4)]
    }
]

export const getRiddlyById = (id: string): Riddle =>
    riddles.filter(r => r.id === id)[0]

export default riddles
