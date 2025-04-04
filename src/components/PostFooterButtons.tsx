import { Pressable, StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type PostFooterButtonsProps = {
    icon: string
    count: number
    isMarked?: boolean
    onPress?: () => void
    disabled?: boolean
}

const PostFooterButtons: FC<PostFooterButtonsProps> = ({ icon, count, isMarked, onPress, disabled }) => {

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


    const exceptions = ['retweet']

    let iconName = icon;
    if (!exceptions.includes(icon)) {
        iconName = isMarked ? `${icon}` : `${icon}-o`;
    }
    return (
        <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        disabled={disabled}
        className='flex-row gap-1 items-center' onPress={onPress}>
            {/* @ts-ignore */}
            <FontAwesome name={iconName} size={18} color={ isMarked ? 'crimson' : 'gray'} />
            <Text>{count}</Text>
        </AnimatedPressable>
    )
}

export default PostFooterButtons

const styles = StyleSheet.create({})