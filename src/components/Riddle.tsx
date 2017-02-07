import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'

import { GameStore } from '../stores/gameStore'
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
    separatorContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 30,
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

export interface CuneiformSectionProps {
    riddle: string
}

const Legend = () =>
    <div className={css(styles.legendContainer)}>
        <hr />
        <p>
            Qui ci metteremo la legenda!
        </p>
    </div>

const CuneiformSection = ({ riddle }: CuneiformSectionProps) =>
    <div className={css(styles.cuneiformSection)}>
        <p className={css(styles.cuneiform)}>
            {riddle}
        </p>
    </div>

export interface SeparatorProps {
    expanded: boolean
    shrinkCuneiform: () => void
    expandCuneiform: () => void
}

const Separator = ({ expanded, shrinkCuneiform, expandCuneiform }: SeparatorProps) =>
    <div className={css(styles.separatorContainer)}>
        {
            expanded ?
                <button onClick={shrinkCuneiform}>{'<'}</button>
                :
                <button onClick={expandCuneiform}>{'>'}</button>
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
    goBack: () => void
    runCode: () => void
    shrinkCuneiform: () => void
    expandCuneiform: () => void
    onUserCodeInput: (code: string) => void
}

const Riddle = ({ riddleText, defaultCode, codeResult, isCuneiformExpanded, goBack, runCode, shrinkCuneiform, expandCuneiform, onUserCodeInput }: RiddleProps) =>
    <div className={css(styles.riddleContainer)}>
        <div className={css(styles.riddleColumn)}>
            <BackButtonSection goBack={goBack} />
            <CuneiformSection riddle={'if (1 == 1)\n    return true'} />
            <Legend />
        </div>
        <Separator
            expanded={isCuneiformExpanded}
            shrinkCuneiform={shrinkCuneiform}
            expandCuneiform={expandCuneiform}
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
    routingStore?: RouterStore
}

@inject('gameStore', 'routingStore')
@observer
class RiddleContainer extends React.Component<RiddleContainerProps, undefined> {
    render() {
        const { goBack } = this.props.routingStore
        const {
            riddleText,
            defaultCode,
            codeResult,
            runCode,
            isCuneiformExpanded,
            shrinkCuneiform,
            expandCuneiform,
            onUserCodeInput,
        } = this.props.gameStore
        return (
            <Riddle
                goBack={goBack}
                riddleText={riddleText}
                defaultCode={defaultCode}
                codeResult={codeResult}
                isCuneiformExpanded={isCuneiformExpanded}
                runCode={runCode}
                shrinkCuneiform={shrinkCuneiform}
                expandCuneiform={expandCuneiform}
                onUserCodeInput={onUserCodeInput}
            />
        )
    }
}

export default RiddleContainer