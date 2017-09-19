import { css, StyleSheet } from 'aphrodite'
import { upperFirst } from 'lodash'
import * as React from 'react'

import { Inventory, Item } from '../config/inventory'

import { arvo } from '../utils/fonts'

const itemPreviewSize = 100

const styles = StyleSheet.create({
    inventory: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: [arvo, 'sans-serif']
    },
    inventoryTab: {
        border: '1px solid #a3540b'
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
        background: '#6b482f'
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
    item: Item
}

class InventoryUI extends React.Component<InventoryProps, InventoryState> {
    constructor(props: InventoryProps) {
        super(props)
        this.state = {
            item: null
        }
    }

    selectItem = (item: Item) => {
        this.setState({ item })
    }

    render() {
        return (
            <div className={css(styles.inventory)}>
                <div className={css(styles.itemList, styles.inventoryTab)}>
                    {this.props.inventory.map((item, index) =>
                        <div key={index} className={css(styles.itemContainer)}>
                            <div
                                className={css(styles.itemImageContainer)}
                                onClick={this.selectItem.bind(this, item)}
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
                    {this.state.item
                        ? <div className={css(styles.item)}>
                              <div className={css(styles.itemName)}>
                                  {upperFirst(this.state.item.name)}
                              </div>
                              <div
                                  className={css(styles.itemImageBigContainer)}
                              >
                                  <div
                                      className={css(styles.itemImageBig)}
                                      style={{
                                          backgroundImage: `url(${this.state
                                              .item.image})`
                                      }}
                                  />
                              </div>
                              <div className={css(styles.itemDescription)}>
                                  {upperFirst(this.state.item.description)}
                              </div>
                          </div>
                        : <div>Seleziona un oggetto</div>}
                </div>
            </div>
        )
    }
}

export default InventoryUI
