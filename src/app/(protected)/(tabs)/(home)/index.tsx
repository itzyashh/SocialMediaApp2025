import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, Text, View } from 'react-native';
import PostItem from '@/components/PostItem';
import dummyPosts from '@/dummyData';
import { useAuth } from '@/providers/AuthProvider';
import { Entypo } from '@expo/vector-icons'
import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function App() {

  const { signOut } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])

  const callHello = async () => {
    await axios.get('http://localhost:8081/hello')
      .then(res => console.log('res at call fn in client', res.data))
      .catch(e => console.log('err at callhelo', e));
  }

  const getPosts = async () => {
    const res = await axios.get('http://localhost:8081/api/posts')
    setPosts(res.data.posts)
  }

  useEffect(()=>{
    callHello()
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


