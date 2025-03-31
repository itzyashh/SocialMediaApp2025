import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '@/sevices/postService'

const NewPost = () => {
    const queryClient = useQueryClient()
    const [content, setContent] = useState("")

    const {mutate: onPost} = useMutation({
        mutationFn: () => createPost(content),
        onSettled:() => {
            router.back()
            queryClient.invalidateQueries({queryKey:['posts']})
        }
    })

    return (
        <View>
            <Stack.Screen options={{
                headerTitleAlign: 'center',
                headerLeft: () => <Text onPress={() => router.back()}
                >Cancel</Text>,
                headerRight: () => <Button title='Post' disabled={content.length===0} onPress={() => onPost()} />
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