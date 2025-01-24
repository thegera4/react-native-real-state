import {SafeAreaView, ActivityIndicator} from 'react-native'
import React from 'react'
import {useGlobalContext} from "@/lib/global-provider"
import {Redirect, Slot} from "expo-router"
import {SIGN_URL} from "@/constants/strings"

/** Contains all the tabs and layers that the logged user will be able to see. */
const AppLayout = () => {
  const { loading, isLoggedIn } = useGlobalContext()

  if(loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-blue-600" size="large" />
      </SafeAreaView>
    )
  }

  if(!isLoggedIn) return <Redirect href={SIGN_URL} />

  return <Slot />
}

export default AppLayout