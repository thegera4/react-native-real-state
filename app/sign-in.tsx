import React, {useState} from 'react'
import {Alert, View, Text, SafeAreaView, Image, TextInput, Platform, TouchableOpacity, Button} from 'react-native'
import images from '../constants/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SignButton from "@/components/SignButton"
import strings from "@/constants/strings"
import {createUser, loginWithEmailAndPassword} from "@/lib/appwrite";

const blueText = "text-2xl font-rubik-bold text-blue-600"
const blackText = "text-2xl font-rubik-bold text-black-300 text-center"
const inputStyle = "border border-gray-300 rounded-md p-2 mt-4"

const SignIn = () => {

  const [type, setType] = useState<string>(strings.REGISTER)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSign = async (type: string, email: string, password: string) => {
    if (type === strings.REGISTER) {
      try {
        const userWasCreated: boolean = await createUser(email, password)
        if (userWasCreated) {
          Alert.alert("Ok", "Usuario registrado correctamente.")
        } else {
          Alert.alert("Error", "No se pudo registrar el usuario. Por favor intenta de nuevo más tarde.")
        }
      } catch (error) { // TODO: Change alerts for something more user-friendly like a snackbar...
        Alert.alert("Error", "Algo salio mal. Por favor intenta de nuevo más tarde.")
      }
    } else {
      try {
        const userWasLogged: boolean = await loginWithEmailAndPassword(email, password)
        if (userWasLogged) {
          Alert.alert("Bienvenido", "Has iniciado sesión correctamente.")
        } else {
          Alert.alert("Error", "No se pudo iniciar sesión. Verifica tus credenciales o Cierra las sesiones abiertas.")
        }
      } catch (error) { // TODO: Change alerts for something more user-friendly like a snackbar...
        Alert.alert("Error", "No se pudo iniciar sesión. Por favor verifica tus credenciales o Cierra las sesiones abiertas.")
      }
    }
  }

  const handleChange = (text: string, type: string) => {
    if (type === strings.placeholder.EMAIL) {
      setEmail(text)
    } else {
      setPassword(text)
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />
        <View className="px-10">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setType(strings.REGISTER)}>
              <Text className={type === strings.REGISTER ? blueText : blackText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(strings.LOGIN)}>
              <Text className={type === strings.LOGIN ? blueText : blackText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder={strings.placeholder.EMAIL}
            className={inputStyle}
            keyboardType="email-address"
            onChangeText={(text: string) => handleChange(text, strings.placeholder.EMAIL)}
          />
          <TextInput
            placeholder={strings.placeholder.PASSWORD}
            className={inputStyle}
            secureTextEntry
            onChangeText={(text: string) => handleChange(text, strings.placeholder.PASSWORD)}
          />
          <SignButton type={type} handleSign={handleSign} email={email} password={password} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default SignIn