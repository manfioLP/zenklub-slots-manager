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

    connectToDatabase()
        .then(() => {
            Slot.find().limit(lm).skip(skip)
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
