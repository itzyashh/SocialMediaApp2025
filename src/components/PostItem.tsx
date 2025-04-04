import { View, Text, Image, Pressable } from 'react-native'
import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FontAwesome6 } from '@expo/vector-icons';
import PostFooterButtons from './PostFooterButtons';
import { Link } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislikePost, likePost } from '@/sevices/postService';

dayjs.extend(relativeTime)

type PostItemProps = {
    post: Post
}

const PostItem: FC<PostItemProps> = ({ post }) => {
    const queryClient = useQueryClient()
    const createdAt = dayjs(post.created_at).fromNow()

    const onLikePress = useMutation({
        mutationFn: async () => likePost(post.id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
    })
    const onDisLikePress = useMutation({
        mutationFn: async () => dislikePost(post.id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
    })

    const onHearPress = () => {
        console.log('kii')
        if (onDisLikePress.isPending || onLikePress.isPending) return

        if (post.is_liked) {
            onDisLikePress.mutate()
        } else {
            onLikePress.mutate()
        }
    }

    return (
        <Link asChild href={`/post/${post.id}`}>
            <Pressable className='flex-row px-4 gap-3 border-b border-gray-200 py-3'>
                <Image source={{ uri: post.author.avatar }} className='h-10 w-10 rounded-full mt-1' />
                <View className='gap-1 flex-1'>
                    <View className='flex-row gap-2'>
                        <Text className='font-semibold'>{post.author.name}</Text>
                        <Text className='text-gray-500'>{post.author.username}</Text>
                        <Text>•</Text>
                        <Text className='text-gray-500'>{createdAt}</Text>
                    </View>
                    <Text className='leading-5'>{post.content}</Text>

                    {/* icons */}
                    <View className='flex-row gap-6 mt-2'>
                        <PostFooterButtons icon='comment' count={post.replies_count} />
                        <PostFooterButtons icon='retweet' count={post.retweets_count} />
                        {onLikePress.isPending
                            ? <PostFooterButtons disabled icon='heart' count={post.likes_count + 1} isMarked={true} onPress={onHearPress} />
                            : onDisLikePress.isPending
                                ? <PostFooterButtons disabled icon='heart' count={post.likes_count - 1} isMarked={false} onPress={onHearPress} />
                                : <PostFooterButtons icon='heart' count={post.likes_count} isMarked={post.is_liked} onPress={onHearPress} />
                        }
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

export default PostItem