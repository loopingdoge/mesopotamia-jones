import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as WebFont from 'webfontloader'

import { Dialog } from '../config/dialogs'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.25))',
        zIndex: 100,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    hidden: {
        display: 'none'
    }
})

export interface FadedContainerProps {
    isActive: boolean
    width: number
    height: number
}

class FadedContainer extends React.Component<FadedContainerProps> {
    render() {
        const { width, height, isActive } = this.props
        const containerStyle = { width, height }

        return (
            <div
                id="dialog"
                className={css(styles.container, !isActive && styles.hidden)}
                style={containerStyle}
            >
                {this.props.children}
            </div>
        )
    }
}

interface FadedContainerContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

@inject('gameStore', 'uiStore')
@observer
export default class FadedContainerContainer extends React.Component<
    FadedContainerContainerProps
> {
    render() {
        const { uiStore, gameStore } = this.props
        return (
            <FadedContainer
                width={uiStore.width}
                height={uiStore.height}
                isActive={gameStore.showDialogOrItem}
            >
                {this.props.children}
            </FadedContainer>
        )
    }
}
