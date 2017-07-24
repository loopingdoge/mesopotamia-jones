import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { Motion, spring } from 'react-motion'
import Tour from 'reactour'

import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'
import { RiddleUIStore } from '../stores/riddleUIStore'
import { RiddleStore } from '../stores/riddleStore'
import { SolutionType } from '../config/riddles'
import { Inventory, hasItem, computer } from '../config/inventory'
import { onlyIf } from '../utils'
import Editor from './Editor'
import Toolbar from './Toolbar'
import Solution from './Solution'
import Separator from './Separator'
import CuneiformLegend from './CuneiformLegend'
import CuneiformChar from './CuneiformChar'
import BlocklyEditor from './BlocklyEditor'

const styles = StyleSheet.create({
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
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
        // flex: '1 1 0%',
        overflow: 'hidden',
    },
    editorColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0%',
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
        flexDirection: 'row',
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
    parameters: string[]
    width: string
    height: string
    onUserCodeInput: (code: string) => void
}

const EditorSection = ({ code, parameters, onUserCodeInput, width, height }: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <BlocklyEditor />
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
const flexToExpandedFromShrinked = (flex: number) => flex > 0.95 ? true : false
const flexToExpandedFromExpanded = (flex: number) => flex > 0.05 ? true : false
const flexToExpanded = (isExpanded: boolean, flex: number) => isExpanded ? flexToExpandedFromShrinked(flex) : flexToExpandedFromExpanded(flex)

export interface RiddleProps {
    riddleText: string
    solutionLength: number
    solutionType: SolutionType
    userCode: string
    parameters: string[]
    userSolution: string
    codeResult: string
    isNotificationVisible: boolean
    isCuneiformExpanded: boolean
    isLegendExpanded: boolean
    isTutorialOpen: boolean
    inventory: Inventory
    width: number
    height: number
    goBack: () => void
    runCode: () => void
    shrinkCuneiform: () => void
    expandCuneiform: () => void
    shrinkLegend: () => void
    expandLegend: () => void
    showTutorial: () => void
    hideTutorial: () => void
    onUserCodeInput: (code: string) => void
    onChangeSolution: (sol: string) => void
    tryOpenDoor: () => void
}

const Riddle = ({
    riddleText, solutionLength, solutionType, userCode, parameters, userSolution, codeResult, isNotificationVisible,
    isCuneiformExpanded, isLegendExpanded, goBack, runCode, shrinkCuneiform, expandCuneiform, shrinkLegend,
    expandLegend, onUserCodeInput, onChangeSolution, tryOpenDoor, inventory, width, height,
    isTutorialOpen, showTutorial, hideTutorial,
}: RiddleProps) =>
    <div className={css(styles.wrapper)}>
        <Toolbar goBack={goBack} openInfo={showTutorial} />
        <Motion style={{ columnFlex: spring(expandedToFlex(isCuneiformExpanded)), legendFlex: spring(expandedToFlex(isLegendExpanded))}}>
            {({ columnFlex, legendFlex }) =>
                <div className={css(styles.riddleContainer)}>
                    <div className={css(styles.riddleColumn)} style={{ flex: columnFlex, opacity: columnFlex }}>
                        <div className={css(styles.column)}>
                            <CuneiformSection
                                riddle={riddleText}
                            />
                            <div className={css(styles.lockRow)} data-tour={1}>
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
                                isButtonToggled={!flexToExpanded(isLegendExpanded, legendFlex)}
                                expanded={isLegendExpanded}
                                shrink={shrinkLegend}
                                expand={expandLegend}
                            />
                            <div style={{ flex: legendFlex, opacity: legendFlex }} data-tour={2}>
                                <CuneiformLegend />
                            </div>
                        </div>
                    </div>
                    {onlyIf(hasItem(inventory, computer),
                        <div className={css(styles.editorColumn)}>
                            <div className={css(styles.row)}>
                                <Separator
                                    isVertical
                                    isButtonToggled={!flexToExpanded(isCuneiformExpanded, columnFlex)}
                                    expanded={isCuneiformExpanded}
                                    shrink={shrinkCuneiform}
                                    expand={expandCuneiform}
                                />
                                <div className={css(styles.editorSection)}>
                                    <EditorSection
                                        code={userCode}
                                        parameters={parameters}
                                        onUserCodeInput={onUserCodeInput}
                                        height={`${height}px`}
                                        width={'100%'}
                                    />
                                    <SolutionSection
                                        codeResult={codeResult}
                                        runCode={runCode}
                                    />
                                </div>
                            </div>
                        </div>)}
                        <Tour
                            isOpen={isTutorialOpen}
                            onRequestClose={hideTutorial}
                            showNumber={false}
                            steps={[{
                                selector: '[data-tour="1"]',
                                content: () =>
                                    <div>
                                        <span>Wow mother father! Credo che dovrei girare la rotella e spingere il bottone</span>
                                    </div>,
                            }, {
                                selector: '[data-tour="2"]',
                                content: () =>
                                    <div>
                                        <span>Very bella questa legenda, credo proprio che dovrei cercare di tradurre i simboli</span>
                                    </div>,
                            }
                            ]}
                        />
                    </div>
                }
        </Motion>
    </div>

export interface RiddleContainerProps {
    gameStore?: GameStore
    riddleUIStore?: RiddleUIStore
    riddleStore?: RiddleStore
    uiStore?: UIStore
}

@inject('gameStore', 'uiStore', 'riddleStore', 'riddleUIStore')
@observer
class RiddleContainer extends React.Component<RiddleContainerProps, undefined> {
    render() {
        const { inventory } = this.props.gameStore
        const { width, height } = this.props.uiStore
        const {
            currentRiddle,
            codeResult,
            runCode,
            checkSolution,
            setUserCode,
            setUserSolution,
            userCode,
            parameters,
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
            showTutorial,
            hideTutorial,
            isTutorialOpen,
        } = this.props.riddleUIStore

        return (
            <Riddle
                goBack={goBack}
                riddleText={question}
                solutionLength={currentRiddle.solutionLength}
                solutionType={currentRiddle.solutionType}
                userCode={userCode}
                parameters={parameters}
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
                isTutorialOpen={isTutorialOpen}
                showTutorial={showTutorial}
                hideTutorial={hideTutorial}
                width={width}
                height={height}
            />
        )
    }
}

export default RiddleContainer