import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{fontSize: 26, fontWeight: "bold"}}>Welcome to Streem <Ionicons name="home" color="green" size={30} /></Text>
    </View>
  )
}

export default HomeScreen