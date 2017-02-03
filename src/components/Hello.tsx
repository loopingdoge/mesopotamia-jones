import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { GameStore } from '../stores/gameStore'

export interface HelloProps {
    level: number
    incrementLevel: () => void
}

const Hello = ({ level, incrementLevel }: HelloProps) =>
    <div>
        <h1>We are at level: {level}</h1>
        <button onClick={incrementLevel}>Increment</button>
    </div>

export interface HelloContainerProps {
    gameStore?: GameStore
}

@inject('gameStore')
@observer
class HelloContainer extends React.Component<HelloContainerProps, undefined> {
    render() {
        const { level, incrementLevel } = this.props.gameStore
        return (
            <Hello level={level} incrementLevel={incrementLevel}/>
        )
    }
}

export default HelloContainer