import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Icon from 'react-icons-kit'
import { chevronRight } from 'react-icons-kit/ionicons/'

import * as ReactModal from 'react-modal'
import Button from './Button'

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
        justifyContent: 'center',
        width: 300,
        height: 200,
        backgroundColor: '#FDF6E3',
        outline: 'none',
        border: '2px solid black'
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
        <Button icon={chevronRight} text={'Apri la porta'} onClick={onClick} />
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
                {this.props.content}
            </ReactModal>
        )
    }
}

export default Modal
