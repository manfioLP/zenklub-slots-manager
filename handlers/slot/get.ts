'use strict';

import { connectToDatabase } from '../../db';
const { Slot } = require('../../db/models');

export const get = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Slot.findById(event.pathParameters.id)
                .then(slot => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(slot),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    }
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify({msg:'Could not fetch the slot.', err})
                }));
        });
};
