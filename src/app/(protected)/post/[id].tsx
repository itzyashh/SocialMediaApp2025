import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const PostDetails = () => {
    const {id} = useLocalSearchParams()
    console.log(id,'id')
  return (
    <View>
      <Text>PostDetails</Text>
    </View>
  )
}

export default PostDetails