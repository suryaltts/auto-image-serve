import express from 'express'
const fs = require('fs')
import Jimp from 'jimp'
import * as StatsController from './stats-controller'

const process_image = (request: express.Request, response: express.Response) => {

    let height = 1080 // Default value set as 1080
    let width = 1920 // Default value set as 1920
    

    if (request.path == "/") {
        response.send("Incomplete Request. Please include images details to process")
        return
    }

    if (request.query.size) {
        const _res = (request.query.size as string).split("x")
        height = parseInt(_res[0])
        width = parseInt(_res[1])
    }

    const _fileext = (request.path as string).split('.')
    const _filename = _fileext[0].replace(/\//g, '-').substr(1) + '-' +height + 'x' + width + '.' + _fileext[1]

    try {
        if (fs.existsSync('build/assets/processed/' + _filename)) {
            console.log("Available in Cache => Serving from Cache" + __dirname)
            response.setHeader('Cache-Control', 'public, max-age=120000') // Expires in 2 Minutes
            response.setHeader('Expires', new Date(Date.now() + 120000).toUTCString()) // Expires in 2 Minutes
            const _dirPath = __dirname.replace("src","build")
            StatsController.updateCacheRequest()
            return response.sendFile('/assets/processed/' + _filename, { root: _dirPath })
        }
    } catch(err) {
        console.warn(err)
    }

    Jimp.read('build/assets/image' + request.path)
    .then(img => {
        return img
        .resize(width, height) // resize
        .writeAsync('build/assets/processed/' + _filename)
    })
    .then(() => {
        response.setHeader('Cache-Control', 'public, max-age=120000')
        response.setHeader('Expires', new Date(Date.now() + 120000).toUTCString())
        const _dirPath = __dirname.replace("src","build")
        StatsController.updateNewRequest()
        return response.sendFile('/assets/processed/' + _filename, { root: _dirPath })
    })
    .catch(err => {
        console.warn(err)
        response.sendStatus(404)
    })
}

export default process_image