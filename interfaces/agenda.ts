export interface Agenda {
    weekday: string,
    month: string,
    year: string,
    availability: {
        from: string,
        to: string
    }
}
