import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:50}}>Is I am Selected??????Hope So XD</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   },
})