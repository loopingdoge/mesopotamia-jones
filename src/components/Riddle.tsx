import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

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

    },
    cuneiform: {
        fontFamily: khosrau,
        fontSize: 30,
    },
})

export interface CuneiformSectionProps {
    riddle: string
    isLegendActive: boolean
}

const Legend = () =>
    <div className={css(styles.legendContainer)}>
        <hr />
        <p>
            Qui ci metteremo la legenda!
        </p>
    </div>

const CuneiformSection = ({ riddle, isLegendActive }: CuneiformSectionProps) =>
    <div className={css(styles.cuneiformSection)}>
        <p className={css(styles.cuneiform)}>
            {riddle}
        </p>
        {isLegendActive ? <Legend /> : null}
    </div>

const Separator = () =>
    <div className={css(styles.separatorContainer)}>
        <button>{'<'}</button>
    </div>

export interface EditorSectionProps {
    code: string
}

const EditorSection = ({ code }: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <Editor code={code}/>
    </div>

const Riddle = () =>
    <div className={css(styles.riddleContainer)}>
        <CuneiformSection riddle={'if (1 == 1)\n    return true'} isLegendActive/>
        <Separator />
        <EditorSection code={'if (1 == 1)\n    return true'}/>
    </div>

export default Riddle