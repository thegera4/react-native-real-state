import {View, Text, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images"

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image source={images.noResult} className="w-11/12 h-80" resizeMode="contain" />
      <Text className="text-xl font-rubik-bold text-black-300 mt-5">No se encontraron resultados</Text>
    </View>
  )
}

export default NoResults