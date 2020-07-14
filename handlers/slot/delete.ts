'use strict'

import { connectToDatabase } from '../../db';
import { Slot } from '../../db/models'
// const { Slot } = require('../../db/models');

export const remove = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // TODO: verify how wil be the delete method
    // TODO: add rollback from delete

    connectToDatabase()
        .then(() => {
            Slot.findByIdAndRemove(event.pathParameters.id)
                .then(slot => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Removed slot with identifier: ' + slot._id, slot }),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    }
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify({msg:'Could not fetch the slot for deletion.', err})
                }));
        });
};
