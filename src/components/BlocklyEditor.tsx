import { css, StyleSheet } from 'aphrodite'
import { trim } from 'lodash'
import * as Blockly from 'node-blockly/browser'
import * as React from 'react'
import Icon from 'react-icons-kit'
import { play } from 'react-icons-kit/ionicons/'
import { ic_replay } from 'react-icons-kit/md/ic_replay'
import * as ReactTooltip from 'react-tooltip'

import { Riddle } from '../config/riddles'

import Button from './Button'

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
    riddle: {
        position: 'relative',
        top: 0,
        maxWidth: '100%',
        width: '100%',
        height: 80,
        padding: '0px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbd688',
        boxShadow: 'inset 0 0 10px #90752d',
        color: '#90752d',
        fontFamily: 'sans-serif'
    },
    placeholder: {
        height: '100%',
        zIndex: 100
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
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0.7,
        border: '2px solid #333333',
        borderRadius: '9px',
        backgroundColor: 'white',
        width: '20px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: '24px'
    },
    playButton: {
        backgroundColor: '#8ed85e',
        borderColor: '#333333',
        color: '#333333'
    },
    resetButton: {
        backgroundColor: '#ff7575',
        borderColor: '#333333',
        color: '#333333'
    },
    error: {
        color: '#ff5050'
    }
})

let blocklyOptions = {
    collapse: true,
    comments: true,
    disable: true,
    grid: {
        spacing: 40,
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
    oneBasedIndex: true,
    readOnly: false,
    zoom: {
        wheel: true,
        startScale: 1,
        maxScale: 2,
        minScale: 0.3,
        scaleSpeed: 1.2
    }
}

export interface BlockEditorProps {
    riddle: Riddle
    readonly?: boolean
    riddleText?: string
    toolboxXML?: string
    workspaceXML: string
    onWorkspaceChange?: (workspace: string) => any
    codeResult?: string
    runCode?: () => void
    clearWorkspace?: () => void
    error?: boolean
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

        blocklyOptions = {
            ...blocklyOptions,
            readOnly: this.props.readonly === true
        }
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
            this.props.readonly &&
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

        x += element.offsetLeft
        y += element.offsetTop

        if (this.props.readonly) {
            y += 80 // spazio per il testo riddle
        }

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

    onClear = () => {
        this.props.clearWorkspace()
        this.injectWorkspaceXML(this.deafultWorkspace)
    }

    render() {
        const { codeResult, error, riddle, riddleText } = this.props

        console.log(riddle)
        console.log(this.props.readonly)
        return (
            <div
                id="blocklyArea"
                ref={workspaceDiv => {
                    this.workspaceDiv = workspaceDiv
                }}
                className={css(styles.workspace)}
            >
                {onlyIf(
                    this.props.readonly === true,
                    <div
                        className={css(
                            styles.riddle,
                            this.props.workspaceXML === '' && styles.placeholder
                        )}
                    >
                        {onlyIf(
                            this.props.workspaceXML === '' &&
                                this.props.riddleText !== undefined,
                            <b>{'Non hai ancora risolto questo indovinello'}</b>
                        )}
                        {this.props.riddleText ||
                            'Seleziona una porta per vedere la tua soluzione'}
                    </div>
                )}
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
                        <div id="play" data-tip data-for={'play'}>
                            <Button
                                icon={play}
                                circular
                                onClick={this.runCode}
                                iconSize={28}
                                customCSS={styles.playButton}
                            />
                        </div>
                        <ReactTooltip
                            id={'play'}
                            place={'top'}
                            effect={'solid'}
                        >
                            <span>Esegui</span>
                        </ReactTooltip>
                        <div
                            className={css(
                                styles.output,
                                onlyIf(error, styles.error)
                            )}
                            data-tip
                            data-for={'output'}
                        >
                            {this.props.readonly !== true
                                ? error
                                  ? 'Errore'
                                  : riddle.solutionType === 'string'
                                    ? `"${codeResult || ''}"`
                                    : codeResult
                                : null}
                        </div>
                        <ReactTooltip
                            id={'output'}
                            place={'top'}
                            effect={'solid'}
                        >
                            <span>Risultato</span>
                        </ReactTooltip>
                        <div id="clear" data-tip data-for={'clear'}>
                            <Button
                                icon={ic_replay}
                                circular
                                onClick={this.onClear}
                                iconSize={28}
                                customCSS={styles.resetButton}
                            />
                        </div>
                        <ReactTooltip
                            id={'clear'}
                            place={'top'}
                            effect={'solid'}
                        >
                            <span>Ripristina</span>
                        </ReactTooltip>
                    </div>
                )}
            </div>
        )
    }
}

export default BlockEditor
