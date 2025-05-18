import { withinRange } from "./range";


/**
 * Builds an array of day objects representing a calendar month view.
 * Each day object contains the date string and flags for current month, today, and selection.
 * @param month - A Date object representing any day in the target month.
 * @returns Array of day objects for the calendar grid.
 */
export function buildMonth(month: Date) {
    let days = [];
    const today = new Date();

    // Find the first day of the month
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    // Day of week for the first day (0=Sun, 1=Mon, ..., 6=Sat)
    const firstDayWeekday = firstDayOfMonth.getDay();
    // Offset for calendar grid (number of days from previous month to show)
    const offset = firstDayWeekday;

    // Find the last day (date number) of the month
    const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    // Fill in days from previous month to align first week
    for (let i = offset - 1; i >= 0; i--) {
        const d = new Date(month.getFullYear(), month.getMonth(), 1 - i - 1);
        days.push({ date: new Intl.DateTimeFormat('en-CA', {}).format(d) });
    }

    // Fill in days for the current month
    for (let d = 1; d <= lastDayOfMonth; d++) {
        const dateObj = new Date(month.getFullYear(), month.getMonth(), d);
        const dateStr = new Intl.DateTimeFormat('en-CA', {}).format(dateObj);

        days.push({
            date: dateStr,
            isCurrentMonth: dateStr.split('-')[1]! === new Intl.DateTimeFormat('en-CA', { month: '2-digit'}).format(today),
            isToday: dateStr === new Intl.DateTimeFormat('en-CA', {}).format(today),
            isSelected: false, // Will be set below if matches selected date
        });
    }

    // Fill in days from next month to complete the last week
    const total = days.length;
    const nextDays = (7 - (total % 7)) % 7;
    for (let i = 1; i <= nextDays; i++) {
        const d = new Date(month.getFullYear(), month.getMonth() + 1, i);
        days.push({ date: new Intl.DateTimeFormat('en-CA', {}).format(d) });
    }

    // // Mark the selected day (the passed-in month date)
    // const selectedStr = new Intl.DateTimeFormat('en-CA', {}).format(month);
    // days.forEach((day) => {
    //     if (day.date === selectedStr) {
    //         day.isSelected = true;
    //     }
    // });

    return days;
}