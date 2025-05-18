import { formatDate } from "./date-formatter";

/**
 * Determines if a given date is within a specified date range (inclusive).
 *
 * The comparison is performed using the 'en-CA' locale date format (YYYY-MM-DD),
 * which ensures that only the date part is considered (ignoring time).
 *
 * @param dt - The date to check.
 * @param range - An object containing the start (`from`) and end (`to`) dates of the range.
 * @returns `true` if `dt` is within the range (inclusive), otherwise `false`.
 */
export function withinRange(
    dt: Date,
    range: { from: Date; to?: Date }
): boolean {
    const dtStr = formatDate(dt);
    const fromStr = formatDate(range.from);

    if (range.to) {
        const toStr = formatDate(range.to);
        return fromStr <= dtStr && dtStr <= toStr;
    }

    return fromStr <= dtStr;
}
