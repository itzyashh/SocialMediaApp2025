import { View, Text } from 'react-native'
import React from 'react'
import "../../global.css"
import { Slot, Stack } from 'expo-router'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { AuthProvider } from '@/providers/AuthProvider'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'

const queryClient = new QueryClient()

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#0A0A0A'
  }
}

const RootLayout = () => {
  useReactQueryDevTools(queryClient);


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider value={CustomTheme}>
          <Slot />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default RootLayout