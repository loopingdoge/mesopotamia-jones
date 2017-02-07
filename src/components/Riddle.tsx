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
    riddleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    riddleColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    cuneiformSection: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
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
    legendContainer: {
        // TODO
    },
    solutionSection: {
        display: 'relative',
        alignSelf: 'right'
    },
    solutionInput: {
        flex: 1,
    },
    cuneiform: {
        fontFamily: khosrau,
        fontSize: 30,
    },
})

const Legend = () =>
    <div className={css(styles.legendContainer)}>
        <hr />
        <p>
            Qui ci metteremo la legenda!
        </p>
    </div>

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
    isVerical: boolean
    expanded: boolean
    shrink: () => void
    expand: () => void
}

const Separator = ({ isVerical, expanded, shrink, expand }: SeparatorProps) =>
    <div className={css(isVerical ? styles.separatorVContainer : styles.separatorHContainer)}>
        {
            expanded ?
                <button onClick={shrink}>{ isVerical ? '<' : '▼' }</button>
                :
                <button onClick={expand}>{ isVerical ? '>' : '▲' }</button>
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
    defaultCode: string
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

const Riddle = ({ riddleText, defaultCode, codeResult, isCuneiformExpanded, isLegendExpanded, goBack, runCode, shrinkCuneiform, expandCuneiform, shrinkLegend, expandLegend, onUserCodeInput }: RiddleProps) =>
    <div className={css(styles.riddleContainer)}>
        <div className={css(styles.riddleColumn)}>
            <BackButtonSection goBack={goBack} />
            <CuneiformSection riddle={'if (1 == 1)\n    return true'} />
            <Separator
                isVerical={false}
                expanded={isLegendExpanded}
                shrink={shrinkLegend}
                expand={expandLegend}
            />
            <Legend />
        </div>
        <Separator
            isVerical={true}
            expanded={isCuneiformExpanded}
            shrink={shrinkCuneiform}
            expand={expandCuneiform}
        />
        <div className={css(styles.riddleColumn)}>
            <EditorSection
                code={defaultCode}
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
            riddleText,
            defaultCode,
            codeResult,
            runCode,
        } = this.props.riddleStore

        const {
            isCuneiformExpanded,
            shrinkCuneiform,
            expandCuneiform,
            isLegendExpanded,
            shrinkLegend,
            expandLegend,
            onUserCodeInput,
        } = this.props.riddleUIStore

        return (
            <Riddle
                goBack={goBack}
                riddleText={riddleText}
                defaultCode={defaultCode}
                codeResult={codeResult}
                isLegendExpanded={isLegendExpanded}
                isCuneiformExpanded={isCuneiformExpanded}
                runCode={runCode}
                shrinkCuneiform={shrinkCuneiform}
                expandCuneiform={expandCuneiform}
                shrinkLegend={shrinkLegend}
                expandLegend={expandLegend}
                onUserCodeInput={onUserCodeInput}
            />
        )
    }
}

export default RiddleContainer