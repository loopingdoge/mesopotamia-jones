import { css, StyleSheet } from 'aphrodite'
import * as Blockly from 'node-blockly/browser'
import * as React from 'react'
import Icon from 'react-icons-kit'
import { androidDelete } from 'react-icons-kit/ionicons/androidDelete'

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
        justifyContent: 'space-between',
        backgroundColor: '#e4e4e4'
    },
    output: {
        resize: 'none',
        height: 50,
        width: 100
    },
    run: {
        position: 'relative',
        left: 20,
        width: 50,
        height: 50,
        zIndex: 100,
        background: 'green',
        borderRadius: 50,
        outline: 'none'
    },
    clear: {
        position: 'relative',
        right: 20,
        width: 50,
        height: 50,
        zIndex: 100,
        background: 'red',
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
    codeResult: string
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
                <div id="resultDiv" className={css(styles.result)}>
                    <button
                        id="play"
                        onClick={this.props.runCode}
                        className={css(styles.run)}
                    >
                        <div className={css(styles.play)} />
                    </button>
                    <textarea
                        readOnly={true}
                        // TODO: perche' cazzo non si aggiorna?
                        value={
                            this.props.codeResult ||
                            'Premi il pulsante "Play" per eseguire il codice'
                        }
                        className={css(styles.output)}
                    />
                    <button
                        id="clear"
                        onClick={() => console.log('TODO')}
                        className={css(styles.clear)}
                    >
                        <Icon
                            icon={androidDelete}
                            size={32}
                            style={{ color: 'white' }}
                        />
                    </button>
                </div>
            </div>
        )
    }
}

export default BlockEditor
