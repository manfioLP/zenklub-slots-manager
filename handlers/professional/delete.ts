'use strict'

import { connectToDatabase } from '../../db';
import { Professional } from '../../db/models'

export const remove = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  // TODO: verify how wil be the delete method

  connectToDatabase()
    .then(() => {
      Professional.findByIdAndUpdate(event.pathParameters.id, {deleted: true})
        .then(professional => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed (deleted set to true) professional with identifier: ' + professional._id, professional }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'Could not fetch the professional for deletion.', err})
        }));
    });
};
