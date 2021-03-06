/**
 * third party libraries
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import helmet from 'helmet';
import http from 'http';
import expressPlayground from 'graphql-playground-middleware-express';
import routes from './routes';
import schema from './graphql';

/**
 * server configuration
 */
import config from '../config/';
import auth from './policies/auth.policy';
import dbService from './services/db.service';

// environment: development, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const api = express();
const server = http.Server(api);
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
api.use(bodyParser.urlencoded({
  extended: false,
}));
api.use(bodyParser.json());

// public REST API
api.use('/api', routes);

// private GraphQL API
api.all('/graphql', (req, res, next) => auth(req, res, next));
api.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  cacheControl: true,
}));

api.get('/explore', expressPlayground({
  endpoint: '/graphql',
}));

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`); // eslint-disable-line no-console
    process.exit(1);
  }
  return DB;
});
