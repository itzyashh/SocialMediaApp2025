import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, Text, View } from 'react-native';
import PostItem from '@/components/PostItem';
import dummyPosts from '@/dummyData';
import { useAuth } from '@/providers/AuthProvider';
import { Entypo } from '@expo/vector-icons'
import { Link } from 'expo-router';



export default function App() {

  const { signOut } = useAuth()

  return (
    <>
      <FlatList
        data={dummyPosts}
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


