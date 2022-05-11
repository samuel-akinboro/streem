import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import HomeScreen from './screens/HomeScreen'
import MoviePreviewScreen from './screens/MoviePreviewScreen'

// screen names
const homeName = "Home"
const moviePreviewName = "movie preview"

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions = {({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if(route.name === homeName){
              iconName = focused 
                ? 'home'
                : 'home-outline';
            }else if(route.name === moviePreviewName){
              iconName = focused 
                ? 'layers' 
                : 'layers-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}

        tabBarOptions={{
          labelStyle: {fontSize: 20}
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={moviePreviewName} component={MoviePreviewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer