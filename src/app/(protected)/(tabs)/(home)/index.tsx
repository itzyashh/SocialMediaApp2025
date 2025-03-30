import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, Pressable, Text, View } from 'react-native';
import PostItem from '@/components/PostItem';
import dummyPosts from '@/dummyData';
import { useAuth } from '@/providers/AuthProvider';
import { Entypo } from '@expo/vector-icons'
import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/sevices/postService';



export default function App() {

  const { signOut, session } = useAuth()
 

  const {data: posts, isLoading, error, refetch, isRefetching} = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  })


  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  if (error) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }



  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id.toString()}
        refreshing={isRefetching}
        onRefresh={refetch}
      />

      <Link asChild href="/new">
        <Pressable className='absolute right-5 bottom-5
        h-14 w-14 shadow-lg bg-[#3296e2] rounded-full items-center justify-center'>
          <Entypo name='plus' size={30} color={'#fff'} />
        </Pressable>
      </Link>
    </>
  );
}


