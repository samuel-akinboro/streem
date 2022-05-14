import React from 'react'
import { View } from 'react-native'

import { COLORS, SIZES } from '../constants'

const ProgressBar = ({ contianerStyle, barStyle, barPercentage}) => {
  return (
    <View style={{...contianerStyle}}>
      <View
        style={{
          marginTop: SIZES.base,
          position: 'absolute',
          backgroundColor: COLORS.gray,
          width: '100%',
          bottom: 0,
          left: 0,
          ...barStyle
        }}
      >
      </View>
      <View 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          marginTop: SIZES.base,
          backgroundColor: COLORS.primary,
          width: barPercentage,
          ...barStyle
      }}>
      </View>
    </View>
  )
}

export default ProgressBar