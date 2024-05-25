import { useEffect, useState } from 'react'

const useLocalStorage = (key) => {
    const [data, setData] = useState(() => {
        let item = localStorage.getItem(key)
        return item === null ? '' : item
    })

    useEffect(() => {
        const handleStorageChange = () => {
            let item = localStorage.getItem(key)
            setData(item === null ? '' : item)
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [key])

    return [data, setData]
}

export default useLocalStorage
