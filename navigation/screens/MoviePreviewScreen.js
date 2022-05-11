import React from 'react'
import { View, Text } from 'react-native'

const MoviePreviewScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{fontSize: 26, fontWeight: "bold"}}>Movie Preview Screen</Text>
    </View>
  )
}

export default MoviePreviewScreen