import * as React from 'react'

export interface GameProps {
    width: number
    height: number
}

const Game = ({ width, height }: GameProps) =>
    <div
        style={{ width, height }}
        key='game'
        id='game'
    />

export default Game