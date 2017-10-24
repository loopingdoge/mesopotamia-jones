import * as preloadJS from 'preload-js'

import * as BlocksVideo from '../../assets/tutorials/blocks.webm'

function load(onProgress: (progress: number) => any) {
    return new Promise((resolve, reject) => {
        onProgress(0)
        const manifest = new preloadJS.LoadQueue()
        manifest.loadFile('preload-files.json')
        manifest.on('fileload', (manifestEvent: any) => {
            let loadedCount = 0
            const queue = new preloadJS.LoadQueue()
            const manifestResult = manifestEvent.result
            const filepaths = Object.keys(manifestResult).map(
                key => manifestResult[key]
            )
            queue.on('complete', (completeEvent: any) => {
                resolve()
            })
            queue.on('fileload', () =>
                onProgress(Math.round(++loadedCount / filepaths.length * 100))
            )
            queue.loadManifest(filepaths)
        })
    })
}

export default load
