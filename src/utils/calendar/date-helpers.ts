export function isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function stringToUTC(d: string) {
    return `${d}T${new Date().getUTCHours()}:${`0${new Date().getUTCMinutes()}`.slice(-2)}:00`
}