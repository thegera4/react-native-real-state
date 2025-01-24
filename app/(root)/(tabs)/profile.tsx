import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import icons from "@/constants/icons"
import images from "@/constants/images"
import {settings} from "@/constants/data"
import strings from "@/constants/strings"
import {useGlobalContext} from "@/lib/global-provider"
import {logout} from "@/lib/appwrite"
import SettingsItem from "@/components/SettingsItem"

/** Profile screen to log out and view user information */
const Profile = () => {
  const { user, refetch } = useGlobalContext()
  const uri: string | undefined = user?.avatar.toString()
  const userName: string | undefined = user?.name

  const handleLogout = async () => {
    const wasLoggedOut = await logout()
    if (wasLoggedOut) {
      Alert.alert("La sesión ha sido cerrada correctamente. Hasta pronto.")
      await refetch()
    } else {
      Alert.alert("Ha ocurrido un error al cerrar la sesión. Por favor intenta de nuevo.")
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
        {/* Top bar row */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5"/>
        </View>
        {/* Avatar picture row */}
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image source={{uri}} className="size-44 relative rounded-full"/>
            <TouchableOpacity className="absolute bottom-12 right-4">
              <Image source={icons.edit} className="size-9"/>
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{userName ?? "Sin Nombre"}</Text>
          </View>
        </View>
        {/* Settings  */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        {/* Settings part 2 */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          { settings.slice(2).map((setting, index) => (<SettingsItem key={index} {...setting}/>))}
        </View>
        {/* Logout 'Button' */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem icon={icons.logout} title={strings.profile.LOGOUT} onPress={handleLogout} textStyle="text-danger" showArrow={false}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile