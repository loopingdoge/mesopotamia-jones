import * as React from 'react'
import AceEditor from 'react-ace'
import { css, StyleSheet } from 'aphrodite'

import 'brace/mode/javascript'
import 'brace/theme/github'

const styles = StyleSheet.create({
    editor: {
        flex: 1,
    }
})

export interface EditorProps {
    code: string
    onUserCodeInput: (code: string) => void
    height: string
    width: string
}

const Editor = ({ code, onUserCodeInput, height, width }: EditorProps) =>
    <AceEditor
        mode='javascript'
        theme='github'
        onChange={onUserCodeInput}
        name='code-editor'
        defaultValue={code}
        value={code}
        editorProps={{$blockScrolling: Infinity}}
        tabSize={4}
        fontSize={16}
        height={height}
        width={width}
        className={css(styles.editor)}
    />

export default Editor