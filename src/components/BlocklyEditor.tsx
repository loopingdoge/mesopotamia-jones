import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as Blockly from 'node-blockly/browser'

const styles = StyleSheet.create({
    workspace: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    resizable: {
        position: 'absolute',
    }
})

export interface BlockEditorProps {
    toolbox: string
    workspace: string
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
        const options = {
            toolbox : this.props.toolbox,
            collapse : true,
            comments : true,
            disable : true,
            maxBlocks : Infinity,
            trashcan : true,
            horizontalLayout : false,
            toolboxPosition : 'start',
            css : true,
            media : 'https://blockly-demo.appspot.com/static/media/',
            rtl : false,
            scrollbars : true,
            sounds : true,
            oneBasedIndex : true,
            grid : {
                spacing : 20,
                length : 1,
                colour : '#888',
            }
        }
        this.workspace = Blockly.inject(this.resizableDiv.id, options)
        const xml = Blockly.Xml.textToDom(this.props.workspace)
        Blockly.Xml.domToWorkspace(xml, this.workspace)

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
            <div id='blocklyArea' ref={(workspaceDiv) => { this.workspaceDiv = workspaceDiv }} className={css(styles.workspace)}>
                <div id='blocklyDiv' ref={(resizableDiv) => { this.resizableDiv = resizableDiv }} className={css(styles.resizable)} />
            </div>
        )
    }

}

export default BlockEditor