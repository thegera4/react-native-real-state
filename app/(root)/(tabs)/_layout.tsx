import {View, Text, Image, TouchableNativeFeedback, Platform} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
import icons from "@/constants/icons"

interface TabIconProps {
  focused: boolean
  icon: any
  title: string
}

/** Creates a custom icon and text for each tab from the bottom tab navigation bar. */
const TabIcon = ({focused, icon, title}: TabIconProps) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image source={icon} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className={focused ? "size-7" : "size-6"}/>
      <Text className={`${focused ? 'text-blue-600 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
        {title}
      </Text>
    </View>
  )
}

/** Tabs Layout Component (to create a bottom tab navigation). */
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          animation: 'fade',
          tabBarButton: (props) => (
            Platform.OS === 'android' &&
              (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#0061ff2A', true)}
                  useForeground={true}
                  onPress={props.onPress}
                >
                  <View {...props} style={{alignItems: 'center', height: '100%', overflow: 'hidden'}}/>
                </TouchableNativeFeedback>
              )
          ),
          tabBarIcon: ({focused}) => (<TabIcon focused={focused} icon={icons.home} title="Home"/>)
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          animation: 'fade',
          tabBarButton: (props) => (
            Platform.OS === 'android' &&
            (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#0061ff2A', true)}
                useForeground={true}
                onPress={props.onPress}
              >
                <View {...props} style={{alignItems: 'center', height: '100%', overflow: 'hidden'}}/>
              </TouchableNativeFeedback>
            )
          ),
          tabBarIcon: ({focused}) => (<TabIcon focused={focused} icon={icons.search} title="Explore"/>)
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          animation: 'fade',
          tabBarButton: (props) => (
            Platform.OS === 'android' &&
            (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#0061ff2A', true)}
                useForeground={true}
                onPress={props.onPress}
              >
                <View {...props} style={{alignItems: 'center', height: '100%', overflow: 'hidden'}}/>
              </TouchableNativeFeedback>
            )
          ),
          tabBarIcon: ({focused}) => (<TabIcon focused={focused} icon={icons.person} title="Profile"/>)
        }}
      />
    </Tabs>
  )
}

export default TabsLayout