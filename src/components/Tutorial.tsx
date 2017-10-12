import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Tour from 'reactour'

import { Inventory } from '../config/inventory'
import { Tutorial, tutorialSteps } from '../config/tutorial'

import {
    androidClose,
    chevronLeft,
    chevronRight
} from 'react-icons-kit/ionicons/'
import Button from './Button'

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
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    navIcon: {
        width: 8,
        height: 8,
        border: '1px solid #90752d',
        borderRadius: '100%',
        padding: 0,
        display: 'block',
        margin: 4,
        outline: 0,
        backgroundColor: 'transparent'
    },
    currNavIcon: {
        backgroundColor: '#fdd466',
        transform: 'scale(1.25)'
    }
})

export interface TutorialProps {
    isOpen: boolean
    onClose: (...args: any[]) => any
    startAt?: number
    inventory: Inventory
}

export default class TutorialUI extends React.Component<TutorialProps> {
    goTo: (index?: number) => any
    currentStep: number

    constructor() {
        super()
        this.goTo = () => null
    }

    setGoTo = (goTo: (index?: number) => any) => {
        this.goTo = goTo
    }

    keyboardHandler = (e: KeyboardEvent) => {
        if (e.charCode === 32) {
            if (
                this.currentStep === tutorialSteps(this.props.inventory).length
            ) {
                this.props.onClose()
            } else {
                this.goTo(this.currentStep)
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keyboardHandler, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keyboardHandler, false)
    }

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
                badgeContent={(current: string) => {
                    this.currentStep = parseInt(current)
                    return <div className={css(styles.badge)}>{current}</div>
                }}
                steps={tutorialSteps(
                    inventory
                ).map(
                    (
                        tutorial: Tutorial,
                        stepIndex: number,
                        tutorials: Tutorial[]
                    ) => ({
                        selector: tutorial.selector,
                        content: ({ goTo }: any) => (
                            <div>
                                {this.setGoTo(goTo)}
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
                                <div className={css(styles.navigation)}>
                                    <Button
                                        icon={chevronLeft}
                                        onClick={() => goTo(stepIndex - 1)}
                                        disabled={stepIndex === 0}
                                    />
                                    <nav className={css(styles.navIcons)}>
                                        {tutorials.map(
                                            (t: Tutorial, index: number) => (
                                                <button
                                                    key={index}
                                                    className={css(
                                                        styles.navIcon,
                                                        stepIndex === index &&
                                                            styles.currNavIcon
                                                    )}
                                                />
                                            )
                                        )}
                                    </nav>
                                    {stepIndex === tutorials.length - 1 ? (
                                        <Button
                                            icon={androidClose}
                                            onClick={onClose}
                                        />
                                    ) : (
                                        <Button
                                            icon={chevronRight}
                                            onClick={() => goTo(stepIndex + 1)}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    })
                )}
            />
        )
    }
}
