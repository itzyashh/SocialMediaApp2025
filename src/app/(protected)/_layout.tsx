import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

const ProtectedLayout = () => {

  const { session, isLoading } = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{
        headerTitle: 'Create post',
        animation: 'slide_from_bottom',
        presentation: 'modal'
      }} />
    </Stack>
  )
}

export default ProtectedLayout