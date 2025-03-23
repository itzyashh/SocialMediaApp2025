import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'

const ProfileScreen = () => {

  const {signOut} = useAuth()

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  )
}

export default ProfileScreen