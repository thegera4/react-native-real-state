import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native"
import icons from "@/constants/icons"

/** Props for the SettingsItem component */
interface SettingsItemProps {
  icon: ImageSourcePropType
  title: string
  onPress?: () => void
  textStyle?: string
  showArrow?: boolean
}

/** Settings item to display a row with an icon and a title. Mainly used in the Profile screen. */
const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  )
}

export default SettingsItem