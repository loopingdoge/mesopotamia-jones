import { css, StyleSheet } from 'aphrodite'
import { upperFirst } from 'lodash'
import * as React from 'react'

import { Inventory, Item } from '../config/inventory'

import { mod } from '../utils'
import { arvo } from '../utils/fonts'

const itemPreviewSize = 100

const slideRight = {
    from: {
        opacity: 0,
        transform: 'translateY(-10px)'
    },
    to: {
        opacity: 1,
        transform: 'translateY(0px)'
    }
}

const styles = StyleSheet.create({
    inventory: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: [arvo, 'sans-serif'],
        color: '#FFFFFF'
    },
    inventoryTab: {
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.09)'
    },
    tabHeader: {
        fontSize: 'xx-large',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: '2px solid white',
        paddingBottom: '24px',
        marginBottom: '24px'
    },
    itemListSection: {
        flex: 1,
        overflowY: 'scroll',
        padding: '24px'
    },
    itemList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemContainer: {
        marginRight: '24px',
        marginBottom: '24px',
        ':last-child': {
            marginRight: '0px'
        },
        cursor: 'pointer',
        maxHeight: itemPreviewSize + 25
    },
    itemImageContainer: {
        padding: 10,
        borderRadius: 10,
        borderStyle: 'groove',
        transition: 'background 0.3s ease'
    },
    nonActiveItemColor: {
        background: '#1d1c1c',
        borderColor: '#424242'
    },
    activeItemColor: {
        background: '#bb8300',
        borderColor: '#deb887'
    },
    itemImage: {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: itemPreviewSize,
        height: itemPreviewSize
    },
    itemImageBigContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 0px'
    },
    itemImageBig: {
        marginTop: '24px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: 200,
        height: 200
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    itemDescription: {
        marginTop: '24px',
        fontSize: 'larger'
    },
    selectedItemContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 24px 24px 32px'
    }
})

const slideAnimation = (delay: number) =>
    StyleSheet.create({
        animation: {
            animationName: slideRight,
            animationDuration: '400ms',
            animationDelay: `${delay}ms`,
            animationFillMode: 'both'
        }
    })

export interface InventoryProps {
    inventory: Inventory
}

interface InventoryState {
    itemIndex: number
    triggerAnimation: boolean
}

class InventoryUI extends React.Component<InventoryProps, InventoryState> {
    resetAnimationTimeout: any

    constructor(props: InventoryProps) {
        super(props)
        this.state = {
            itemIndex: 0,
            triggerAnimation: true
        }
    }

    componentDidMount() {
        addEventListener('keydown', this.onKeyDown)
        this.resetAnimation()
    }

    componentWillUnmount() {
        removeEventListener('keydown', this.onKeyDown)
        this.clearTimeout()
    }

    clearTimeout = () => {
        clearTimeout(this.resetAnimationTimeout)
    }

    selectItem = (index: number) => {
        if (index !== this.state.itemIndex) {
            this.setState({ itemIndex: index, triggerAnimation: true })
            this.resetAnimation()
        }
    }

    resetAnimation = () => {
        this.clearTimeout()
        this.resetAnimationTimeout = setTimeout(
            () => this.setState({ triggerAnimation: false }),
            600
        )
    }

    onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            this.selectItem(
                mod(this.state.itemIndex - 1, this.props.inventory.length)
            )
        } else if (event.key === 'ArrowRight') {
            this.selectItem(
                mod(this.state.itemIndex + 1, this.props.inventory.length)
            )
        }
    }

    render() {
        const inventory = this.props.inventory
        const itemIndex = this.state.itemIndex
        return (
            <div className={css(styles.inventory)}>
                <div
                    className={css(styles.itemListSection, styles.inventoryTab)}
                >
                    <div className={css(styles.tabHeader)}>Inventario</div>
                    <div className={css(styles.itemList)}>
                        {inventory.map((item, index) => (
                            <div
                                key={index}
                                className={css(styles.itemContainer)}
                            >
                                <div
                                    className={css(
                                        styles.itemImageContainer,
                                        inventory[itemIndex].id === item.id
                                            ? styles.activeItemColor
                                            : styles.nonActiveItemColor
                                    )}
                                    onClick={this.selectItem.bind(this, index)}
                                >
                                    <div
                                        className={css(styles.itemImage)}
                                        style={{
                                            backgroundImage: `url(${item.image})`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={css(
                        styles.selectedItemContainer,
                        styles.inventoryTab
                    )}
                >
                    {inventory[itemIndex] ? (
                        <div className={css(styles.item)}>
                            <div
                                className={css(
                                    styles.tabHeader,
                                    this.state.triggerAnimation
                                        ? slideAnimation(0).animation
                                        : null
                                )}
                            >
                                {upperFirst(inventory[itemIndex].name)}
                            </div>
                            <div
                                className={css(
                                    styles.itemImageBigContainer,
                                    this.state.triggerAnimation
                                        ? slideAnimation(100).animation
                                        : null
                                )}
                            >
                                <div
                                    className={css(styles.itemImageBig)}
                                    style={{
                                        backgroundImage: `url(${inventory[
                                            itemIndex
                                        ].image})`
                                    }}
                                />
                            </div>
                            <div
                                className={css(
                                    styles.itemDescription,
                                    this.state.triggerAnimation
                                        ? slideAnimation(200).animation
                                        : null
                                )}
                            >
                                {upperFirst(inventory[itemIndex].description)}
                            </div>
                        </div>
                    ) : (
                        <div>Seleziona un oggetto</div>
                    )}
                </div>
            </div>
        )
    }
}

export default InventoryUI
