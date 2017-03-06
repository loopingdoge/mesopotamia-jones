export interface Riddle {
    id: string
    question: string
    defaultCode: (variables: any[]) => string
    solution: (variables: any[]) => string
    solutionLength: number,
    solutionType: SolutionType,
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
    for (let i = 0; i < length; i++) str = str.concat(type === 'string' ? 'a' : '0')
    return str
}

const riddles: Riddle[] = [
{
    id: 'return',
    question: 'Identità',
    defaultCode: ([a]: number[]) =>
`var a = ${a};
return ;`,
    solution: ([a]: number[]) => `${a}`,
    solutionLength: 1,
    solutionType: 'number',
    argsGenerator: () => [randomNum(1, 9)],
},
{
    id: 'somma',
    question: 'Quanto fa la somma di 2 numeri?',
    defaultCode: ([a, b]: number[]) =>
`var a = ${a};
var b = ${b};
var somma = ;
return somma;`,
    solution: ([a, b]: number[]) => `${a + b}`,
    solutionLength: 1,
    solutionType: 'number',
    argsGenerator: () => [randomNum(1, 4), randomNum(1, 4)],
}
]

export const getRiddlyById = (id: string): Riddle =>
riddles.filter(r => r.id === id)[0]

export default riddles