import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, Text, View } from 'react-native';
import PostItem from '@/components/PostItem';
import dummyPosts from '@/dummyData';
import { Link } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';



export default function App() {

  const {signOut} = useAuth()

  return (
     <FlatList
        data={dummyPosts}
        renderItem={({item})=> <PostItem post={item} />}
        keyExtractor={item=> item.id.toString()}
        ListFooterComponent={()=> <Button title='Sign Out' onPress={signOut} /> }
        />

  );
}


