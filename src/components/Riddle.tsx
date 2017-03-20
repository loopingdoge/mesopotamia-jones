import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { Motion, spring, presets } from 'react-motion'

import { GameStore } from '../stores/gameStore'
import { RiddleUIStore } from '../stores/riddleUIStore'
import { RiddleStore } from '../stores/riddleStore'
import { SolutionType } from '../config/riddles'
import { Inventory, hasItem, computer } from '../config/inventory'
import Editor from './Editor'
import Toolbar from './Toolbar'
import Solution from './Solution'
import Separator from './Separator'
import CuneiformLegend from './CuneiformLegend'
import CuneiformChar from './CuneiformChar'

const styles = StyleSheet.create({
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    riddleContainer: {
        backgroundColor: '#E37710',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    riddleColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    cuneiformSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 1,
        flex: '1 0',
        textAlign: 'center',
    },
    editorSection: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    lockRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 16,
    },
    solutionSection: {
        position: 'absolute',
        zIndex: 100000,
        bottom: 10,
        right: 20,
    },
    solutionInput: {
        flex: 1,
    },
})

export interface CuneiformSectionProps {
    riddle: string
}

const CuneiformSection = ({ riddle }: CuneiformSectionProps) =>
    <div className={css(styles.cuneiformSection)}>
        <p>
            {
                riddle.split('').map((value, i) => <CuneiformChar key={i} value={value} />)
            }
        </p>
    </div>

export interface EditorSectionProps {
    code: string
    onUserCodeInput: (code: string) => void
}

const EditorSection = ({ code, onUserCodeInput }: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <Editor
            code={code}
            onUserCodeInput={onUserCodeInput}
            height={'500px'}
            width={'100%'}
        />
    </div>

export interface SolutionSection {
    codeResult: string
    runCode: () => void
}

const SolutionSection = ({ codeResult, runCode }: SolutionSection) =>
    <div className={css(styles.solutionSection)}>
        <div>{codeResult}</div>
        <button onClick={runCode}>Run Code</button>
    </div>

const expandedToFlex = (isExpanded: boolean) => isExpanded ? 1 : 0

export interface RiddleProps {
    riddleText: string
    solutionLength: number
    solutionType: SolutionType
    userCode: string
    userSolution: string
    codeResult: string
    isNotificationVisible: boolean
    isCuneiformExpanded: boolean
    isCuneiformButtonToggled: boolean
    isLegendExpanded: boolean
    isLegendButtonToggled: boolean
    inventory: Inventory
    goBack: () => void
    runCode: () => void
    shrinkCuneiform: () => void
    expandCuneiform: () => void
    shrinkLegend: () => void
    expandLegend: () => void
    onUserCodeInput: (code: string) => void
    onChangeSolution: (sol: string) => void
    tryOpenDoor: () => void
}

interface ShrinkStyle {
    columnFlex: number
    legendFlex: number
}

const Riddle = ({
    riddleText, solutionLength, solutionType, userCode, userSolution, codeResult, isNotificationVisible,
    isCuneiformExpanded, isLegendExpanded, goBack, runCode, shrinkCuneiform, expandCuneiform, shrinkLegend,
    expandLegend, onUserCodeInput, onChangeSolution, tryOpenDoor, inventory, isCuneiformButtonToggled,
    isLegendButtonToggled,
}: RiddleProps) =>
    <div className={css(styles.wrapper)}>
        <Toolbar goBack={goBack} />
        <div className={css(styles.riddleContainer)}>
            <Motion style={{ columnFlex: spring(expandedToFlex(isCuneiformExpanded)), legendFlex: spring(expandedToFlex(isLegendExpanded))}}>
                {
                    ({ columnFlex, legendFlex }: ShrinkStyle) =>
                        <div className={css(styles.riddleColumn)} style={{ flex: columnFlex, opacity: columnFlex }}>
                            <div className={css(styles.column)}>
                                <CuneiformSection
                                    riddle={riddleText}
                                />
                                <div className={css(styles.lockRow)}>
                                    <Solution
                                        length={solutionLength}
                                        type={solutionType}
                                        onChangeValue={onChangeSolution}
                                        value={userSolution}
                                    />
                                    <button onClick={tryOpenDoor}>Open</button>
                                </div>
                                <Separator
                                    isVertical={false}
                                    isButtonToggled={isLegendButtonToggled}
                                    expanded={isLegendExpanded}
                                    shrink={shrinkLegend}
                                    expand={expandLegend}
                                />
                                <div style={{ flex: legendFlex, opacity: legendFlex }}>
                                    <CuneiformLegend />
                                </div>
                            </div>
                        </div>
                }
            </Motion>
            
            {
                hasItem(inventory, computer) ?
                    <div className={css(styles.riddleContainer)}>
                        <Separator
                            isVertical
                            isButtonToggled={isCuneiformButtonToggled}
                            expanded={isCuneiformExpanded}
                            shrink={shrinkCuneiform}
                            expand={expandCuneiform}
                        />
                        <div className={css(styles.editorSection)}>
                            <EditorSection
                                code={userCode}
                                onUserCodeInput={onUserCodeInput}
                            />
                            <SolutionSection
                                codeResult={codeResult}
                                runCode={runCode}
                            />
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    </div>

export interface RiddleContainerProps {
    gameStore?: GameStore
    riddleUIStore?: RiddleUIStore
    riddleStore?: RiddleStore
    routingStore?: RouterStore
}

@inject('gameStore', 'routingStore', 'riddleStore', 'riddleUIStore')
@observer
class RiddleContainer extends React.Component<RiddleContainerProps, undefined> {
    render() {
        const {
            inventory
        } = this.props.gameStore

        const {
            currentRiddle,
            codeResult,
            runCode,
            checkSolution,
            setUserCode,
            setUserSolution,
            userCode,
            userSolution,
            question,
        } = this.props.riddleStore

        const goBack = this.props.gameStore.deactivateRiddle

        const {
            isCuneiformExpanded,
            shrinkCuneiform,
            expandCuneiform,
            isLegendExpanded,
            shrinkLegend,
            expandLegend,
            isNotificationVisible,
            isCuneiformButtonToggled,
            isLegendButtonToggled,
        } = this.props.riddleUIStore

        return (
            <Riddle
                goBack={goBack}
                riddleText={question}
                solutionLength={currentRiddle.solutionLength}
                solutionType={currentRiddle.solutionType}
                userCode={userCode}
                userSolution={userSolution}
                codeResult={codeResult}
                isLegendExpanded={isLegendExpanded}
                isCuneiformExpanded={isCuneiformExpanded}
                isNotificationVisible={isNotificationVisible}
                inventory={inventory}
                runCode={runCode}
                onUserCodeInput={setUserCode}
                onChangeSolution={setUserSolution}
                tryOpenDoor={checkSolution}
                shrinkCuneiform={shrinkCuneiform}
                expandCuneiform={expandCuneiform}
                shrinkLegend={shrinkLegend}
                expandLegend={expandLegend}
                isCuneiformButtonToggled={isCuneiformButtonToggled}
                isLegendButtonToggled={isLegendButtonToggled}
            />
        )
    }
}

export default RiddleContainer