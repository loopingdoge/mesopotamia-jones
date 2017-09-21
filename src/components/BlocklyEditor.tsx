import { css, StyleSheet } from 'aphrodite'
import * as Blockly from 'node-blockly/browser'
import * as React from 'react'
import Icon from 'react-icons-kit'
import { androidDelete, play } from 'react-icons-kit/ionicons/'

import { onlyIf } from '../utils'

const styles = StyleSheet.create({
    resizable: {
        position: 'absolute'
    },
    workspace: {
        margin: '20px 20px 20px 10px',
        border: '20px solid #333',
        borderRadius: 10,
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    result: {
        position: 'relative',
        top: 'calc(100% - 80px)',
        maxWidth: '100%',
        width: '100%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#e4e4e4'
    },
    output: {
        resize: 'none',
        height: 50,
        width: 20,
        flexGrow: 0.7
    },
    computerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        zIndex: 100,
        borderRadius: 50,
        outline: 'none'
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
    readonly?: boolean
    toolboxXML?: string
    workspaceXML: string
    onWorkspaceChange?: (workspace: string) => any
    codeResult?: string
    runCode?: () => void
    clearWorkspace?: () => void
}

class BlockEditor extends React.Component<BlockEditorProps> {
    workspaceDiv: HTMLDivElement
    resizableDiv: HTMLDivElement
    toolboxDiv: HTMLDivElement
    deafultWorkspace: string

    workspace: any

    onWorkspaceChange: (workspace: string) => any
    runCode: () => void

    constructor(props: BlockEditorProps) {
        super(props)
        this.onResize = this.onResize.bind(this)
        this.injectWorkspaceXML = this.injectWorkspaceXML.bind(this)

        this.deafultWorkspace = props.workspaceXML
    }

    componentWillMount() {
        this.runCode = this.props.runCode || (() => null)
        this.onWorkspaceChange =
            this.props.onWorkspaceChange || ((w: string) => null)
    }

    componentDidMount() {
        // tslint:disable-next-line:no-this-assignment
        window.addEventListener('resize', this.onResize)

        setTimeout(() => {
            this.onResize()

            this.workspace = Blockly.inject(this.resizableDiv.id, {
                ...blocklyOptions,
                toolbox: this.props.toolboxXML
            })
            this.injectWorkspaceXML(this.props.workspaceXML)

            const topBlocks = this.workspace.getTopBlocks()
            // tslint:disable-next-line:curly
            for (const block of topBlocks) block.moveBy(10, 0)
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
        if (
            (this.props.readonly ||
                nextProps.workspaceXML === this.deafultWorkspace) &&
            nextProps.workspaceXML !== this.props.workspaceXML
        ) {
            this.injectWorkspaceXML(nextProps.workspaceXML)
        }
    }

    injectWorkspaceXML(workspaceXML: string) {
        this.workspace.clear()

        const xml = Blockly.Xml.textToDom(workspaceXML)
        Blockly.Xml.domToWorkspace(xml, this.workspace)

        this.workspace.addChangeListener(() => {
            const newXML = Blockly.Xml.workspaceToDom(this.workspace)
            const xmlString = Blockly.Xml.domToPrettyText(newXML)
            this.onWorkspaceChange(xmlString)
        })
    }

    onResize() {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        const element = this.workspaceDiv
        let x = 20
        let y = 20
        // do {
        x += element.offsetLeft
        y += element.offsetTop
        // element = element.offsetParent as any
        // } while (element)
        // Position blocklyDiv over blocklyArea.
        this.resizableDiv.style.left = x + 'px'
        this.resizableDiv.style.top = y + 'px'
        this.resizableDiv.style.width =
            this.workspaceDiv.offsetWidth - 1 - 40 + 'px' // -1 altrimenti si vede scrollbar
        this.resizableDiv.style.height =
            this.workspaceDiv.offsetHeight - 40 - 80 + 'px' // 50 = height sezione risultato
        // tslint:disable-next-line:curly
        if (this.workspace) Blockly.svgResize(this.workspace)
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
                {onlyIf(
                    this.props.readonly === undefined,
                    <div id="resultDiv" className={css(styles.result)}>
                        <button
                            id="play"
                            onClick={this.runCode}
                            className={css(styles.computerButton)}
                            style={{ backgroundColor: 'green' }}
                        >
                            <Icon
                                icon={play}
                                size={32}
                                style={{ color: 'white' }}
                            />
                        </button>
                        <textarea
                            readOnly={true}
                            value={
                                this.props.codeResult ||
                                'Premi il pulsante "Play" per eseguire il codice'
                            }
                            className={css(styles.output)}
                        />
                        <button
                            id="clear"
                            onClick={this.props.clearWorkspace}
                            className={css(styles.computerButton)}
                            style={{ backgroundColor: 'red' }}
                        >
                            <Icon
                                icon={androidDelete}
                                size={32}
                                style={{ color: 'white' }}
                            />
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default BlockEditor
