import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";

interface CardProps {
  onPress: () => void
}

export const FeaturedCard = ({ onPress } : CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image source={images.cardGradient} className=""
    </TouchableOpacity>
  )
}

export const Card = () => {
  return (
    <View>
      <Text>Card</Text>
    </View>
  )
}