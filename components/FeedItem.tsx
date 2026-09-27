import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Post from '@/types/post'

type FeedItemProps = {
    post: Post
}

const FeedItem:FC<FeedItemProps> = ({ post }) => {
  return <View></View>
}

export default FeedItem