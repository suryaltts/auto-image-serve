import express from 'express'
import * as AppConfig from './configs'

import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes';
import * as Controller from './controller'

import handleFileUpdates from './file-controller'
import * as StatsController from './stats-controller'

StatsController.init_stats()

const server = express()

server.use(compression());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.set('port', AppConfig.SERVER_LISTEN_PORT);

routes(server)

handleFileUpdates()

StatsController.store_stats("up_since", new Date().toString())

server.listen(AppConfig.SERVER_LISTEN_PORT, () => {
  console.warn(`server is listening on ${AppConfig.SERVER_LISTEN_PORT}`)
})


export default server;