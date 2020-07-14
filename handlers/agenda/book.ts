'use strict'

import { connectToDatabase } from '../../db';
import { getAroundSlotTime } from '../utils/getAroundSlotTime'
import { Slot } from '../../db/models';

export const book = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { timeId, professionalId } :
      { timeId: string, professionalId: string} = event.pathParameters;
    const { bookerName } : { bookerName: string } = JSON.parse(event.body);

    const times = timeId.split('-')
    const [h, m, hour=Number(h), minute=Number(m)] = times.slice(-2);
    const {nextHour, nextMinute, previousHour, previousMinute} = getAroundSlotTime(hour, minute);
    const baseTimeId = times.slice(0,3).join('-');

    connectToDatabase()
        .then(async () => {
            const [previousSlot, slot, nextSlot] = await Slot.find(
              {identifier: {
                $in: [
                  `${baseTimeId}-${previousHour}-${previousMinute}#${professionalId}`,
                  `${timeId}#${professionalId}`,
                  `${baseTimeId}-${nextHour}-${nextMinute}#${professionalId}`
                ]}
              })
              .sort({timeSorter: 1});
            let updatedSlot;
            console.log(previousSlot, nextSlot)
            if (!slot) {
              throw JSON.stringify({
                msg:`Couldn\'t book the slot because the informed timeId or professionalId doesn't exist.`,
                values: {timeId, professionalId}})
            } else if (slot.previousAvailable && slot.nextAvailable && !slot.booked) {
              if (!nextSlot) {
                throw JSON.stringify({
                  msg:`Couldn\'t book the slot because the desired time and the last slot time are the same, since the sessions are 1 hour long you need to book at least 30 minutes before the last session`,
                  values: {desiredTime: `${hour}:${minute}`, lastTime: `${slot.hour}:${slot.minutes}`}
                })
              }
              if (nextSlot.booked || previousSlot.booked) {
                throw JSON.stringify({
                  msg: `Couldnt book the slot because the this slot belongs to a booked session`,
                  values: {
                    bookedConflict: nextSlot.booked ?
                      `${nextSlot.hour}:${nextSlot.minutes}` :
                      `${previousSlot.hour}:${previousSlot.minutes}`
                  }
                })
              }

              const updateBody = { previousAvailable: false, nextAvailable: false, booked: true, bookerName, professionalId };
              updatedSlot = await Slot.findByIdAndUpdate(
                slot._id, updateBody,
                { new: true, runValidators: true });
              return callback(null, {
                statusCode: 200,
                body: JSON.stringify(updatedSlot),
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                }
              })
            } else {
              // err not available
              throw JSON.stringify({msg:`Couldn\'t book the slot because it was booked already.`, values: {bookedFor: slot.bookerName}})
            }
        })
      .catch(err => {
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain' },
          body: err
        })
      });
};
