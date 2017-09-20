import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Icon from 'react-icons-kit'
import { chevronRight } from 'react-icons-kit/ionicons/'
import * as ReactModal from 'react-modal'

import Button from './Button'

const modalShow = {
    from: {
        transform: 'scale(0.8)'
    },
    to: {
        transform: 'scale(1)'
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
    }
})

export interface SolvedRiddleModalProps {
    onClick: () => void
}

export const SolvedRiddleModal = ({ onClick }: SolvedRiddleModalProps) =>
    <div className={css(styles.modalBody)}>
        <h1>Indovinello risolto!</h1>
        <Button
            icon={chevronRight}
            text={'Apri la porta'}
            onClick={onClick}
            autofocus
        />
    </div>

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

        this.closeModal = this.closeModal.bind(this)
    }

    componentWillReceiveProps(nextProps: ModalProps) {
        if (nextProps.isOpen && !this.props.isOpen) {
            setTimeout(() => {
                this.isOpened = true
                this.forceUpdate()
            }, this.openDelay)
        }
    }

    closeModal() {
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
