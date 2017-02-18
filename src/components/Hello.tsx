import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { GameStore } from '../stores/gameStore'

export interface HelloProps {
    level: string
}

const Hello = ({ level }: HelloProps) =>
    <div>
        <h1>We are at level: {level}</h1>
    </div>

export interface HelloContainerProps {
    gameStore?: GameStore
}

@inject('gameStore')
@observer
class HelloContainer extends React.Component<HelloContainerProps, undefined> {
    render() {
        const level = this.props.gameStore.room.id
        return (
            <Hello level={level} />
        )
    }
}

export default HelloContainer