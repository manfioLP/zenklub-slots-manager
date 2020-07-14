export const getAroundSlotTime = (hour, minute) => {
  let nextHour;
  let nextMinute = minute +30
  if (nextMinute >= 60) {
    nextMinute -= 60
    nextHour = hour + 1
  } else {
    nextHour = hour
  }

  let previousHour;
  let previousMinute = minute - 30
  if (previousMinute <= 0) {
    previousMinute = previousMinute + 60 === 60 ? 0 : previousMinute + 60
    previousHour = previousMinute === 0 ? hour : hour - 1;
  } else {
    previousHour = hour
  }

  return {
    nextHour,
    previousHour,
    nextMinute: nextMinute == 0 ? '00' : nextMinute,
    previousMinute: previousMinute == 0 ? '00' : previousMinute
  }
}
