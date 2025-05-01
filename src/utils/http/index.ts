export async function getApiRequest(url: string, filters: { [k: string]: unknown }) {
    let params = Object.keys(filters).map(f => `${f}=${filters[f]}`).join('&')
    params = params ? `?${params}` : ''
    const xhr = await fetch(url + params, {
        headers: {
            contentType: 'application/json'
        }
    })

    if (xhr.ok) return await xhr.json()
}
export async function postApiRequest(url: string, body: { [k: string]: unknown }) {
    const xhr = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            contentType: 'application/json'
        }
    })

    if (xhr.ok) return await xhr.json()
}