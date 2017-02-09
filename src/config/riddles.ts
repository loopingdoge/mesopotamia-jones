export interface Riddle {
    title: string
    question: string
    defaultCode: (variables: any[]) => string
    solution: (variables: any[]) => any
    argsGenerator: () => any[]
}

function randomNum(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const riddles: Riddle[] = [
    {
        title: 'return',
        question: '',
        defaultCode: ([a]: number[]) =>
`var a = ${a}
return `,
        solution: ([a]: number[]) => a,
        argsGenerator: () => [randomNum(1, 10)],
    },
    {
        title: 'somma',
        question: '',
        defaultCode: ([a, b]: number[]) =>
`var a = ${a}
var b = ${b}
var somma = 
return somma`,
        solution: ([a, b]: number[]) => a + b,
        argsGenerator: () => [randomNum(1, 5), randomNum(1, 5)],
    }
]

export default riddles