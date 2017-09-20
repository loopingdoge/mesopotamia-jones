import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { Dialogue } from '../config/dialogues'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

import Actions, {
    addActionListener,
    removeActionListener
} from '../config/actions'

import { isMobile, Maybe, onlyIf } from '../utils'
import { arvo } from '../utils/fonts'

import * as React from 'react'

const translateArrowKeyframes = {
    '0%, 100%': {
        transform: 'scale(1)',
        opacity: 1
    },
    '50%': {
        transform: 'scale(0.97)',
        opacity: 0.9
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
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    dialogueText: {
        fontSize: 24
    },
    continueHint: {
        minHeight: '50px',
        fontSize: 24,
        textAlign: 'center',
        animationName: translateArrowKeyframes,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
    }
})

export interface DialogueProps {
    dialogue: Maybe<Dialogue>
    onDialogueEnd: (...args: any[]) => any
    width: number
    height: number
}

interface DialogueState {
    visibleCharacters: string
    pageIndex: number
}

class DialogueUI extends React.Component<DialogueProps, DialogueState> {
    letterDelay = 35
    timeouts: number[] = []

    constructor(props: DialogueProps) {
        super(props)
        this.state = { visibleCharacters: '', pageIndex: 0 }
    }

    componentDidMount() {
        this.scheduleLetters(
            this.props.dialogue.lines[this.state.pageIndex].text
        )
        setTimeout(
            () => addActionListener(Actions.NEXT_DIALOGUE_LINE, this.nextPage),
            100
        )
        addActionListener(
            Actions.SKIP_TO_DIALOGUE_END,
            this.skipToLineEnd,
            true
        )
    }

    nextPage = () => {
        const { dialogue } = this.props
        if (this.state.pageIndex < dialogue.lines.length - 1) {
            const nextPageIndex = this.state.pageIndex + 1
            this.timeouts.forEach(timeout => clearTimeout(timeout))
            this.timeouts = []
            this.scheduleLetters(this.props.dialogue.lines[nextPageIndex].text)
            addActionListener(
                Actions.SKIP_TO_DIALOGUE_END,
                this.skipToLineEnd,
                true
            )
            this.setState({ visibleCharacters: '', pageIndex: nextPageIndex })
        } else {
            this.props.onDialogueEnd()
            removeActionListener(Actions.NEXT_DIALOGUE_LINE)
        }
    }

    scheduleLetters = (text: string) => {
        text.split('').forEach((letter: string, letterIndex: number) =>
            this.timeouts.push(
                setTimeout(
                    () =>
                        this.setState({
                            visibleCharacters:
                                this.state.visibleCharacters + letter
                        }),
                    letterIndex * this.letterDelay
                )
            )
        )

        setTimeout(
            () => removeActionListener(Actions.SKIP_TO_DIALOGUE_END),
            text.length * this.letterDelay
        )
    }

    skipToLineEnd = (event: Event) => {
        event.stopPropagation()
        const text = this.props.dialogue.lines[this.state.pageIndex].text
        this.timeouts.forEach(timeout => clearTimeout(timeout))
        this.timeouts = []
        this.setState({ visibleCharacters: text })
        removeActionListener(Actions.SKIP_TO_DIALOGUE_END)
    }

    render() {
        const { dialogue, width, height } = this.props
        const charThumbStyle = {
            backgroundImage:
                dialogue &&
                'url(' +
                    dialogue.lines[this.state.pageIndex].character.image +
                    ')',
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
                        {dialogue &&
                            dialogue.lines[this.state.pageIndex].character.name}
                    </div>
                    <div className={css(styles.text)}>
                        <div className={css(styles.dialogueText)}>
                            {dialogue && this.state.visibleCharacters}
                        </div>
                    </div>
                    {onlyIf(
                        this.state.visibleCharacters.length ===
                            this.props.dialogue.lines[this.state.pageIndex].text
                                .length,
                        <div className={css(styles.continueHint)}>
                            {isMobile()
                                ? 'Tocca per continuare'
                                : 'Premi F per continuare'}
                        </div>
                    )}
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
            dialogue={gameStore.state.activeDialogue}
            onDialogueEnd={gameStore.hideDialogue}
            width={uiStore.width}
            height={uiStore.height}
        />
    )
)
