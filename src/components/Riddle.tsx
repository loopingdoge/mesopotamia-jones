import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Motion, spring } from 'react-motion'

import {
    computer,
    getToolbox,
    hasItem,
    Inventory,
    translator
} from '../config/inventory'
import { reactourStartIndex } from '../config/progression'
import { Riddle, SolutionType } from '../config/riddles'

import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'
import { RiddleStore } from '../stores/riddleStore'
import { RiddleUIStore } from '../stores/riddleUIStore'

import { onlyIf } from '../utils'

import BlocklyEditor from './BlocklyEditor'
import CuneiformChar from './CuneiformChar'
import CuneiformLegend from './CuneiformLegend'
import Modal, { SolvedRiddleModal } from './Modal'
import Separator from './Separator'
import Solution from './Solution'
import Toolbar from './Toolbar'
import Tutorial from './Tutorial'

const styles = StyleSheet.create({
    riddleContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '10px 0px 10px 20px'
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
        textAlign: 'center',
        userSelect: 'none'
    },
    riddleText: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
        padding: 16,
        userSelect: 'none'
    },
    solutionSection: {
        position: 'absolute',
        zIndex: 100000,
        bottom: 10,
        right: 20
    },
    solutionInput: {
        flex: 1
    },
    charWrapper: {
        ':hover': {
            backgroundColor: 'rgba(253, 212, 02, 0.3)',
            boxShadow: '0px 1px 11px -1px #90752d',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
        }
    }
})

export interface CuneiformSectionProps {
    riddle: string
    translated: boolean
    onCharOver: (char: string) => void
}

const CuneiformSection = ({
    riddle,
    translated,
    onCharOver
}: CuneiformSectionProps) => (
    <div className={css(styles.cuneiformSection)} id="cuneiformRiddle">
        <div className={css(styles.riddleText)}>
            {riddle.split('').map((value, i) => (
                <div
                    key={i}
                    className={css(styles.charWrapper)}
                    onMouseEnter={() => onCharOver(value)}
                    onMouseLeave={() => onCharOver(null)}
                >
                    <CuneiformChar value={value} translated={translated} />
                </div>
            ))}
        </div>
    </div>
)

export interface EditorSectionProps {
    riddle: Riddle
    toolbox: string
    workspace: string
    width: string
    height: string
    setWorkspace: (code: string) => void
    codeResult: string
    runCode: () => void
    clearWorkspace: () => void
    blocklyError: boolean
}

const EditorSection = ({
    riddle,
    toolbox,
    workspace,
    setWorkspace,
    width,
    height,
    codeResult,
    runCode,
    clearWorkspace,
    blocklyError
}: EditorSectionProps) => (
    <div className={css(styles.editorSection)}>
        <BlocklyEditor
            riddle={riddle}
            toolboxXML={toolbox}
            workspaceXML={workspace}
            onWorkspaceChange={setWorkspace}
            runCode={runCode}
            codeResult={codeResult}
            clearWorkspace={clearWorkspace}
            error={blocklyError}
        />
    </div>
)

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
    riddle: Riddle
    riddleText: string
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
    isSolved: boolean
    goBack: () => void
    runCode: () => void
    clearWorkspace: () => void
    shrinkCuneiform: () => void
    expandCuneiform: () => void
    shrinkLegend: () => void
    expandLegend: () => void
    showTutorial: () => void
    hideTutorial: () => void
    setWorkspace: (code: string) => void
    onChangeSolution: (sol: string) => void
    onCuneiformCharOver: (char: string) => void
    checkSolution: () => boolean
    riddleSolved: () => void
    tutorialStartIndex: number
    blocklyError: boolean
}

const Riddle = ({
    riddle,
    riddleText,
    isSolved,
    workspace,
    userSolution,
    codeResult,
    isNotificationVisible,
    isCuneiformExpanded,
    isLegendExpanded,
    onCuneiformCharOver,
    goBack,
    runCode,
    clearWorkspace,
    shrinkCuneiform,
    expandCuneiform,
    shrinkLegend,
    expandLegend,
    setWorkspace,
    onChangeSolution,
    checkSolution,
    riddleSolved,
    inventory,
    width,
    height,
    isTutorialOpen,
    showTutorial,
    hideTutorial,
    tutorialStartIndex,
    blocklyError
}: RiddleProps) => (
    <div className={css(styles.wrapper)}>
        <Modal
            isOpen={isSolved}
            onOpenDelay={1000}
            content={
                <SolvedRiddleModal onClick={riddleSolved.bind(null, false)} />
            }
        />
        <Toolbar goBack={goBack} openInfo={showTutorial} />
        <Motion
            style={{
                columnFlex: spring(expandedToFlex(isCuneiformExpanded)),
                legendFlex: spring(expandedToFlex(isLegendExpanded))
            }}
        >
            {({ columnFlex, legendFlex }) => (
                <div className={css(styles.riddleContainer)}>
                    <div
                        className={css(styles.riddleColumn)}
                        style={{ flex: columnFlex, opacity: columnFlex }}
                    >
                        <div className={css(styles.riddleContent)}>
                            <CuneiformSection
                                riddle={riddleText}
                                translated={hasItem(inventory, translator)}
                                onCharOver={onCuneiformCharOver}
                            />
                            <div className={css(styles.lockRow)}>
                                <Solution
                                    length={riddle.solutionLength}
                                    type={riddle.solutionType}
                                    onChangeValue={onChangeSolution}
                                    value={userSolution}
                                    isCorrect={isSolved}
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
                                        riddle={riddle}
                                        toolbox={getToolbox(
                                            riddle.defaultToolbox
                                        )}
                                        workspace={workspace}
                                        setWorkspace={setWorkspace}
                                        height={`${height}px`}
                                        width={'100%'}
                                        codeResult={codeResult}
                                        runCode={runCode}
                                        clearWorkspace={clearWorkspace}
                                        blocklyError={blocklyError}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <Tutorial
                        inventory={inventory}
                        isOpen={isTutorialOpen}
                        onClose={hideTutorial}
                        startAt={tutorialStartIndex}
                    />
                </div>
            )}
        </Motion>
    </div>
)

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
            if (hasItem(this.props.gameStore.inventory, translator)) {
                this.props.riddleUIStore.shrinkLegend()
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
            clearWorkspace,
            checkSolution,
            isSolved,
            setRiddleCompleted,
            setWorkspaceXML,
            setUserSolution,
            workspaceXML,
            userSolution,
            question,
            blocklyError
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
            tutorialStartIndex,
            onCuneiformCharOver
        } = this.props.riddleUIStore

        return (
            <Riddle
                riddle={currentRiddle}
                riddleText={question}
                goBack={goBack}
                workspace={workspaceXML}
                userSolution={userSolution}
                codeResult={codeResult}
                isLegendExpanded={isLegendExpanded}
                isCuneiformExpanded={isCuneiformExpanded}
                isNotificationVisible={isNotificationVisible}
                inventory={inventory}
                runCode={runCode}
                clearWorkspace={clearWorkspace}
                setWorkspace={setWorkspaceXML}
                onChangeSolution={setUserSolution}
                checkSolution={checkSolution}
                isSolved={isSolved}
                riddleSolved={setRiddleCompleted}
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
                onCuneiformCharOver={onCuneiformCharOver}
                blocklyError={blocklyError}
            />
        )
    }
}

export default RiddleContainer
