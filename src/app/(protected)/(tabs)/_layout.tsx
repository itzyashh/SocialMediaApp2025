import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';

const TabLayout = () => {
    return (
        <Tabs
         screenOptions={{
            tabBarShowLabel: false
         }}
        >
            <Tabs.Screen name='(home)' options={{ title: 'Feed', headerShown: false,
                tabBarIcon: ({ size, color }) => <FontAwesome name='home' size={size} color={color}  />
            }} />
            <Tabs.Screen name='search' options={{ title: 'Search',
                tabBarIcon: ({ size, color }) => <FontAwesome name='search' size={size} color={color}  />
            }} />
            <Tabs.Screen name='profile' options={{ title: 'Profile',
                tabBarIcon: ({ size, color }) => <FontAwesome name='user' size={size} color={color}  />
            }} />
            <Tabs.Screen name='notifications' options={{ title: 'Notification',
                tabBarIcon: ({ size, color }) => <FontAwesome name='bell' size={size} color={color}  />
            }} />
        </Tabs>
    )
}

export default TabLayout