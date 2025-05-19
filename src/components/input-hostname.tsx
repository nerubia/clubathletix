'use client'

import { useEffect, useState } from "react"

export default function InputHostname() {
    const [hostname, setHostname] = useState<string>()
    
    useEffect(() => {
        setHostname(`${location?.hostname}`)
    }, [])

    return <input type="hidden" name="hostname" defaultValue={hostname} />
}