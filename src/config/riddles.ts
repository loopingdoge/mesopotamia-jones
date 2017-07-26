export interface Riddle {
    id: string
    question: (variables: any[]) => string
    defaultWorkspace: (variables: any[]) => string
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
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="sum" id="/QI!ZS}BFk1e9b%%q*p" deletable="false" x="338" y="163">
                <statement name="USERCODE">
                    <block type="controls_repeat_ext" id="c!rtZ~qI;(f}vgQfPqR">
                        <value name="TIMES">
                        <shadow type="math_number" id="]g1#@PDm*l]@mYA%wI},">
                            <field name="NUM">1</field>
                        </shadow>
                        </value>
                        <statement name="DO">
                            <block type="variables_set" id="~UI=Ue?XEdtHm$tLFeL5">
                                <field name="VAR">numero2</field>
                                <value name="VALUE">
                                    <block type="variables_get" id="*XUKX={JJ(]$yS/C4_aX">
                                        <field name="VAR">numero1</field>
                                    </block>
                                </value>
                            </block>
                        </statement>
                    </block>
                </statement>
                <value name="RETURN">
                    <block type="variables_get" id="*XUKX={JJ(]$yS/C4_aX">
                        <field name="VAR">numero2</field>
                    </block>
                </value>
            </block>
        </xml>`,
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
        solution: ([a, b]: number[]) => `${a + b}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 4), randomNum(1, 4)]
    }
]

export const getRiddlyById = (id: string): Riddle =>
    riddles.filter(r => r.id === id)[0]

export default riddles
