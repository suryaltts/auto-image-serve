import express from 'express'

import process_image from './image-controller'
import request_stats from './stats-controller'
import * as StatsController from './stats-controller'

export const processImage = async (request: express.Request, response: express.Response) => {
    StatsController.updateTotalRequest()
    return process_image(request, response)
}

export const statsRequest = async (request: express.Request, response: express.Response) => {
    StatsController.updateTotalRequest()
    return request_stats(request, response)
}
