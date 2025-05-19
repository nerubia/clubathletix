import crypto from 'crypto';

/**
 * Hashes the input string into a 14-character password.
 * @param input The input string to hash.
 * @returns A 14-character hashed password.
 */
export function hashToPassword(input: string): string {
    const hash = crypto.createHash('sha256').update(input + process.env.SALT_TOKEN).digest('base64');
    // Remove non-alphanumeric characters and trim to 14 chars
    const password = hash.replace(/[^a-zA-Z0-9]/g, '').slice(0, 14);
    return password;
}

/**
 * Hashes the input string into a 14-character password.
 * @param input The input string to hash.
 * @returns A 14-character hashed password.
 */
export function hashEmail(input: string): string {
    const hash = crypto.createHash('sha256').update(input + process.env.SALT_TOKEN).digest('base64');
    // Remove non-alphanumeric characters and trim to 29 chars
    const results = hash.replace(/[^a-zA-Z0-9]/g, '').slice(0, 29);
    return results;
}