import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { Dialogue } from '../config/dialogues'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'
import { addActionListener, Maybe, removeActionListener } from '../utils'
import { arvo } from '../utils/fonts'

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
        fontFamily: [arvo, 'sans-serif'],
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

interface DialogueState {
    dialogueLine: string
}

class DialogueUI extends React.Component<DialogProps, DialogueState> {
    letterDelay = 35
    timeouts: number[] = []

    constructor(props: DialogProps) {
        super(props)
        this.state = { dialogueLine: '' }
    }

    componentDidMount() {
        this.scheduleLetters(this.props.dialog.lines[this.props.lineId].text)
        addActionListener(this.skipToLineEnd, true)
    }

    componentWillReceiveProps(nextProps: DialogProps) {
        if (nextProps.lineId !== this.props.lineId) {
            this.timeouts.forEach(timeout => clearTimeout(timeout))
            this.timeouts = []
            this.setState({ dialogueLine: '' })
            this.scheduleLetters(nextProps.dialog.lines[nextProps.lineId].text)
        }
    }

    scheduleLetters = (text: string) => {
        text.split('').forEach((letter: string, letterIndex: number) =>
            this.timeouts.push(
                setTimeout(
                    () =>
                        this.setState({
                            dialogueLine: this.state.dialogueLine + letter
                        }),
                    letterIndex * this.letterDelay
                )
            )
        )

        setTimeout(
            () => removeActionListener(this.skipToLineEnd, true),
            text.length * this.letterDelay
        )
    }

    skipToLineEnd = (event: Event) => {
        event.stopPropagation()
        const text = this.props.dialog.lines[this.props.lineId].text
        this.timeouts.forEach(timeout => clearTimeout(timeout))
        this.timeouts = []
        this.setState({ dialogueLine: text })
        removeActionListener(this.skipToLineEnd, true)
    }

    render() {
        const { lineId, dialog, width, height } = this.props
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
                            {dialog && this.state.dialogueLine}
                        </div>
                        <div className={css(styles.arrow)}>➞</div>
                    </div>
                </div>
            </div>
        )
    }
}

interface DialogContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

export default inject('gameStore', 'uiStore')(
    observer(({ gameStore, uiStore }: DialogContainerProps) =>
        <DialogueUI
            lineId={gameStore.lineId}
            dialog={gameStore.state.activeDialogue}
            width={uiStore.width}
            height={uiStore.height}
        />
    )
)
