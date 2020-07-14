'use strict';
import { connectToDatabase } from '../../db';
import { splitAvailability } from '../utils/splitAvailability'
import { Agenda } from '../../interfaces/agenda';
const { Slot } = require('../../db/models');

export const create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const promises = [];

    // todo: extract professional id from params
    const { professionalId } = event.pathParameters;
    const { agenda } : {agenda: [Agenda]} = JSON.parse(event.body);

    for (const day of agenda) {
        const slotToCreate = splitAvailability(day.availability)
        for (const slot of slotToCreate) {
            const slotBody = {
                weekday: day.weekday,
                day: day.day,
                month: day.month,
                year: day.year,
                professionalId,
                hour: slot.hour,
                minutes: slot.minute || '00',
            };

            promises.push(Slot.create(slotBody))
        }
    }

    // todo: connect to db and await promises
    connectToDatabase()
        .then(() => {
            Promise.all(promises)
                .then(slots => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(slots),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    }
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify({msg:'Could not create the Slots for the agenda.', err})
                }));
        }).catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({msg:'Unexpected database error on creating the Slots for the agenda.', err})
        }));
};
