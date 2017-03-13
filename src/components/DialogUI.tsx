import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'

import { GameStore } from '../stores/gameStore'

export interface DialogProps {
    gameStore?: GameStore,
}

@observer
class DialogUI extends React.Component<DialogProps, void> {

    lineId: number = this.props.gameStore.lineId || 0

    styles = StyleSheet.create({
        dialog: {
            position: 'absolute',
            top: 0,
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 100,
        },
        charThumb: {
            width: 40,
            height: 40,
            marginRight: 10,
            borderRadius: '50%',
            backgroundSize: 'cover',
        },
        shown: {
            width: '100%',
            height: '100%',
        },
        hidden: {
            width: '100%',
            height: '0%',
        },
        textWrapper: {
            backgroundColor: 'white',
            margin: '10px',
            padding: '10px',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }
    })

    render() {
        this.lineId = this.props.gameStore.lineId
        const { dialog } = this.props.gameStore.state

        const styles = StyleSheet.create({
            charThumb: {
                backgroundImage: dialog ? 'url(' + dialog.lines[this.lineId].character.image + ')' : null,
            }
        })

        return (
            <div id='dialog' className={css( this.styles.dialog, dialog ? this.styles.shown : this.styles.hidden )}>
                <div className={css(this.styles.textWrapper)}>
                    <div className={css(this.styles.charThumb, styles.charThumb)}>

                    </div>
                    <b>
                        { dialog ? dialog.lines[this.lineId].character.name + ':' : null }
                    </b>&nbsp;
                {
                    dialog ? dialog.lines[this.lineId].text  : null
                }
                </div>
            </div>
        )
    }
}

export default DialogUI