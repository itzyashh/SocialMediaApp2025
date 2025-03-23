import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

const ProtectedLayout = () => {

  const {session, isLoading} = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!session) {
  return <Redirect href={'/sign-in'} /> 
  }

  return (
    <Slot />
  )
}

export default ProtectedLayout