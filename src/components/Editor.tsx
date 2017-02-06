import * as React from 'react'
import AceEditor from 'react-ace'
import { css, StyleSheet } from 'aphrodite'

import 'brace/mode/javascript'
import 'brace/theme/github'

const styles = StyleSheet.create({
    editor: {
        flex: 1
    }
})

export interface EditorProps {
    code: string
}

export default class Editor extends React.Component<EditorProps, undefined> {

    onTextInput = (text: string) => {
        console.log(text)
    }

    render() {
        return (
            <AceEditor
                mode='javascript'
                theme='github'
                onChange={this.onTextInput}
                name='code-editor'
                defaultValue={this.props.code}
                editorProps={{$blockScrolling: Infinity}}
                tabSize={4}
                fontSize={16}
                width={'auto'}
                height={'500px'}
                className={css(styles.editor)}
            />
        )
    }

}