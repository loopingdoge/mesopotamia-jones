import * as Phaser from 'phaser-ce'
import * as WebFont from 'webfontloader'

import * as loaderBar from '../../../assets/images/loader-bar.png'
import * as loaderBackground from '../../../assets/images/loader-bg.png'

export default class Boot extends Phaser.State {
    fontsReady: boolean

    init() {
        this.stage.backgroundColor = '#444'
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    }

    preload() {
        WebFont.load({
            google: {
                families: ['Arvo', 'Bangers']
            },
            active: this.fontsLoaded
        })

        const text = this.add.text(
            this.world.centerX,
            this.world.centerY,
            'loading fonts',
            { font: '16px Arial', fill: '#dddddd', align: 'center' }
        )
        text.anchor.setTo(0.5, 0.5)

        this.load.image('loaderBg', loaderBackground)
        this.load.image('loaderBar', loaderBar)
    }

    render() {
        if (this.fontsReady) {
            this.state.start('Splash')
        }
    }

    fontsLoaded() {
        this.fontsReady = true
    }
}
