/**
 * Submits a request to the Slack Web API.
 *
 * @param api - The Slack API method to call (e.g., 'reactions.add').
 * @param payload - Optional payload to include in the request body as a JSON object.
 * @returns A promise that resolves to the JSON response from the Slack API.
 * @throws Will throw an error if the HTTP response is not successful.
 *
 * @example
 * ```typescript
 * await submitSlackRequest('reactions.add', { channel: 'C123', name: 'thumbsup', timestamp: '1234567890.123456' });
 * ```
 */
export async function submitSlackRequest(api: 'reactions.add' | 'chat.postMessage', payload?: Record<string, string | number | boolean>) {
    const response = await fetch(`https://slack.com/api/${api}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        },
        body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) {
        console.log(`Failed to submit Slack request: ${response.statusText}`)
        throw new Error(`Failed to submit Slack request: ${response.statusText}`);
    }

    return await response.json(); 
}