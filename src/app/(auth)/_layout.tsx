import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

const AuthLayout = () => {
    const {session, isLoading} = useAuth()
  
    if (isLoading) {
      return <ActivityIndicator />
    }
  
    if (session) {
    return <Redirect href={'/(protected)'} /> 
    }
  return (
    <Slot />
  )
}

export default AuthLayout