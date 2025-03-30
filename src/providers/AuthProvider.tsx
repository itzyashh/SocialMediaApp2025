import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import AxiosIntance from "@/utils/AxiosIntance";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInRequest } from "@/sevices/authService";

type Session = {
    user: User
    accessToken: string
}

const AuthContext = createContext<{
    signIn: (user: any) => void
    signUp: ({name, username, password}: {name: string, username: string, password: string}) => void
    signOut: () => void
    session?: Session | null
    isLoading: boolean
}>({
    signIn: () => null,
    signUp: () => null,
    signOut: () => null,
    session: null,
    isLoading: false
})

export const AuthProvider = ({children}: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>()
    const [isLoading, setisLoading] = useState(true)
    const queryClient = useQueryClient()

    useEffect(()=>{
        loadSession()
    },[])

    const signIn = (user: any) => {
        AxiosIntance.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`
        const session: Session = {
            user,
            accessToken: user.accessToken
        }
        setSession(session)
        saveSession(session)
    }

    const signUp = async ({name, username, password}: {name: string, username: string, password: string}) => {
        const session: Session = {
            user: {
                id: '1',
                username,
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
        queryClient.clear()
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
        AxiosIntance.defaults.headers.common['Authorization'] = session ? `Bearer ${JSON.parse(session).accessToken}` : ''
        if (session) {
            setSession(JSON.parse(session))
        } else {
            setSession(null)
        }

        setisLoading(false)
    }

    return (
        <AuthContext.Provider value={{ isLoading, signIn, signOut, session, signUp }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)