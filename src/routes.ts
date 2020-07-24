import * as express from 'express'
import * as Controller from './controller'
import * as StatsController from './stats-controller'

const routes = (router: express.Application): void => {

    router.use('/image', Controller.processImage);

    router.use('/stats', Controller.statsRequest);

    // All other routes should 404
    router.route('/*')
        .get((request: express.Request, response: express.Response) => {
            response.send("Incomplete Request. Please include images details to process")
        });
};

export default routes