import { Stack, Link } from 'expo-router';

import { StyleSheet, View } from 'react-native';


import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import FeedItem from '@/components/FeedItem';



export default function Home() {
  return (
    
      <View style={styles.container}>
    
      <Stack.Screen options={{ title: 'Home' }} />

        <FeedItem />

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

