import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';

type Session = {
    user: User
    accessToken: string
}

const AuthContext = createContext<{
    signIn: (handle: string) => void
    signOut: () => void
    session?: Session | null
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false
})

export const AuthProvider = ({children}: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>()
    const [isLoading, setisLoading] = useState(true)

    useEffect(()=>{
        loadSession()
    },[])

    const signIn = (handle: string) => {
        const session: Session = {
            user: {
                id: '1',
                handle,
                name: 'Yash',
                avatar: ''
            },
            accessToken: 'accessToken'
        }
        setSession(session)
        saveSession(session)
    }
    const signOut = () => {
        setSession(null)
        saveSession(null)
    }

    const saveSession = async (value: Session | null) => {
        if (value){
            await SecureStore.setItemAsync('session', JSON.stringify(value))
        } else {
            await SecureStore.deleteItemAsync('session')
        }

    }

    const loadSession = async () => {
        const session = await SecureStore.getItemAsync('session')
        if (session) {
            setSession(JSON.parse(session))
        } else {
            setSession(null)
        }

        setisLoading(false)
    }

    return (
        <AuthContext.Provider value={{ isLoading, signIn, signOut, session }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)