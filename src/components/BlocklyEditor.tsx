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

class BlockEditor extends React.Component {

    workspaceDiv: HTMLDivElement
    resizableDiv: HTMLDivElement
    toolboxDiv: HTMLDivElement

    constructor() {
        super()
        this.onResize = this.onResize.bind(this)
    }

    componentDidMount() {
        const toolbox = `<xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="controls_repeat_ext"></block>
  <block type="logic_compare"></block>
  <block type="math_number"></block>
  <block type="math_arithmetic"></block>
  <block type="text"></block>
  <block type="text_print"></block>
</xml>`
        const workspace = Blockly.inject(this.resizableDiv.id, { toolbox: toolbox })
        // const xmlText =
        // `<xml xmlns="http://www.w3.org/1999/xhtml">
        //     <block type="variables_set">
        //         <field name="VAR">blockly</field>
        //         <value name="VALUE">
        //             <block type="text">
        //                 <field name="TEXT">Hello Node.js!</field>
        //             </block>
        //         </value>
        //     </block>
        // </xml>`
        // const xml = Blockly.Xml.textToDom(xmlText)
        // const workspace = new Blockly.Workspace()
        // Blockly.Xml.domToWorkspace(xml, workspace)

        window.addEventListener('resize', () => this.onResize(workspace))
        setTimeout(() => this.onResize(workspace), 100)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize(workspace: any) {
        console.log(this.workspaceDiv.offsetWidth)
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
        Blockly.svgResize(workspace)
    }

    render() {
        return (
            <div id='blocklyArea' ref={(workspaceDiv) => { this.workspaceDiv = workspaceDiv }} className={css(styles.workspace)}>
                <div id='blocklyDiv' ref={(resizableDiv) => { this.resizableDiv = resizableDiv }} className={css(styles.resizable)} />
                <div id='blocklyToolbar' ref={(toolboxDiv) => { this.toolboxDiv = toolboxDiv }} />
            </div>
        )
    }

}

export default BlockEditor