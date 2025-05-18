/**
 * Generates a calendar structure for an entire year, organized by months.
 *
 * Each month is represented as an array of day objects, where each day object contains:
 * - `date`: The date string in 'en-CA' format (YYYY-MM-DD).
 * - `isCurrentMonth` (optional): Indicates if the day belongs to the current month.
 * - `isToday` (optional): Indicates if the day is today.
 * - `isSelected` (optional): Indicates if the day is the first day of the month (selected by default).
 *
 * The returned structure includes leading and trailing days from adjacent months to fill out complete weeks.
 *
 * @param year - The year for which to build the calendar (e.g., 2024).
 * @returns An array of 12 months, each being an array of day objects representing the calendar grid for that month.
 */
export function buildYear(year: number) {
    const months = [];
    for (let m = 0; m < 12; m++) {
        const monthDate = new Date(year, m, 1);
        let monthDays: any[] = [];
        // Use a local version of buildMonth that pushes to monthDays instead of setDays
        let days = [];

        const firstDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const firstDayWeekday = firstDayOfMonth.getDay();
        const offset = firstDayWeekday;
        const lastDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

        for (let i = offset - 1; i >= 0; i--) {
            const d = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1 - i - 1);
            days.push({ date: new Intl.DateTimeFormat('en-CA', {}).format(d) });
        }

        for (let d = 1; d <= lastDayOfMonth; d++) {
            const dateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
            
            const dateStr = new Intl.DateTimeFormat('en-CA', {}).format(dateObj);
            days.push({
                date: dateStr,
                isCurrentMonth: true,
                isToday: dateStr === new Intl.DateTimeFormat('en-CA', {}).format(d),
                isSelected: false,
            });
        }

        const total = days.length;
        const nextDays = (7 - (total % 7)) % 7;
        for (let i = 1; i <= nextDays; i++) {
            const d = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, i);
            days.push({ date: new Intl.DateTimeFormat('en-CA', {}).format(d) });
        }

        const selectedStr = new Intl.DateTimeFormat('en-CA', {}).format(monthDate);
        days.forEach((day) => {
            if (day.date === selectedStr) {
                day.isSelected = true;
            }
        });
        months.push(days);
    }
    return months;
}