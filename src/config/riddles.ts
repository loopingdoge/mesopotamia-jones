export interface Riddle {
    title: string
    riddle: string
    defaultCode(variables: any[]): string
    solution(variables: any[]): any
}

const riddles: Riddle[] = [
    {
        title: 'return',
        riddle: '',
        defaultCode: ([a]: number[]) =>
`var a = ${a}
return `,
        solution: ([a]: number[]) => a
    },
    {
        title: 'somma',
        riddle: '',
        defaultCode: ([a, b]: number[]) =>
`var a = ${a}
var b = ${b}
var somma = 
return somma`,
        solution: ([a, b]: number[]) => a + b
    }
]

export default riddles