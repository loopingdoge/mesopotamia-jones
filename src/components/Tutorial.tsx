import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Tour from 'reactour'

import { Inventory } from '../config/inventory'
import { Tutorial, tutorialSteps } from '../config/tutorial'

import { onlyIf } from '../utils'

const styles = StyleSheet.create({
    tour: {
        borderRadius: 4,
        border: '2px solid #90752d',
        backgroundColor: '#FDF6E3',
        boxShadow: '0px 1px 11px -1px #90752d',
        ':after': {
            color: 'black',
            backgroundColor: '#fdd466',
            border: '2px solid #90752d'
        },
        fontFamily: 'sans-serif'
    },
    tourTitle: {
        fontSize: 'larger',
        marginBottom: '8px'
    },
    tourText: {},
    video: {
        margin: '16px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export interface TutorialProps {
    isOpen: boolean
    onClose: (...args: any[]) => any
    startAt?: number
    inventory: Inventory
}

export default class TutorialUI extends React.PureComponent<TutorialProps> {
    render() {
        const { isOpen, onClose, startAt, inventory } = this.props
        return (
            <Tour
                className={css(styles.tour)}
                isOpen={isOpen}
                onRequestClose={onClose}
                maskSpace={0}
                startAt={startAt || 0}
                steps={tutorialSteps(inventory).map((tutorial: Tutorial) => ({
                    selector: tutorial.selector,
                    content: () => (
                        <div>
                            <div className={css(styles.tourTitle)}>
                                {tutorial.title}
                            </div>
                            <span className={css(styles.tourText)}>
                                {tutorial.text}
                            </span>
                            <div className={css(styles.video)}>
                                {onlyIf(
                                    Boolean(tutorial.video),
                                    <video
                                        src={tutorial.video}
                                        autoPlay
                                        loop
                                        playsInline
                                        muted
                                        width={'330px'}
                                    />
                                )}
                            </div>
                        </div>
                    )
                }))}
            />
        )
    }
}
