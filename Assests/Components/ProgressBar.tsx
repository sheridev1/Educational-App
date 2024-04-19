import React from 'react'
import {Dimensions, Text, View} from 'react-native'
import * as Progress from 'react-native-progress';
const ProgressBar = ({progress}) => {
  return (
  <View>
    <Progress.Bar progress={progress} width={Dimensions.get('screen').width*0.90}/>
  </View>
  )
}

export default ProgressBar