export interface Riddle {
    id: string
    question: string
    defaultCode: (variables: any[]) => string
    solution: (variables: any[]) => any
    argsGenerator: () => any[]
}

const randomNum = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const riddles: Riddle[] = [
    {
        id: 'return',
        question: 'Identità',
        defaultCode: ([a]: number[]) =>
`var a = ${a};
return ;`,
        solution: ([a]: number[]) => a,
        argsGenerator: () => [randomNum(1, 10)],
    },
    {
        id: 'somma',
        question: 'Quanto fa la somma di 2 numeri?',
        defaultCode: ([a, b]: number[]) =>
`var a = ${a};
var b = ${b};
var somma = ;
return somma;`,
        solution: ([a, b]: number[]) => a + b,
        argsGenerator: () => [randomNum(1, 5), randomNum(1, 5)],
    }
]

export const getRiddlyById = (id: string): Riddle =>
    riddles.filter(r => r.id === id)[0]

export default riddles