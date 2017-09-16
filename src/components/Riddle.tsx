import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Motion, spring } from 'react-motion'

import Tour from 'reactour'

import Modal, { SolvedRiddleModal } from './Modal'

import {
    computer,
    getToolbox,
    hasItem,
    Inventory,
    reactourInventory,
    translator
} from '../config/inventory'
import { reactourStartIndex } from '../config/progression'
import { SolutionType } from '../config/riddles'

import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'
import { RiddleStore } from '../stores/riddleStore'
import { RiddleUIStore } from '../stores/riddleUIStore'
import { onlyIf } from '../utils'
import BlocklyEditor from './BlocklyEditor'
import CuneiformChar from './CuneiformChar'
import CuneiformLegend from './CuneiformLegend'
import Editor from './Editor'
import Separator from './Separator'
import Solution from './Solution'
import Toolbar from './Toolbar'

const styles = StyleSheet.create({
    riddleContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        borderTop: '2px solid black',
        borderBottom: '2px solid black'
    },
    riddleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    riddleColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    editorColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0%',
        overflow: 'hidden'
    },
    cuneiformSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 1,
        flex: '1 0',
        textAlign: 'center'
    },
    editorSection: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    lockRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 16
    },
    solutionSection: {
        position: 'absolute',
        zIndex: 100000,
        bottom: 10,
        right: 20
    },
    solutionInput: {
        flex: 1
    }
})

export interface CuneiformSectionProps {
    riddle: string
    translated: boolean
}

const CuneiformSection = ({ riddle, translated }: CuneiformSectionProps) =>
    <div className={css(styles.cuneiformSection)} id="cuneiformRiddle">
        <p>
            {riddle
                .split('')
                .map((value, i) =>
                    <CuneiformChar
                        key={i}
                        value={value}
                        translated={translated}
                    />
                )}
        </p>
    </div>

export interface EditorSectionProps {
    toolbox: string
    workspace: string
    width: string
    height: string
    setWorkspace: (code: string) => void
    codeResult: string
    runCode: () => void
}

