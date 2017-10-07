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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 18,
        textAlign: 'center'
    },
    tourText: {},
    badge: {
        backgroundColor: 'rgb(253, 212, 02)',
        color: 'black',
        border: '1px solid #90752d',
        borderRadius: 20,
        width: '100%',
        marginLeft: '-50%',
        position: 'absolute'
    },
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
                closeWithMask={false}
                disableInteraction={true}
                showButtons={false}
                showNavigation={false}
                maskSpace={0}
                startAt={startAt || 0}
                badgeContent={(current: any, total: any) => {
                    return <div className={css(styles.badge)}>{current}</div>
                }}
                steps={tutorialSteps(inventory).map((tutorial: Tutorial) => ({
                    selector: tutorial.selector,
                    content: () => (
                        <div>
                            <div className={css(styles.tourTitle)}>
                                {tutorial.title}
                            </div>
                            <div className={css(styles.tourText)}>
                                {tutorial.text}
                            </div>
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
