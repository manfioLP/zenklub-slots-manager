export const compareTimeObject = (hour1, minute1, hour2, minute2, greaterThan=false) => {
    if (greaterThan) {
        const date1 = new Date(1, 1, 1, hour1, minute1)
        const date2 = new Date(1, 1, 1, hour2, minute2)
        return date1.getTime() > date2.getTime()
    }
    return hour1 === hour2 && minute1 === minute2
}