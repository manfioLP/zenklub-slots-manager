'use strict'

import { connectToDatabase } from '../../db';
import { Professional } from '../../db/models'

export const update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      const {specialties, ...updateBody} = JSON.parse(event.body);
      console.log(updateBody)

      if (specialties) {
        updateBody['$push'] = { specialties: { $each: specialties } }
        delete updateBody.specialties
      }
      console.log(updateBody)



      Professional.findByIdAndUpdate(event.pathParameters.id, updateBody,
        { new: true, runValidators: true })
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
          body: JSON.stringify({msg:'Could not fetch the professional for update.', err})
        }));
    });
};
