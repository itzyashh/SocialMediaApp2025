import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'

const SignIn = () => {

    const {signIn} = useAuth()

    const [username, setUsername] = useState<string>('')
    console.log(username.length)

    const handleSignIn = () => {
        console.log('button', username)
        signIn(username)
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
       <Button disabled={username.length === 0}
        title='Sign In' onPress={handleSignIn}/>
    
    </View>
  )
}

export default SignIn