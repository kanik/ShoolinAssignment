import { useState, useEffect } from 'react'
import axios from 'axios'


export function useFetch(url: string) {
    const [state, setState] = useState<{ loading: boolean, error: boolean, data: any }>({
        loading: false,
        error: false,
        data: null
    })

    useEffect(() => {
        (async () => {
            try {
                setState({ ...state, loading: true })
                const data = (await axios(url)).data;
                setState({ ...state, loading: false, data })
            } catch (_) {
                setState({ ...state, loading: false, error: true })
            }
        })()
    }, [url])

    return { ...state }
}