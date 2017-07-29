import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as WebFont from 'webfontloader'

import { Dialog } from '../config/dialogs'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

const translateArrowKeyframes = {
    '0%, 100%': {
        transform: 'translateX(0px)'
    },
    '50%': {
        transform: 'translateX(8px)'
    }
}

const styles = StyleSheet.create({
    dialog: {
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
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 64px'
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

export interface DialogUIProps {
    lineId: number
    dialog: Dialog
    width: number
    height: number
}

const DialogUI = ({ lineId = 0, dialog, width, height }: DialogUIProps) => {
    const containerStyle = { width, height }
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
        <div
            id="dialog"
            className={css(styles.dialog, !dialog && styles.hidden)}
            style={containerStyle}
        >
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
        </div>
    )
}

interface DialogUIContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

export default inject('gameStore', 'uiStore')(
    observer(({ gameStore, uiStore }: DialogUIContainerProps) =>
        <DialogUI
            lineId={gameStore.lineId}
            dialog={gameStore.state.dialog}
            width={uiStore.width}
            height={uiStore.height}
        />
    )
)
