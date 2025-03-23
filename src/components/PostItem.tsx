import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FontAwesome6 } from '@expo/vector-icons';
import PostFooterButtons from './PostFooterButtons';
import { Link } from 'expo-router';

dayjs.extend(relativeTime)

type PostItemProps = {
    post: Post
}

const PostItem: FC<PostItemProps> = ({ post }) => {
    const createdAt = dayjs(post.created_at).fromNow(true)
    return (
        <Link href={`/post/${post.id}`}>
            <View className='flex-row px-4 gap-3 border-b border-gray-200 py-3'>
                <Image source={{ uri: post.author.avatar }} className='h-10 w-10 rounded-full mt-1' />
                <View className='gap-1 flex-1'>
                    <View className='flex-row gap-2'>
                        <Text className='font-semibold'>{post.author.name}</Text>
                        <Text className='text-gray-500'>{post.author.handle}</Text>
                        <Text>•</Text>
                        <Text className='text-gray-500'>{createdAt}</Text>
                    </View>
                    <Text className='leading-5'>{post.content}</Text>

                    {/* icons */}
                    <View className='flex-row gap-6 mt-2'>
                        <PostFooterButtons icon='comment' count={post.replies_count} />
                        <PostFooterButtons icon='retweet' count={post.retweets_count} />
                        <PostFooterButtons icon='heart' count={post.likes_count} isMarked={post.isLiked} />
                    </View>
                </View>
            </View>
        </Link>
    )
}

export default PostItem