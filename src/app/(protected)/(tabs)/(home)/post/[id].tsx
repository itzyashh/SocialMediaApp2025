import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import dummyPosts from '@/dummyData'
import PostItem from '@/components/PostItem'

const PostDetails = () => {
    const {id} = useLocalSearchParams()
    const post = dummyPosts.find(p => p.id.toString() === id)

    if (!post) return

  return (
    <PostItem post={post} />
  )
}

export default PostDetails