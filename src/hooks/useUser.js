import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useUser() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useUser must be defined')
    return context.user
}