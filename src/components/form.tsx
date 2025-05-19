'use client'

import Cookies from 'js-cookie'
import InputHostname from "@/components/input-hostname"

export default function Form({
    children,
    action,
    ...rest
}: {
    action: string
    children: React.ReactNode
    className?: string
}) {
    const handleSubmit = (d: FormData) => {
        const data = Object.fromEntries(d)
        fetch(action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                contentType: 'application/json',
                authorization: `JWT ${Cookies.get('token')}`,
            }
        }).then(xhr => {
            if (xhr.ok) xhr.json().then(json => {
                console.log(json)
            })
        })
    }
    return <form {...rest} onSubmit={e => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget))
    }}>
        <InputHostname />
        {children}
    </form>
}