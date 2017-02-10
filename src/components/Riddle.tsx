import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'

import { GameStore } from '../stores/gameStore'
import { RiddleUIStore } from '../stores/riddleUIStore'
import { RiddleStore } from '../stores/riddleStore'
import Editor from './Editor'

const khosrau = {
    fontFamily: 'Cuneiform',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'url(\'../../assets/fonts/Khosrau/Khosrau.otf\') format(\'opentype\')'
}

const styles = StyleSheet.create({
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    riddleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    riddleColumnExpanded: {
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s ease',
        flex: 1,
    },
    riddleColumnShrinked: {
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s ease',
        opacity: 0,
        flex: 0,
    },
    cuneiformSection: {
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        flex: '2 0',
    },
    editorSection: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    separatorVContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 30,
        border: 'black 1px inset',
    },
    separatorHContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 30,
        border: 'black 1px inset',
    },
    legendExpanded: {
        transition: 'all 0.5s ease',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        padding: 8,
        flex: '1 0',
    },
    legendShrinked: {
        transition: 'all 0.5s ease',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        padding: 8,
        flex: '0 1',
    },
    legendCell: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 40,
        minHeight: 30,
    },
    legendNewline: {
        width: '100%'
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
    cuneiform: {
        fontFamily: khosrau,
        fontSize: 30,
    },
})

export interface LegendProps {
    isExpanded: boolean
}
class Legend extends React.Component<LegendProps, undefined> {

    alphabet: string[] = 'abcdefghijklmnopqrstuvz 0123456789 +-/*=?'.split('')

    render() {
        return (
            <div className={css(this.props.isExpanded ? styles.legendExpanded : styles.legendShrinked)}>
                {
                        this.alphabet.map( (value, i) =>
                            value === ' ' ?
                                <div key={i} className={css(styles.legendNewline)}></div>
                                :
                                <div key={i} className={css(styles.legendCell)}>
                                    <div className={css(styles.cuneiform)}>{value}</div>
                                    <div>{value}</div>
                                </div>
                        )
                }
            </div>
        )
    }
}

export interface CuneiformSectionProps {
    riddle: string
}

const CuneiformSection = ({ riddle }: CuneiformSectionProps) =>
    <div className={css(styles.cuneiformSection)}>
        <p className={css(styles.cuneiform)}>
            {riddle}
        </p>
    </div>

export interface SeparatorProps {
    isVertical: boolean
    expanded: boolean
    shrink: () => void
    expand: () => void
}

const Separator = ({ isVertical, expanded, shrink, expand }: SeparatorProps) =>
    <div className={css(isVertical ? styles.separatorVContainer : styles.separatorHContainer)}>
        {
            expanded ?
                <button onClick={shrink}>{ isVertical ? '<' : '▼' }</button>
                :
                <button onClick={expand}>{ isVertical ? '>' : '▲' }</button>
        }
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
        />
    </div>

export interface BackButtonSectionProps {
    goBack: () => void
}

const BackButtonSection = ({ goBack }: BackButtonSectionProps) =>
    <div>
        <button onClick={goBack}>{'<-'}</button>
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

export interface RiddleProps {
    riddleText: string
    userCode: string
    codeResult: string
    isCuneiformExpanded: boolean
    isLegendExpanded: boolean
    goBack: () => void
    runCode: () => void
    shrinkCuneiform: () => void
    expandCuneiform: () => void
    shrinkLegend: () => void
    expandLegend: () => void
    onUserCodeInput: (code: string) => void
}

const Riddle = ({ riddleText, userCode, codeResult, isCuneiformExpanded, isLegendExpanded, goBack, runCode, shrinkCuneiform, expandCuneiform, shrinkLegend, expandLegend, onUserCodeInput }: RiddleProps) =>
    <div className={css(styles.riddleContainer)}>
        <div className={css(isCuneiformExpanded ? styles.riddleColumnExpanded : styles.riddleColumnShrinked)}>
            <BackButtonSection goBack={goBack} />
            {
                isCuneiformExpanded ?
                    <div className={css(styles.column)}>
                        <CuneiformSection
                            riddle={riddleText}
                        />
                        <Separator
                            isVertical={false}
                            expanded={isLegendExpanded}
                            shrink={shrinkLegend}
                            expand={expandLegend}
                        />
                        <Legend
                            isExpanded={isLegendExpanded}
                        />
                    </div>
                    :
                    null
            }   
        </div>
        <Separator
            isVertical={true}
            expanded={isCuneiformExpanded}
            shrink={shrinkCuneiform}
            expand={expandCuneiform}
        />
        <div className={css(styles.riddleColumnExpanded)}>
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
        const { goBack } = this.props.routingStore
        const {
            riddle,
            codeResult,
            runCode,
            checkSolution,
            setUserCode,
            userCode,
        } = this.props.riddleStore

        const {
            isCuneiformExpanded,
            shrinkCuneiform,
            expandCuneiform,
            isLegendExpanded,
            shrinkLegend,
            expandLegend,
        } = this.props.riddleUIStore

        const onRunCode = () => {
            runCode()
            checkSolution()
        }

        return (
            <Riddle
                goBack={goBack}
                riddleText={riddle.question}
                userCode={userCode}
                codeResult={codeResult}
                isLegendExpanded={isLegendExpanded}
                isCuneiformExpanded={isCuneiformExpanded}
                runCode={onRunCode}
                shrinkCuneiform={shrinkCuneiform}
                expandCuneiform={expandCuneiform}
                shrinkLegend={shrinkLegend}
                expandLegend={expandLegend}
                onUserCodeInput={setUserCode}
            />
        )
    }
}

export default RiddleContainer