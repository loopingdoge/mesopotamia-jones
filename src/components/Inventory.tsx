import { css, StyleSheet } from 'aphrodite'
import { upperFirst } from 'lodash'
import * as React from 'react'

import { Inventory, Item } from '../config/inventory'

import { arvo } from '../utils/fonts'

const styles = StyleSheet.create({
    inventory: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: [arvo, 'sans-serif']
    },
    inventoryTab: {
        padding: '20px'
    },
    itemList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflowY: 'scroll'
    },
    itemContainer: {
        marginRight: '20px',
        ':last-child': {
            marginRight: '0px'
        },
        cursor: 'pointer'
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
        width: 100,
        height: 100
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
        marginTop: '24px'
    },
    selectedItemContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
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
            <div className={css(styles.inventory, styles.inventoryTab)}>
                <div className={css(styles.itemList)}>
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
