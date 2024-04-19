import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import Color from '../../Pages/shared/Color'
const SearchBar = () => {
  return (
    <View style={styles.container}>
        <Icon style={{verticalAlign:'middle', marginRight:10}} name='search' size={24} color={Color.gray}/>
        <TextInput placeholder='Search'/>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10,
        elevation:2,
        marginTop:10,
        alignItems:'center'
    }
})
export default SearchBar