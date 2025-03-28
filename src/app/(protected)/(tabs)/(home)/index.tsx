import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, Text, View } from 'react-native';
import PostItem from '@/components/PostItem';
import dummyPosts from '@/dummyData';
import { useAuth } from '@/providers/AuthProvider';
import { Entypo } from '@expo/vector-icons'
import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';



export default function App() {

  const { signOut, session } = useAuth()
  console.log('session::: ', session?.accessToken);
  const [posts, setPosts] = useState<Post[]>([])

  

  const {data} = useQuery({
    queryKey: ['test'],
    queryFn: () => {
      return 'hello world'
    }
  })

  console.log(data,'data')

  const getPosts = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/posts',{

      });
      console.log('res::: ', res);
      
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // You could add additional error handling here if needed
    }
  }

  useEffect(()=>{
    getPosts()
  },[])

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id.toString()}
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


