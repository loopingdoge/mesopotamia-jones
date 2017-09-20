import { css, StyleSheet } from 'aphrodite'
import { upperFirst } from 'lodash'
import * as React from 'react'

import { Inventory, Item } from '../config/inventory'

import { mod } from '../utils'
import { arvo } from '../utils/fonts'

const itemPreviewSize = 100

const styles = StyleSheet.create({
    inventory: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: [arvo, 'sans-serif'],
        color: '#FFFFFF',
        paddingTop: '24px'
    },
    inventoryTab: {
        boxShadow: 'rgba(255, 255, 255, 0.28) -2px 7px 24px'
    },
    itemList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        padding: '20px'
    },
    itemContainer: {
        marginRight: '20px',
        ':last-child': {
            marginRight: '0px'
        },
        cursor: 'pointer',
        maxHeight: itemPreviewSize + 25
    },
    itemImageContainer: {
        padding: 10,
        border: '1px #000000',
        borderStyle: 'groove',
        borderRadius: 10,
        transition: 'background 0.3s ease'
    },
    nonActiveItemColor: {
        background: '#6b482f'
    },
    activeItemColor: {
        background: '#bb8300'
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
        justifyContent: 'center'
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
    itemName: {
        fontSize: 'xx-large',
        fontWeight: 'bold'
    },
    itemDescription: {
        marginTop: '24px',
        fontSize: 'larger'
    },
    selectedItemContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    }
})

export interface InventoryProps {
    inventory: Inventory
}

interface InventoryState {
    itemIndex: number
}

class InventoryUI extends React.Component<InventoryProps, InventoryState> {
    constructor(props: InventoryProps) {
        super(props)
        this.state = {
            itemIndex: 0
        }
    }

    componentDidMount() {
        addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        removeEventListener('keydown', this.onKeyDown)
    }

    selectItem = (index: number) => {
        this.setState({ itemIndex: index })
    }

    onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            this.setState({
                itemIndex: mod(
                    this.state.itemIndex - 1,
                    this.props.inventory.length
                )
            })
        } else if (event.key === 'ArrowRight') {
            this.setState({
                itemIndex: mod(
                    this.state.itemIndex + 1,
                    this.props.inventory.length
                )
            })
        }
    }

    render() {
        const inventory = this.props.inventory
        const itemIndex = this.state.itemIndex
        return (
            <div className={css(styles.inventory)}>
                <div className={css(styles.itemList, styles.inventoryTab)}>
                    {inventory.map((item, index) =>
                        <div key={index} className={css(styles.itemContainer)}>
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
                    )}
                </div>
                <div
                    className={css(
                        styles.selectedItemContainer,
                        styles.inventoryTab
                    )}
                >
                    {inventory[itemIndex]
                        ? <div className={css(styles.item)}>
                              <div className={css(styles.itemName)}>
                                  {upperFirst(inventory[itemIndex].name)}
                              </div>
                              <div
                                  className={css(styles.itemImageBigContainer)}
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
                              <div className={css(styles.itemDescription)}>
                                  {upperFirst(inventory[itemIndex].description)}
                              </div>
                          </div>
                        : <div>Seleziona un oggetto</div>}
                </div>
            </div>
        )
    }
}

export default InventoryUI
