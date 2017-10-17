import { css, StyleSheet } from 'aphrodite'
import { upperFirst } from 'lodash'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { Item } from '../config/inventory'
import widthHeightProvider from '../containers/widthHeightProvider'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'
import l10nStore from '../stores/l10nStore'

import { arvo } from '../utils/fonts'

import PressToContinue from './PressToContinue'

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 64px',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: [arvo, 'sans-serif'],
        color: '#FFF',
        fontSize: 24
    },
    itemYouFound: {
        fontSize: 34,
        fontWeight: 600,
        paddingBottom: 36,
        marginBottom: 36,
        borderBottom: '1px #ffffff solid',
        textAlign: 'center'
    },
    itemTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 36
    },
    itemImageContainer: {
        padding: 10,
        border: '1px #ffffff',
        borderStyle: 'groove',
        borderRadius: 10,
        background: '#6b482f'
    },
    itemImage: {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: 125,
        height: 125
    },
    itemName: {
        marginLeft: 48,
        fontWeight: 600
    }
})

export interface FoundItemProps {
    item: Item
    width: number
    height: number
}

const FoundItem = ({ item, width, height }: FoundItemProps) => {
    const imageStyle = {
        backgroundImage: `url(${item.image})`
    }
    const centeredContainer = {
        width: width * 0.6
    }

    return (
        <div className={css(styles.wrapper)}>
            <div style={centeredContainer}>
                <div className={css(styles.itemYouFound)}>Hai trovato</div>
                <div className={css(styles.itemTitle)}>
                    <div className={css(styles.itemImageContainer)}>
                        <div
                            className={css(styles.itemImage)}
                            style={imageStyle}
                        />
                    </div>
                    <div className={css(styles.itemName)}>
                        {upperFirst(l10nStore.dictionary[item.nameId])}
                    </div>
                </div>
                <div>
                    {upperFirst(l10nStore.dictionary[item.descriptionId])}
                </div>
                <div>
                    <PressToContinue />
                </div>
            </div>
        </div>
    )
}

export default widthHeightProvider(FoundItem)
