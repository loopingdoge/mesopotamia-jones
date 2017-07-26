import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as Blockly from 'node-blockly/browser'

const styles = StyleSheet.create({
    workspace: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    resizable: {
        position: 'absolute'
    }
})

const blocklyOptions = {
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    media: 'https://blockly-demo.appspot.com/static/media/',
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    grid: {
        spacing: 20,
        length: 1,
        colour: '#888'
    }
}

export interface BlockEditorProps {
    toolbox: string
    workspace: string
    onWorkspaceChange: (workspace: string) => any
    onCodeRun?: Function
}

class BlockEditor extends React.Component<BlockEditorProps> {
    workspaceDiv: HTMLDivElement
    resizableDiv: HTMLDivElement
    toolboxDiv: HTMLDivElement

    workspace: any

    constructor() {
        super()
        this.onResize = this.onResize.bind(this)
    }

    componentDidMount() {
        this.workspace = Blockly.inject(this.resizableDiv.id, {
            ...blocklyOptions,
            toolbox: this.props.toolbox
        })
        const xml = Blockly.Xml.textToDom(this.props.workspace)
        Blockly.Xml.domToWorkspace(xml, this.workspace)

        this.workspace.addChangeListener(() => {
            const xml = Blockly.Xml.workspaceToDom(this.workspace)
            const xmlString = Blockly.Xml.domToPrettyText(xml)
            this.props.onWorkspaceChange(xmlString)
        })

        window.addEventListener('resize', this.onResize)
        setTimeout(this.onResize, 100)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize() {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element = this.workspaceDiv
        let x = 0
        let y = 0
        do {
            x += element.offsetLeft
            y += element.offsetTop
            element = element.offsetParent as any
        } while (element)
        // Position blocklyDiv over blocklyArea.
        this.resizableDiv.style.left = x + 'px'
        this.resizableDiv.style.top = y + 'px'
        this.resizableDiv.style.width = this.workspaceDiv.offsetWidth + 'px'
        this.resizableDiv.style.height = this.workspaceDiv.offsetHeight + 'px'
        Blockly.svgResize(this.workspace)
    }

    render() {
        return (
            <div
                id="blocklyArea"
                ref={workspaceDiv => {
                    this.workspaceDiv = workspaceDiv
                }}
                className={css(styles.workspace)}
            >
                <div
                    id="blocklyDiv"
                    ref={resizableDiv => {
                        this.resizableDiv = resizableDiv
                    }}
                    className={css(styles.resizable)}
                />
                {/* <svg className='play-button' width='64' height='64' viewBox='0 0 64 64'>
                    <title id='title'>Play Button</title>
                    <path fill='#CFCFCF' d='M929.5,480.4L91.3,14.6c-9.7-5.5-18-6.1-24.9-1.9C59.5,16.9,56,24.5,56,35.5v929.1c0,10.9,3.5,18.5,10.4,22.7c6.9,4.2,15.3,3.6,24.9-1.9l838.2-465.8c9.7-5.5,14.5-12,14.5-19.6C944,492.4,939.2,485.9,929.5,480.4z'/>
                </svg> */}
            </div>
        )
    }
}

export default BlockEditor
