import * as React from 'react'
import Game from './Game'

export interface HelloProps {
    compiler: string
    framework: string
}

const Hello = (props: HelloProps) =>
    <div>
        <h1>Hello from {props.compiler} and {props.framework}!</h1>
        <Game></Game>
    </div>

export default Hello