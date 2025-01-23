import {Text, TouchableOpacity} from 'react-native'
import React from 'react'
import strings from "@/constants/strings"

interface SignButtonProps {
  type: string
  handleSign: (type: string, email: string, password: string) => void
  email: string
  password: string
}

const SignButton = ({ type, handleSign, email, password }: SignButtonProps) => {
  return (
    <TouchableOpacity className="bg-blue-600 rounded-md p-2 mt-4" onPress={() => handleSign(type, email, password)}>
      <Text className="text-white text-center">
        {type === strings.REGISTER ? strings.REGISTRARSE : strings.LOGIN}
      </Text>
    </TouchableOpacity>
  )
}

export default SignButton