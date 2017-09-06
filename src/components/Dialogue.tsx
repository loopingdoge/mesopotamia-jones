import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { Dialogue } from '../config/dialogues'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'
import { Maybe } from '../utils'

import * as React from 'react'

const translateArrowKeyframes = {
    '0%, 100%': {
        transform: 'translateX(0px)'
    },
    '50%': {
        transform: 'translateX(8px)'
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 64px',
        alignSelf: 'flex-end'
    },
    charThumb: {
        marginRight: 30,
        backgroundSize: 'cover'
    },
    hidden: {
        display: 'none'
    },
    textWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontFamily: 'Arvo',
        color: '#FFF'
    },
    characterName: {
        fontSize: 24,
        paddingBottom: '16px',
        fontWeight: 600
    },
    text: {
        display: 'flex',
        flexDirection: 'row'
    },
    dialogueText: {
        fontSize: 24
    },
    arrow: {
        marginLeft: '10px',
        fontSize: 24,
        alignSelf: 'flex-end',
        textAlign: 'right',
        animationName: translateArrowKeyframes,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
    }
})

export interface DialogProps {
    lineId: number
    dialog: Maybe<Dialogue>
    width: number
    height: number
}

const Dialogue = ({ lineId, dialog, width, height }: DialogProps) => {
    const charThumbStyle = {
        backgroundImage:
            dialog && 'url(' + dialog.lines[lineId].character.image + ')',
        width: Math.floor(width / 100 * 20),
        height: Math.floor(height / 100 * 40)
    }
    const wrapperStyle = {
        height: Math.floor(height / 100 * 50)
    }
    return (
        <div className={css(styles.wrapper)} style={wrapperStyle}>
            <div className={css(styles.charThumb)} style={charThumbStyle} />
            <div className={css(styles.textWrapper)}>
                <div className={css(styles.characterName)}>
                    {dialog && dialog.lines[lineId].character.name}
                </div>
                <div className={css(styles.text)}>
                    <div className={css(styles.dialogueText)}>
                        {dialog && dialog.lines[lineId].text}
                    </div>
                    <div className={css(styles.arrow)}>➞</div>
                </div>
            </div>
        </div>
    )
}

interface DialogContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

export default inject('gameStore', 'uiStore')(
    observer(({ gameStore, uiStore }: DialogContainerProps) =>
        <Dialogue
            lineId={gameStore.lineId}
            dialog={gameStore.state.activeDialogue}
            width={uiStore.width}
            height={uiStore.height}
        />
    )
)
