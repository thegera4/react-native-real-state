import React from 'react'
import { Alert, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import images from '../constants/images'
import icons from '../constants/icons'
import {loginWithGoogle} from "@/lib/appwrite";

const SignIn = () => {

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle()
    if(result) {
      console.log("Login successful!")
    } else {
      Alert.alert('Error', 'Failed to login with Google!')
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Bienvenido a Casas Sabag
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Inicia sesión para {"\n"} <Text className="text-blue-600">Continuar</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Iniciar sesión con Google
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            onPress={handleLoginWithGoogle}
          >
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} className="w-5 h-5 mr-2.5" resizeMode="contain" />
              <Text className="text-lg font-rubik-medium text-black-300">Continuar con Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn