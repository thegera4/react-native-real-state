import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import images from "@/constants/images"
import icons from "@/constants/icons"
import Search from "@/components/Search"
import {Card, FeaturedCard} from "@/components/Cards"
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";

export default function Index() {
  const { user } = useGlobalContext()
  const uri: string | undefined = user?.avatar.toString()
  const userName: string | undefined = user?.name

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card onPress={() => console.log("Card pressed")} /> }
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">

            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image source={{uri}} className="size-12 rounded-full" />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Hola</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{userName ?? "Sin nombre"}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Destacadas</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-blue-600">Ver todo</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                bounces={false}
                data={[1,2,3]}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
                renderItem={() => <FeaturedCard onPress={() => console.log("Featured card pressed")} />}
              />
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Recomendadas</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-blue-600">Ver todo</Text>
              </TouchableOpacity>
            </View>

            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  )
}