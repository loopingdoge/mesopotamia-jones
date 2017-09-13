import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Icon from 'react-icons-kit'
import { androidClose, chevronRight } from 'react-icons-kit/ionicons/'

import * as ReactModal from 'react-modal'

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
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 300,
        height: 200,
        backgroundColor: '#FDF6E3',
        outline: 'none',
        border: '2px solid black'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        height: 32
    },
    modalBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    modalCloseButton: {
        padding: '2px !important',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent'
    },
    modalButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#fdd466',
        borderRadius: 4,
        border: '2px solid #90752d',
        outline: 'none'
    }
})

export interface SolvedRiddleModalProps {
    onClick: () => void
}

export const SolvedRiddleModal = ({ onClick }: SolvedRiddleModalProps) =>
    <div className={css(styles.modalBody)}>
        <h1>Indovinello risolto!</h1>
        <button onClick={onClick} className={css(styles.modalButton)}>
            <p>Apri la porta</p>
            <Icon icon={chevronRight} />
        </button>
    </div>

export interface ModalProps {
    isOpen: boolean
    content: any
}

class Modal extends React.Component<ModalProps> {
    isCanceled: boolean

    constructor() {
        super()
        this.isCanceled = false
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal() {
        this.isCanceled = true
        this.forceUpdate()
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen && !this.isCanceled}
                closeTimeoutMS={0}
                overlayClassName={css(styles.modalOverlay)}
                className={css(styles.modalContent)}
                contentLabel="Modal"
            >
                <div className={css(styles.modalHeader)}>
                    <button
                        onClick={this.closeModal}
                        className={css(styles.modalCloseButton)}
                    >
                        <Icon icon={androidClose} size={28} />
                    </button>
                </div>
                {this.props.content}
            </ReactModal>
        )
    }
}

export default Modal
