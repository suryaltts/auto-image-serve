const fs = require('fs')
import chokidar from 'chokidar';

import * as StatsController from './stats-controller'

const handleFileUpdates = () => {
    
    // Initialize watcher.
    const watcher = chokidar.watch('src/assets/', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
    });

    _updateFileStats()

    watcher
    .on('add', path => {
        const _destPath = path.replace("src", "build")
        const inStr = fs.createReadStream(path);
        const outStr = fs.createWriteStream(_destPath);
        inStr.pipe(outStr);
    })
    .on('change', path => {
        const _destPath = path.replace("src", "build")
        const inStr = fs.createReadStream(path);
        const outStr = fs.createWriteStream(_destPath);
        inStr.pipe(outStr);
    })
    .on('unlink', path => {
        const _destPath = path.replace("src", "build")
        fs.unlink(_destPath, () => {
            console.log("Error deleting the Files")
        })
    });
}

const _updateFileStats = () => {
    fs.readdir('build/assets/image', (err: any, files: any) => {
        const _fileCount = files ? files.length : 0
        StatsController.updateRawImageCount(_fileCount)
    });
    fs.readdir('build/assets/processed', (err: any, files: any) => {
        const _fileCount = files ? files.length : 0
        StatsController.updateProcessedImageCount(_fileCount)
    });
}

export default handleFileUpdates
