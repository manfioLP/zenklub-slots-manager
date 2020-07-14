export interface Agenda {
    weekday: string,
    day: string,
    month: string,
    year: string,
    availability: {
        from: string,
        to: string
    }
}
