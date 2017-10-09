import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { Icon } from 'react-icons-kit'
import {
    androidArrowDropdown,
    androidArrowDropleft,
    androidArrowDropright,
    androidArrowDropup
} from 'react-icons-kit/ionicons/'

import { arvo } from '../utils/fonts'

import l10n from '../l10n'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        padding: 24
    },
    controlsWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        fontWeight: 'bold',
        fontFamily: [arvo, 'sans-serif'],
        textAlign: 'center',
        borderBottom: '2px solid white',
        color: 'white'
    },
    tabHeader: {
        fontSize: 'xx-large',
        paddingBottom: 24,
        marginBottom: 24
    },
    tabSubheader: {
        fontSize: 'large',
        paddingBottom: 12,
        color: '#eee'
    },
    controlsColumn: {
        flexGrow: 1,
        padding: 30
    },
    keyWrapper: {
        listStyle: 'none',
        position: 'relative',
        width: 152,
        height: 104,
        left: '50%',
        top: '10%',
        marginLeft: -76
    },
    key: {
        position: 'absolute',
        top: 56,
        textDecoration: 'none',
        textAlign: 'center',
        width: 40,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#f1f1f1',
        border: '1px solid #eee',
        borderRadius: 8,
        boxShadow: '0 6px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        opacity: 0.3
    },
    spaceBar: {
        width: 120
    },
    directionKey: {
        ':nth-child(1)': {
            top: 8,
            left: 56
        },
        ':nth-child(2)': {
            left: 8
        },
        ':nth-child(3)': {
            left: 56
        },
        ':nth-child(4)': {
            left: 104
        }
    },
    gameHeaderKey: {
        ':nth-child(1)': {
            left: 8
        },
        ':nth-child(2)': {
            left: 56
        },
        ':nth-child(3)': {
            left: 104
        }
    }
})

const GameControls = () => (
    <div className={css(styles.container)}>
        <div className={css(styles.header, styles.tabHeader)}>
            {l10n.controls_game_controls}
        </div>
        <div className={css(styles.controlsWrapper)}>
            <div className={css(styles.controlsColumn)}>
                <div className={css(styles.header, styles.tabSubheader)}>
                    {l10n.controls_move}
                </div>
                <ul className={css(styles.keyWrapper)}>
                    <li className={css(styles.key, styles.directionKey)}>
                        <Icon icon={androidArrowDropup} size={20} />
                    </li>
                    <li className={css(styles.key, styles.directionKey)}>
                        <Icon icon={androidArrowDropleft} size={20} />
                    </li>
                    <li className={css(styles.key, styles.directionKey)}>
                        <Icon icon={androidArrowDropdown} size={20} />
                    </li>
                    <li className={css(styles.key, styles.directionKey)}>
                        <Icon icon={androidArrowDropright} size={20} />
                    </li>
                </ul>
                <ul className={css(styles.keyWrapper)}>
                    <li className={css(styles.key, styles.directionKey)}>
                        <b>W</b>
                    </li>
                    <li className={css(styles.key, styles.directionKey)}>
                        <b>A</b>
                    </li>
                    <li className={css(styles.key, styles.directionKey)}>
                        <b>S</b>
                    </li>
                    <li className={css(styles.key, styles.directionKey)}>
                        <b>D</b>
                    </li>
                </ul>
            </div>
            <div className={css(styles.controlsColumn)}>
                <div className={css(styles.header, styles.tabSubheader)}>
                    {l10n.controls_interact}
                </div>
                <ul className={css(styles.keyWrapper)}>
                    <li className={css(styles.key, styles.spaceBar)}>
                        <b>{l10n.controls_space}</b>
                    </li>
                </ul>
            </div>
            <div className={css(styles.controlsColumn)}>
                <div className={css(styles.header, styles.tabSubheader)}>
                    {l10n.controls_shortcuts}
                </div>
                <ul className={css(styles.keyWrapper)}>
                    <li className={css(styles.key, styles.gameHeaderKey)}>
                        <b>1</b>
                    </li>
                    <li className={css(styles.key, styles.gameHeaderKey)}>
                        <b>2</b>
                    </li>
                    <li className={css(styles.key, styles.gameHeaderKey)}>
                        <b>3</b>
                    </li>
                </ul>
            </div>
        </div>
    </div>
)

export default GameControls
