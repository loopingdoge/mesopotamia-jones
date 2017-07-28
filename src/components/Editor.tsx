import { css, StyleSheet } from 'aphrodite'
import 'brace/mode/javascript'
import 'brace/theme/solarized_light'
import * as React from 'react'
import AceEditor from 'react-ace'

const styles = StyleSheet.create({
    editorWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    toolbar: {
        zIndex: 1,
        width: 120,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0px 10px #888'
    },
    toolbarItem: {
        height: 30,
        borderBottom: '2px solid #FDF6E3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export interface EditorProps {
    code: string
    defaultCode?: string
    onUserCodeInput: (code: string) => void
    height: string
    width: string
}

const Editor = ({
    code,
    defaultCode,
    onUserCodeInput,
    height,
    width
}: EditorProps) =>
    <div className={css(styles.editorWrapper)}>
        <AceEditor
            mode="javascript"
            theme="solarized_light"
            onChange={onUserCodeInput}
            name="code-editor"
            value={code || defaultCode}
            editorProps={{ $blockScrolling: Infinity }}
            tabSize={4}
            fontSize={16}
            height={height}
            width={width}
        />
    </div>

export default Editor
