import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthContextType } from '../types/auth'

export const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({ children }: { children: ReactNode }) {
    
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    function login(email: string, _password: string) {

        const fakeUser: User = {
            id:1,
            name: 'Christopher',
            email: email,
        }
        setUser(fakeUser)
        localStorage.setItem('user', JSON.stringify(fakeUser))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}