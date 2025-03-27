import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'

const SignUp = () => {
    const { signUp } = useAuth()

    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignUp = async () => {
        try {
            setLoading(true)
            await signUp({ name, username, password })
            router.replace('/(tabs)/')
        } catch (error) {
            console.log('Sign up error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='flex-1 justify-center items-center gap-4'>
            <Text className='text-3xl'>Sign Up</Text>
            
            <TextInput
                placeholder='Full Name'
                className='border w-[80%] rounded-md px-2 py-2'
                value={name}
                onChangeText={setName}
            />
            
            <TextInput
                placeholder='Username'
                className='border w-[80%] rounded-md px-2 py-2'
                value={username}
                onChangeText={setUsername}
            />
            
            <TextInput
                placeholder='Password'
                className='border w-[80%] rounded-md px-2 py-2'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <Button 
                disabled={name.length === 0 || username.length === 0 || password.length === 0 || loading}
                title={loading ? 'Creating account...' : 'Sign Up'} 
                onPress={handleSignUp}
            />
            
            <Text className='text-blue-500' onPress={() => router.replace('/sign-in')}>
                Already have an account? Sign In
            </Text>
        </View>
    )
}

export default SignUp