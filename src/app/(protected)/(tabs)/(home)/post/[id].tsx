import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import dummyPosts from '@/dummyData'
import PostItem from '@/components/PostItem'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '@/sevices/postService'

const PostDetails = () => {
  const { id } = useLocalSearchParams<{id: string}>()

  const { data: post, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id)
  })

  if (!post) return

  if (isLoading) {
    return <ActivityIndicator size={'large'} />
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}    >
      <PostItem post={post} />
    </ScrollView>
  )
}

export default PostDetails