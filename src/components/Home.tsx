import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import * as React from 'react'

import l10n from '../l10n'

import { defaultGameStoreState, GameStore } from '../stores/gameStore'

import Button from './Button'
import Section from './Section'

import { sffedora } from '../utils/fonts'

const styles = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#9F4E3B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    home: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: '100%',
        padding: '24px',
        marginBottom: '48px',
        textAlign: 'center',
        fontSize: 'xx-large',
        fontFamily: [sffedora, 'sans-serif']
    },
    titleText: {
        width: '100%',
        position: 'absolute',
        lineHeight: '129%',
        fontSize: '2em',
        backgroundImage: 'linear-gradient(#ff5c33, #ffcc00, #ffff99)',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        textOverflow: 'visible'
    },
    titleShadow: {
        color: 'black',
        marginLeft: '-5px',
        marginTop: '3px'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '102px',
        margin: '0px 20px'
    }
})

export interface HomeProps {
    startGame: () => void
    newGame: () => void
    showCredits: () => void
    saveFileExists: boolean
}

const Home = ({
    startGame,
    newGame,
    showCredits,
    saveFileExists
}: HomeProps) => (
    <div className={css(styles.homeContainer)}>
        <div className={css(styles.home)}>
            <div className={css(styles.title)}>
                <div className={css(styles.titleText, styles.titleShadow)}>
                    Mesopotamia Jones
                </div>
                <div className={css(styles.titleText)}>Mesopotamia Jones</div>
            </div>
            <div className={css(styles.buttonsContainer)}>
                <Button
                    onClick={newGame}
                    text={l10n.new_game}
                    customCSS={styles.button}
                />
                <Button
                    onClick={startGame}
                    text={l10n.continue_game}
                    customCSS={styles.button}
                />
                <Button
                    onClick={showCredits}
                    text={l10n.credits}
                    customCSS={styles.button}
                />
            </div>
        </div>
    </div>
)

export interface HomeContainerProps {
    gameStore?: GameStore
    routingStore?: RouterStore
}

@inject('gameStore', 'routingStore')
@observer
class HomeContainer extends React.Component<HomeContainerProps, undefined> {
    startGame = () => {
        this.props.routingStore.push('/game')
    }

    newGame = () => {
        this.props.gameStore.newGame()
        this.props.routingStore.push('/game')
    }

    showCredits = () => {
        this.props.routingStore.push('/credits')
    }

    render() {
        return (
            <Home
                startGame={this.startGame}
                newGame={this.newGame}
                showCredits={this.showCredits}
                saveFileExists={
                    this.props.gameStore.state.progression.isGameStarted
                }
            />
        )
    }
}

export default HomeContainer
