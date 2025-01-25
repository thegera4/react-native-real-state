import {Text, ScrollView, Pressable} from 'react-native'
import React, {useState} from 'react'
import strings from "@/constants/strings"
import {router, useLocalSearchParams} from "expo-router"
import {categories} from "@/constants/data";

const Filters = () => {
  const params: {filter?: string | undefined} = useLocalSearchParams<{filter?: string}>()
  const [selectedCategory, setSelectedCategory] = useState(params.filter || strings.home.ALL)

  /**
   * Handles the category selection.
   * @param {string} category - The selected category.
   */
  const handleCategoryPress = (category: string) => {
    if(selectedCategory === category) {
      setSelectedCategory(strings.home.ALL)
      router.setParams({ filter: strings.home.ALL })
      return
    }

    setSelectedCategory(category)
    router.setParams({ filter: category })
  }

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
      { categories.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => handleCategoryPress(item.category)}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category ? 
            'bg-blue-600' : 'bg-primary-200 border border-primary-200'}`}
        >
          <Text className={`text-sm ${selectedCategory === item.category ?
            'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'}`}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

export default Filters