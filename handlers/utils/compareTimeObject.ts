export const compareTimeObject = (hour1, minute1, hour2, minute2, greaterThan=false) => {
    if (greaterThan) {
        const date1 = new Date(2000, 1, 1, hour1, minute1)
        const date2 = new Date(2000, 1, 1, hour2, minute2)
        const t1 = date1.getTime();
        const t2 = date2.getTime();
        return t1 > t2
        // return date1.getTime() > date2.getTime()
    }
    return hour1 === hour2 && minute1 === minute2
}
