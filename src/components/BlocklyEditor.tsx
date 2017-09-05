import { css, StyleSheet } from 'aphrodite'
import * as Blockly from 'node-blockly/browser'
import * as React from 'react'

const styles = StyleSheet.create({
    resizable: {
        position: 'absolute'
    },
    workspace: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    circle: {
        position: 'relative',
        width: 50,
        height: 50,
        left: '50px',
        top: '-webkit-calc(100% - 50px)',
        zIndex: 100,
        margin: '-25px 0 0 -25px',
        background: 'green',
        borderRadius: 50,
        outline: 'none'
    },
    play: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '10px 0 10px 20px',
        borderColor: 'transparent transparent transparent #ffffff',
        margin: '-10px 0 0 -7px'
    }
})

const blocklyOptions = {
    collapse: true,
    comments: true,
    disable: true,
    grid: {
        spacing: 20,
        length: 1,
        colour: '#888'
    },
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    media: 'https://blockly-demo.appspot.com/static/media/',
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true
}

export interface BlockEditorProps {
    toolboxXML: string
    workspaceXML: string
    onWorkspaceChange: (workspace: string) => any
    onCodeRun?: () => void
    runCode: () => void
}

class BlockEditor extends React.Component<BlockEditorProps> {
    workspaceDiv: HTMLDivElement
    resizableDiv: HTMLDivElement
    toolboxDiv: HTMLDivElement

    workspace: any

    constructor() {
        super()
        this.onResize = this.onResize.bind(this)
        this.injectWorkspaceXML = this.injectWorkspaceXML.bind(this)
    }

    componentDidMount() {
        // tslint:disable-next-line:no-this-assignment
        const self = this
        this.workspace = Blockly.inject(this.resizableDiv.id, {
            ...blocklyOptions,
            toolbox: this.props.toolboxXML
        })
        this.injectWorkspaceXML(this.props.workspaceXML)
        window.addEventListener('resize', this.onResize)

        setTimeout(() => {
            this.onResize()
            const topBlocks = self.workspace.getTopBlocks()
            for (const block of topBlocks) {
                block.moveBy(80, 10)
                // TODO: get block initial position and toolbox width
            }
        }, 100)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
        const widget = document.querySelector(
            '.blocklyWidgetDiv'
        ) as HTMLElement
        const tooltip = document.querySelector(
            '.blocklyTooltipDiv'
        ) as HTMLElement
        widget.style.display = 'none'
        tooltip.style.display = 'none'
    }

    componentWillReceiveProps(nextProps: BlockEditorProps) {
        // TODO a cosa dovrebbe servire?
        // if (nextProps.workspaceXML !== this.props.workspaceXML) {
        //     this.injectWorkspaceXML(nextProps.workspaceXML)
        // }
    }

    injectWorkspaceXML(workspaceXML: string) {
        this.workspace.clear()

        const xml = Blockly.Xml.textToDom(workspaceXML)
        Blockly.Xml.domToWorkspace(xml, this.workspace)

        this.workspace.addChangeListener(() => {
            const newXML = Blockly.Xml.workspaceToDom(this.workspace)
            const xmlString = Blockly.Xml.domToPrettyText(newXML)
            this.props.onWorkspaceChange(xmlString)
        })
    }

    onResize() {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        const element = this.workspaceDiv
        let x = 0
        let y = 0
        // do {
        x += element.offsetLeft
        y += element.offsetTop
        // element = element.offsetParent as any
        // } while (element)
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
                <button
                    id="play"
                    onClick={this.props.runCode}
                    className={css(styles.circle)}
                >
                    <div className={css(styles.play)} />
                </button>
                {/* <svg className='play-button' width='64' height='64' viewBox='0 0 64 64'>
                    <title id='title'>Play Button</title>
                    <path fill='#CFCFCF' d='M929.5,480.4L91.3,14.6c-9.7-5.5-18-6.1-24.9-1.9C59.5,16.9,56,24.5,56,35.5v929.1c0,10.9,3.5,18.5,10.4,22.7c6.9,4.2,15.3,3.6,24.9-1.9l838.2-465.8c9.7-5.5,14.5-12,14.5-19.6C944,492.4,939.2,485.9,929.5,480.4z'/>
                </svg> */}
            </div>
        )
    }
}

export default BlockEditor
