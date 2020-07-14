import {compareTimeObject} from './compareTimeObject';

export const splitAvailability = (schedule: {to: string, from: string}) => {
    const [initH, initM] = schedule.from.split(':');
    const [endH, endM, endHour=Number(endH), endMinute=Number(endM)] = schedule.to.split(':');

    let initMinute = Number(initM)
    let initHour=Number(initH)

    const availabilityArray = [{hour: initHour, minute: initMinute}];
    while (!compareTimeObject(initHour, initMinute, endHour, endMinute, true)){
        initMinute += 30
        if (initMinute >= 60) {
            initHour++;
            initMinute -= 60
        }
        availabilityArray.push({hour: initHour, minute: initMinute})
    }

    return availabilityArray.slice(0, availabilityArray.length-2);
}
