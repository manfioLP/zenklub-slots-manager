'use strict'

import { connectToDatabase } from '../../db';
import { Slot } from '../../db/models';

module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    // retrieve professionalId
    // prepare identifier - hour+minute + '-' + professionalId

    // get identifier
    // verify if exists

    // verify previous and next availability

    // set book

    connectToDatabase()
        .then(() => {
            Slot.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body),
                { new: true, runValidators: true })
                .then(fracture => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(fracture),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    }
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify({msg:'Could not fetch the fracture for update.', err})
                }));
        });
};
