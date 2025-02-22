import {useEffect} from "react"
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
//import icons from "@/constants/icons"
import Search from "@/components/Search"
import {Card} from "@/components/Cards"
import Filters from "@/components/Filters"
import {router, useLocalSearchParams} from "expo-router"
import {useAppwrite} from "@/lib/useAppwrite"
import {getProperties} from "@/lib/appwrite"
import NoResults from "@/components/NoResults"

// noinspection JSUnusedGlobalSymbols
export default function Explore() {
  const params = useLocalSearchParams<{ query?: string, filter?: string; }>()

  // Fetch properties based on the filter and query when the screen is loaded
  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: { filter: params.filter!, query: params.query!, limit: 20 },
    skip: true,
  })

  // Refetch properties when the filter or query changes
  useEffect(() => {
    refetch({ filter: params.filter!, query: params.query!, limit: 20 })
  }, [params.filter, params.query])

  /**
   * Function to handle the card press and navigate to the property details screen.
   * @param {string} id - The property id.
   */
  const handleCardPress: (id: string) => void = (id: string) => router.push(`/properties/${id}`)

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)}/>}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={loading ? <ActivityIndicator size="large" className="text-primary-100 mt-5"/> : <NoResults/>}
        ListHeaderComponent={
          <View className="px-5">
            {/* Top bar with back button */}
            {/*<View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Busca tu estancia ideal
              </Text>
              <Image source={icons.bell} className="h-6 w-6" />
            </View>*/}
            {/* Search bar */}
            <Search />
            {/* Filters and found x properties */}
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Mostrando {properties!.length} propiedades
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  )
}