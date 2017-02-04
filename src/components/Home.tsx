import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
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
        <Section />
        {/*<div>
            <button onClick={newGame}>New Game</button>
            <button onClick={showCredits}>Credits</button>
        </div>*/}
    </div>

export interface HomeContainerProps {
    gameStore?: GameStore
}

@inject('gameStore')
@observer
class HomeContainer extends React.Component<HomeContainerProps, undefined> {
    render() {
        return (
            <Home
                startGame={() => {}}
                newGame={() => {}}
                showCredits={() => {}}
            />
        )
    }
}

export default HomeContainer