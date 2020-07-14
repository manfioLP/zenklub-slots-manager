'use strict';

import { connectToDatabase } from '../../db';
const { Professional } = require('../../db/models');


const list = (event, context, callback) => {
  // todo: add filters
  context.callbackWaitsForEmptyEventLoop = false;

  const {page=0, limit=10, skip=page*limit, lm=+limit} = { ...event.queryStringParameters }

  connectToDatabase()
    .then(() => {
      Professional.find().limit(lm).skip(skip)
        .then(professional => {
          const response = {
            page,
            perPage: limit,
            data: professional
          }
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(response),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }
          })
        })
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'Could not fetch the professional.', err})
        }))
    });
};

module.exports = {
  list
};
