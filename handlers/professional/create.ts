'use strict';

import { connectToDatabase } from '../../db';
import { Professional } from '../../db/models'

export const create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Professional.create(JSON.parse(event.body))
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
          body: JSON.stringify({msg:'Could not create the Professional.', err})
        }));
    });
};
