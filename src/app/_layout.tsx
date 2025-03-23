import { View, Text } from 'react-native'
import React from 'react'
import "../../global.css"
import { Stack } from 'expo-router'
import {DefaultTheme, ThemeProvider} from '@react-navigation/native'
import { AuthProvider } from '@/providers/AuthProvider'

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#0A0A0A'
  }
}

const RootLayout = () => {
  return (
    <AuthProvider>
    <ThemeProvider value={CustomTheme}>
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Feed"}} /> 
      <Stack.Screen name="post/[id]" options={{ headerTitle: "Post Details"}} /> 
    </Stack>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default RootLayout