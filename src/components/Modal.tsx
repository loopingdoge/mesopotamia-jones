import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Icon from 'react-icons-kit'
import { chevronRight } from 'react-icons-kit/ionicons/'
import * as ReactModal from 'react-modal'

import l10n from '../l10n'

import Button from './Button'
import PressToContinue from './PressToContinue'

const modalShow = {
    from: {
        transform: 'scale(0.8)'
    },
    to: {
        transform: 'scale(1)'
    }
}
const scaleAnimation = {
    '0%, 100%': {
        transform: 'translateY(0px)',
        color: '#f0ac43'
    },
    '50%': {
        transform: 'translateY(3px)',
        color: '#ba7916'
    }
}

const styles = StyleSheet.create({
    modalOverlay: {
        zIndex: 101,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        animationName: {
            from: {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }
        },
        animationDuration: '100ms'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 200,
        backgroundColor: '#FDF6E3',
        outline: 'none',
        border: '2px solid black',
        padding: '0px 20px',
        fontFamily: 'sans-serif',
        animationName: {
            from: {
                transform: 'scale(0.8)'
            }
        },
        animationDuration: '250ms'
    },
    modalBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    continueHint: {
        textAlign: 'center',
        animationName: scaleAnimation,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease'
    }
})

export interface SolvedRiddleModalProps {
    onClick: () => void
}

export const SolvedRiddleModal = ({ onClick }: SolvedRiddleModalProps) => (
    <div
        className={css(styles.modalBody)}
        onKeyPress={(event: any) => {
            if (event.key === ' ') {
                onClick()
            }
        }}
    >
        <h1>{l10n.riddle_solved}</h1>
        <Button
            icon={chevronRight}
            text={l10n.riddle_open_door}
            onClick={onClick}
            autofocus
        />
        <p className={css(styles.continueHint)}>{l10n.riddle_solved_hint}</p>
    </div>
)

export interface ModalProps {
    isOpen: boolean
    onOpenDelay: number
    content: any
}

class Modal extends React.Component<ModalProps> {
    isCanceled: boolean
    isOpened: boolean
    openDelay: number

    constructor(props: ModalProps) {
        super(props)
        this.isCanceled = false
        this.isOpened = props.isOpen || false
        this.openDelay = props.onOpenDelay || 0
    }

    componentWillReceiveProps(nextProps: ModalProps) {
        if (nextProps.isOpen && !this.props.isOpen) {
            setTimeout(() => {
                this.isOpened = true
                this.forceUpdate()
            }, this.openDelay)
        }
    }

    closeModal = () => {
        this.isCanceled = true
        this.forceUpdate()
    }

    render() {
        return (
            <ReactModal
                isOpen={this.isOpened && !this.isCanceled}
                closeTimeoutMS={0}
                overlayClassName={css(styles.modalOverlay)}
                className={css(styles.modalContent)}
                contentLabel="Modal"
            >
                {this.props.content}
            </ReactModal>
        )
    }
}

export default Modal
