'use strict';

// import { connectToDatabase } from '../../db';
const {connectToDatabase } = require('../../db')
const { Slot } = require('../../db/models');


const list = (event, context, callback) => {
    // TODO: add pagination
    // TODO: add filters
    // TODO: add query by professional
    context.callbackWaitsForEmptyEventLoop = false;

  const {page=0, limit=10, skip=page*limit, lm=+limit} = { ...event.queryStringParameters }
  const {professionalId='', weekday='', month=''} = { ...event.queryStringParameters }

    const query = {
      ...professionalId && {professionalId},
      ...weekday && {weekday},
      ...month && {month}
    };

    connectToDatabase()
        .then(() => {
            Slot.find(query).limit(lm).skip(skip).sort({timeSorter: 1})
                .then(fractures => {
                    const response = {
                        page,
                        perPage: limit,
                        data: fractures
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
                    body: JSON.stringify({msg:'Could not fetch the slots.', err})
                }))
        });
};

module.exports = {
    list
};
