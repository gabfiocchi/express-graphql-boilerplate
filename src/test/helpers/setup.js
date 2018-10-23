const bodyParser = require('body-parser');
const express = require('express');
const { graphqlExpress } = require('apollo-server-express');
const database = require('../../config/database');
const auth = require('../../api/policies/auth.policy');
const { schema } = require('../../api/graphql');
const routes = require('../../api/routes');

process.env.NODE_ENV = 'testing';

const beforeAction = async () => {
  const testapp = express();

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  // public REST API
  testapp.use('/api', routes);

  // private GraphQL API
  testapp.all('/graphql', (req, res, next) => auth(req, res, next));
  testapp.get('/graphql', graphqlExpress({
    schema,
    pretty: true,
    graphiql: false,
  }));
  testapp.post('/graphql', graphqlExpress({
    schema,
    pretty: true,
    graphiql: false,
  }));

  await database.authenticate();
  await database.drop();
  await database.sync();

  console.log('Connection to the database has been established successfully');

  return testapp;
};

const afterAction = async () => {
  await database.close();
};


module.exports = {
  beforeAction,
  afterAction,
};
