import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { getOrElse, onlyIf } from '../utils'

import { GamePhase, GameState, GameStore } from '../stores/gameStore'
import { GameUI, UIStore } from '../stores/gameUIStore'

import { Dialogue } from '../config/dialogues'
import { Item } from '../config/inventory'
import l10n from '../l10n'

import DialogueUI from './Dialogue'
import FadedContainer from './FadedContainer'
import FoundItem from './FoundItem'
import Game from './Game'
import GameHeader from './GameHeader'
import GameNotification from './GameNotification'
import GameOverlay from './GameOverlay'
import Riddle from './Riddle'

import Inventory from '../containers/Inventory'
import MapWrapper from '../containers/MapWrapper'
import defaultWidthHeight from '../containers/widthHeightProvider'
import Credits from './Credits'
import Endscreen from './Endscreen'
import GameControls from './GameControls'
import GameMenu from './GameMenu'

const PropsedFadedContainer = defaultWidthHeight(FadedContainer)

const styles = StyleSheet.create({
    mesopotamiaJonesContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF6E3',
        overflow: 'hidden'
    },
    content: {
        height: 'inherit'
    }
})

const getPosition: (phase: GamePhase) => 'initial' | 'absolute' = (
    phase: GamePhase
) => (phase === 'Game' ? 'initial' : 'absolute')

const getStyles = (phase: GamePhase) => ({
    game: {
        display: 'flex',
        flex: 1,
        position: getPosition(phase),
        opacity: phase === 'Game' ? 1 : 0,
        zIndex: phase === 'Game' ? 0 : -9999
    },
    riddle: {
        display: phase === 'Riddle' ? 'flex' : 'none',
        flex: 1
    }
})

export interface MesopotamiaJonesProps {
    gamePhase: GamePhase
    activeDialogue: Dialogue
    activeFoundItem: Item
    pageWidth: number
    pageHeight: number
    gameUi: GameUI
    isNotificationVisible: boolean
    hideControls: (...args: any[]) => any
    hideEndscreen: () => any
    hideCredits: () => any
}

const MesopotamiaJones = ({
    gamePhase,
    activeDialogue,
    activeFoundItem,
    pageWidth,
    pageHeight,
    gameUi,
    isNotificationVisible,
    hideControls,
    hideEndscreen,
    hideCredits
}: MesopotamiaJonesProps) => {
    const MaybeHeader = onlyIf(gamePhase !== 'Riddle', <GameHeader />)
    // const MaybeOverlay = onlyIf(gamePhase !== 'Riddle', <GameOverlay />)
    const MaybeRiddle = onlyIf(
        gamePhase === 'Riddle',
        <div
            style={getStyles(gamePhase).riddle}
            className={css(styles.content)}
        >
            <Riddle />
        </div>
    )
    const MaybeDialogue = onlyIf(
        activeDialogue !== null,
        <PropsedFadedContainer>
            <DialogueUI />
        </PropsedFadedContainer>
    )
    const MaybeFoundItem = onlyIf(
        activeFoundItem !== null,
        <PropsedFadedContainer>
            <FoundItem item={activeFoundItem} />
        </PropsedFadedContainer>
    )
    const MaybeControls = onlyIf(
        gameUi === GameUI.Help,
        <PropsedFadedContainer>
            <GameControls onClose={hideControls} />
        </PropsedFadedContainer>
    )
    const MaybeMenu = onlyIf(
        gameUi === GameUI.Menu,
        <PropsedFadedContainer>
            <GameMenu />
        </PropsedFadedContainer>
    )
    const MaybeEndscreen = onlyIf(
        gameUi === GameUI.Endscreen,
        <PropsedFadedContainer>
            <Endscreen onClose={hideEndscreen} />
        </PropsedFadedContainer>
    )
    const MaybeCredits = onlyIf(
        gameUi === GameUI.Credits,
        <PropsedFadedContainer>
            <Credits onClose={hideCredits} />
        </PropsedFadedContainer>
    )

    let overlayContent
    switch (gameUi) {
        case GameUI.Game:
            overlayContent = null
            break
        case GameUI.Inventory:
            overlayContent = <Inventory />
            break
        case GameUI.Map:
            overlayContent = <MapWrapper />
            break
    }

    if (pageWidth < 1280 || pageHeight < 720) {
        // TODO: Show an error
        // console.error(
        //     'a minimum resolution of 1280x720 is required to run the game'
        // )
    }

    return (
        <div className={css(styles.mesopotamiaJonesContainer)}>
            <div style={{ width: pageWidth, height: pageHeight }}>
                {MaybeDialogue}
                {MaybeFoundItem}
                {MaybeHeader}
                {MaybeControls}
                {MaybeMenu}
                {MaybeEndscreen}
                {MaybeCredits}
                <GameOverlay
                    width={pageWidth}
                    height={pageHeight}
                    gameUi={gameUi}
                    gamePhase={gamePhase}
                >
                    {overlayContent}
                </GameOverlay>
                <div
                    style={getStyles(gamePhase).game}
                    className={css(styles.content)}
                >
                    <Game width={pageWidth} height={pageHeight} />
                </div>
                <GameNotification
                    width={pageWidth}
                    visible={isNotificationVisible}
                    text={l10n.notification_automatic_door_message}
                />
                {MaybeRiddle}
            </div>
        </div>
    )
}

interface MesopotamiaJonesContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

@inject('gameStore', 'uiStore')
@observer
class MesopotamiaJonesContainer extends React.Component<
    MesopotamiaJonesContainerProps
> {
    componentDidMount() {
        this.props.gameStore.startGame()
    }

    render() {
        const { state } = this.props.gameStore
        const { phase, activeDialogue, activeFoundItem } = state
        const {
            width,
            height,
            isNotificationVisible,
            hideOverlay,
            hideEndscreen,
            hideCredits
        } = this.props.uiStore
        return (
            <MesopotamiaJones
                gamePhase={phase}
                activeDialogue={activeDialogue}
                activeFoundItem={activeFoundItem}
                pageWidth={width}
                pageHeight={height}
                gameUi={this.props.uiStore.state.ui}
                isNotificationVisible={isNotificationVisible}
                hideControls={hideOverlay}
                hideEndscreen={hideEndscreen}
                hideCredits={hideCredits}
            />
        )
    }
}

export default MesopotamiaJonesContainer
