'use strict';

import { connectToDatabase } from '../../db';
const { Professional } = require('../../db/models');

export const get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Professional.findById(event.pathParameters.id)
        .then(professional => callback(null, {
          statusCode: 200,
          body: JSON.stringify(professional),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'Could not fetch the professional.', err})
        }));
    });
};
