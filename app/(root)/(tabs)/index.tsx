import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import images from "@/constants/images"
import icons from "@/constants/icons"
import Search from "@/components/Search"
import {Card, FeaturedCard} from "@/components/Cards"

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      {/* Header (Avatar, name and notifications icon */}
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">Bienvenido</Text>
              <Text className="text-base font-rubik-medium text-black-300">Gerardo Medellin</Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
        {/* Search Component */}
        <Search />
        {/* Featured section */}
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">Destacadas</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-blue-600">Ver todo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FeaturedCard onPress={() => console.log('Card pressed')} />
      <Card />
    </SafeAreaView>
  )
}