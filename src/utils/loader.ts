import * as preloadJS from 'preload-js'

import * as BlocksVideo from '../../assets/tutorials/blocks.webm'

function load() {
    return new Promise((resolve, reject) => {
        const manifest = new preloadJS.LoadQueue()
        manifest.loadFile('preload-files.json')
        manifest.on('fileload', (manifestEvent: any) => {
            const queue = new preloadJS.LoadQueue()
            queue.addEventListener('complete', (completeEvent: any) => {
                resolve()
            })
            const manifestResult = manifestEvent.result
            const filepaths = Object.keys(manifestResult).map(
                key => manifestResult[key]
            )
            queue.loadManifest(filepaths)
        })
    })
}

export default load
