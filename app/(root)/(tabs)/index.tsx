import {useEffect} from "react"
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import icons from "@/constants/icons"
import Search from "@/components/Search"
import {Card, FeaturedCard} from "@/components/Cards"
import Filters from "@/components/Filters"
import {useGlobalContext} from "@/lib/global-provider"
import {router, useLocalSearchParams} from "expo-router"
import {useAppwrite} from "@/lib/useAppwrite"
import {getLatestProperties, getProperties} from "@/lib/appwrite"
import NoResults from "@/components/NoResults"

// noinspection JSUnusedGlobalSymbols
export default function Index() {
  const { user } = useGlobalContext()
  const uri: string | undefined = user?.avatar.toString()
  const userName: string | undefined = user?.name

  const params = useLocalSearchParams<{ query?: string, filter?: string; }>()

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({ fn: getLatestProperties, })

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true,
  })

  // Refetch properties when the filter or query changes
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6
    })
  }, [params.filter, params.query])

  /**
   * Function to handle the card press and navigate to the property details screen.
   * @param {string} id - The property id.
   */
  const handleCardPress = (id: string) => router.push(`/properties/${id}`)

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
            {/* Top bar (avatar, name and notifications icon) */}
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
            {/* Search bar */}
            <Search />
            {/* Featured and see all texts */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Destacadas</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-blue-600">Ver todas</Text>
                </TouchableOpacity>
              </View>
              {/* Featured cards */}
              {latestPropertiesLoading ? (<ActivityIndicator size="large" className="text-primary-100"/>) :
                !latestProperties || latestProperties.length === 0 ? <NoResults /> : (
                  <FlatList
                      bounces={false}
                      data={latestProperties}
                      keyExtractor={(item) => item.$id}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      contentContainerClassName="flex gap-5 mt-5"
                      renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />}
                  />
                  )}
            </View>
            {/* Recommended and see all texts */}
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Recomendadas</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-blue-600">Ver todas</Text>
              </TouchableOpacity>
            </View>
            {/* Filters */}
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  )
}