import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import PostItem from '@/components/PostItem';
import dummyPosts from '@/dummyData';



export default function App() {
  return (
    <View style={styles.container}>
      <PostItem post={dummyPosts[0]} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
});
