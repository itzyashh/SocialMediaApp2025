import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

type PostFooterButtonsProps = {
    icon: string
    count: number
    isMarked?: boolean
}

const PostFooterButtons: FC<PostFooterButtonsProps> = ({ icon, count, isMarked }) => {

    const exceptions = ['retweet']

    const iconName = exceptions.includes(icon) ? icon : isMarked ? `${icon}` : `${icon}-o`
    return (
        <View className='flex-row gap-1 items-center'>
            {/* @ts-ignore */}
            <FontAwesome name={iconName} size={18} color={ isMarked ? 'crimson' : 'gray'} />
            <Text>{count}</Text>
        </View>
    )
}

export default PostFooterButtons

const styles = StyleSheet.create({})