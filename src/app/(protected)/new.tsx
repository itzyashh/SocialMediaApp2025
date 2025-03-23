import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'

const NewPost = () => {

    const [content, setContent] = useState("")

    return (
        <View>
            <Stack.Screen options={{
                headerTitleAlign: 'center',
                headerLeft: () => <Text onPress={() => router.back()}
                >Cancel</Text>,
                headerRight: () => <Button title='Post' disabled={content.length===0} />
            }} />
            <TextInput
                placeholder="What's happening?"
                placeholderTextColor={'gray'}
                className='p-6 text-2xl'
                value={content}
                onChangeText={setContent}
            />
        </View>
    )
}

export default NewPost