const EditorSection = ({
    toolbox,
    workspace,
    setWorkspace,
    width,
    height,
    codeResult,
    runCode
}: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <BlocklyEditor
            toolboxXML={toolbox}
            workspaceXML={workspace}
            onWorkspaceChange={setWorkspace}
            onCodeRun={() => console.log('coderun')}
            runCode={runCode}
            codeResult={codeResult}
        />
    </div>

const expandedToFlex = (isExpanded: boolean) => (isExpanded ? 1 : 0)
const flexToExpandedFromShrinked = (flex: number) =>
    flex > 0.95 ? true : false
const flexToExpandedFromExpanded = (flex: number) =>
    flex > 0.05 ? true : false
const flexToExpanded = (isExpanded: boolean, flex: number) =>
    isExpanded
        ? flexToExpandedFromShrinked(flex)
        : flexToExpandedFromExpanded(flex)

export interface RiddleProps {
    riddleText: string
    solutionLength: number
    solutionType: SolutionType
    riddleToolbox: any[]
    workspace: string
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
    setWorkspace: (code: string) => void
    onChangeSolution: (sol: string) => void
    checkSolution: () => boolean
    tryOpenDoor: () => void
    tutorialStartIndex: number
}

const Riddle = ({
    riddleText,
    solutionLength,
    solutionType,
    riddleToolbox,
    workspace,
    userSolution,
    codeResult,
    isNotificationVisible,
    isCuneiformExpanded,
    isLegendExpanded,
    goBack,
    runCode,
    shrinkCuneiform,
    expandCuneiform,
    shrinkLegend,
    expandLegend,
    setWorkspace,
    onChangeSolution,
    checkSolution,
    tryOpenDoor,
    inventory,
    width,
    height,
    isTutorialOpen,
    showTutorial,
    hideTutorial,
    tutorialStartIndex
}: RiddleProps) =>
    <div className={css(styles.wrapper)}>
        <Modal
            isOpen={checkSolution()}
            content={<SolvedRiddleModal onClick={tryOpenDoor} />}
        />
        <Toolbar goBack={goBack} openInfo={showTutorial} />
        <Motion
            style={{
                columnFlex: spring(expandedToFlex(isCuneiformExpanded)),
                legendFlex: spring(expandedToFlex(isLegendExpanded))
            }}
        >
            {({ columnFlex, legendFlex }) =>
                <div className={css(styles.riddleContainer)}>
                    <div
                        className={css(styles.riddleColumn)}
                        style={{ flex: columnFlex, opacity: columnFlex }}
                    >
                        <div className={css(styles.riddleContent)}>
                            <CuneiformSection
                                riddle={riddleText}
                                translated={hasItem(inventory, translator)}
                            />
                            <div className={css(styles.lockRow)} data-tour={1}>
                                <Solution
                                    length={solutionLength}
                                    type={solutionType}
                                    onChangeValue={onChangeSolution}
                                    value={userSolution}
                                />
                            </div>
                            <Separator
                                isVertical={false}
                                isButtonToggled={
                                    !flexToExpanded(
                                        isLegendExpanded,
                                        legendFlex
                                    )
                                }
                                expanded={isLegendExpanded}
                                shrink={shrinkLegend}
                                expand={expandLegend}
                            />
                            <div
                                style={{
                                    flex: legendFlex,
                                    opacity: legendFlex,
                                    overflow: 'hidden',
                                    display: 'flex'
                                }}
                            >
                                <CuneiformLegend />
                            </div>
                        </div>
                    </div>
                    {onlyIf(
                        hasItem(inventory, computer),
                        <div className={css(styles.editorColumn)}>
                            <div className={css(styles.row)}>
                                <Separator
                                    isVertical
                                    isButtonToggled={
                                        !flexToExpanded(
                                            isCuneiformExpanded,
                                            columnFlex
                                        )
                                    }
                                    expanded={isCuneiformExpanded}
                                    shrink={shrinkCuneiform}
                                    expand={expandCuneiform}
                                />
                                <div className={css(styles.editorSection)}>
                                    <EditorSection
                                        toolbox={getToolbox(riddleToolbox)}
                                        workspace={workspace}
                                        setWorkspace={setWorkspace}
                                        height={`${height}px`}
                                        width={'100%'}
                                        codeResult={codeResult}
                                        runCode={runCode}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <Tour
                        isOpen={isTutorialOpen}
                        onRequestClose={hideTutorial}
                        maskSpace={0}
                        startAt={tutorialStartIndex}
                        steps={[
                            {
                                selector: '#cuneiformRiddle',
                                content: () =>
                                    <div>
                                        <span>
                                            Cosa sono questi simboli? Dovrei
                                            provare a tradurli...
                                        </span>
                                    </div>
                            },
                            {
                                selector: '#cuneiformLegend',
                                content: () =>
                                    <div>
                                        <span>
                                            Forse questa legenda può aiutarmi?
                                        </span>
                                    </div>
                            },
                            ...reactourInventory(inventory).map(tutorial => ({
                                selector: tutorial.selector,
                                content: () =>
                                    <div>
                                        <span>
                                            {tutorial.text}
                                        </span>
                                    </div>
                            }))
                        ]}
                    />
                </div>}
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
    componentDidMount() {
        setTimeout(() => {
            if (!this.props.gameStore.firstRiddleVisited) {
                this.props.riddleUIStore.showTutorial()
                this.props.gameStore.enterFirstRiddle()
            }
            if (this.props.riddleUIStore.tutorialStartIndex) {
                this.props.riddleUIStore.showTutorial()
            }
        }, 200)
    }

    render() {
        const { inventory } = this.props.gameStore
        const { width, height } = this.props.uiStore
        const {
            currentRiddle,
            codeResult,
            runCode,
            checkSolution,
            tryOpenDoor,
            setWorkspaceXML,
            setUserSolution,
            workspaceXML,
            userSolution,
            question
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
            tutorialStartIndex
        } = this.props.riddleUIStore

        return (
            <Riddle
                goBack={goBack}
                riddleText={question}
                solutionLength={currentRiddle.solutionLength}
                solutionType={currentRiddle.solutionType}
                riddleToolbox={currentRiddle.defaultToolbox}
                workspace={workspaceXML}
                userSolution={userSolution}
                codeResult={codeResult}
                isLegendExpanded={isLegendExpanded}
                isCuneiformExpanded={isCuneiformExpanded}
                isNotificationVisible={isNotificationVisible}
                inventory={inventory}
                runCode={runCode}
                setWorkspace={setWorkspaceXML}
                onChangeSolution={setUserSolution}
                checkSolution={checkSolution}
                tryOpenDoor={tryOpenDoor}
                shrinkCuneiform={shrinkCuneiform}
                expandCuneiform={expandCuneiform}
                shrinkLegend={shrinkLegend}
                expandLegend={expandLegend}
                isTutorialOpen={isTutorialOpen}
                showTutorial={showTutorial}
                hideTutorial={hideTutorial}
                width={width}
                height={height}
                tutorialStartIndex={tutorialStartIndex}
            />
        )
    }
}

export default RiddleContainer
