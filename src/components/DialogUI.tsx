import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { Dialog } from '../config/dialogs'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    dialog: {
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 100,
        flex: 1
    },
    charThumb: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: '50%',
        backgroundSize: 'cover'
    },
    hidden: {
        display: 'none'
    },
    textWrapper: {
        backgroundColor: 'white',
        margin: '10px',
        padding: '10px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        backgroundImage: dialog
            ? 'url(' + dialog.lines[lineId].character.image + ')'
            : null
    }

    return (
        <div
            id="dialog"
            className={css(styles.dialog, dialog ? null : styles.hidden)}
            style={containerStyle}
        >
            <div className={css(styles.textWrapper)}>
                <div className={css(styles.charThumb)} style={charThumbStyle} />
                <b>
                    {dialog ? dialog.lines[lineId].character.name + ':' : null}
                </b>&nbsp;
                {dialog ? dialog.lines[lineId].text : null}
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
