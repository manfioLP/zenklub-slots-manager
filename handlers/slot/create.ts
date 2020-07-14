'use strict';

import { connectToDatabase } from '../../db';
// const {Slot} = require('../../db/models');
import { Slot } from '../../db/models'

export const create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Slot.create(JSON.parse(event.body))
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
                    body: JSON.stringify({msg:'Could not create the Slot.', err})
                }));
        });
};
