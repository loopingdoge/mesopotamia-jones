import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { RouterStore } from 'mobx-react-router'

import { GameStore } from '../stores/gameStore'
import Section from './Section'

const styles = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    footer: {

    },
})

export interface HomeProps {
    startGame: () => void
    newGame: () => void
    showCredits: () => void
}

const Home = ({ startGame, newGame, showCredits }: HomeProps) =>
    <div className={css(styles.homeContainer)}>
        <Section startGame={startGame}/>
        {/*<div>
            <button onClick={newGame}>New Game</button>
            <button onClick={showCredits}>Credits</button>
        </div>*/}
    </div>

export interface HomeContainerProps {
    gameStore?: GameStore
    routingStore?: RouterStore
}

@inject('gameStore', 'routingStore')
@observer
class HomeContainer extends React.Component<HomeContainerProps, undefined> {
    render() {
        const { push } = this.props.routingStore
        return (
            <Home
                startGame={() => push('/riddle')}
                newGame={() => {}}
                showCredits={() => {}}
            />
        )
    }
}

export default HomeContainer