/**
 * Formats a given Date object into a string using the 'en-CA' locale (YYYY-MM-DD format).
 *
 * @param date - The Date object to format.
 * @returns The formatted date string in 'YYYY-MM-DD' format.
 */
export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-CA').format(date)
}

/**
 * Returns the full name of the day of the week for a given Date object.
 *
 * @param date - The Date object to get the day of the week from.
 * @returns The full name of the day (e.g., 'Monday').
 */
export function getDayOfWeek(date: Date): string {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

export function getMonthName(date: Date): string {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
}