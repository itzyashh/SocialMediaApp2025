import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import AxiosIntance from '@/utils/AxiosIntance'
import { useMutation } from '@tanstack/react-query'
import { signInRequest } from '@/sevices/authService'

const SignIn = () => {

    const {signIn} = useAuth()

    const [username, setUsername] = useState<string>('itzyashh')
    const [password, setPassword] = useState<string>('yash@123')
    console.log(username.length)

    const {mutate, error, isPending} = useMutation({
      mutationFn: ({username, password}: {username: string, password: string}) => signInRequest(username, password),
      onSuccess: signIn
    })

    const handleSignIn = async () => {  
      mutate({username, password})
    }

    if (isPending) {
      <ActivityIndicator size={'large'} color={'#000'} />
    }

  return (
    <View className='flex-1 justify-center items-center gap-4'>
      <Text className='text-3xl'>Sign In</Text>
      <TextInput
      placeholder='username'
      className='border w-[80%] rounded-md px-2'
      value={username}
      onChangeText={setUsername}
       />
      <TextInput
      placeholder='password'
      className='border w-[80%] rounded-md px-2'
      value={password}
      onChangeText={setPassword}
      secureTextEntry
       />
       <Button disabled={username.length === 0 || password.length === 0}
        title='Sign In' onPress={handleSignIn}/>
    
    </View>
  )
}

export default SignIn