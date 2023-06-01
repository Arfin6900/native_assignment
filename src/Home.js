import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapScreen from '../Components/map/map'
import InputComp from '../Components/InputComp'

const Home = () => {
    const mapref=useRef(null)
    const GoToSpecificLocation = location => {
      let placeRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      };
      mapref?.current?.animateToRegion(placeRegion, 2 * 1000);
     
    };
  return (
    <View style={{flex: 1}}>
    <InputComp GoToSpecificLocation={GoToSpecificLocation}/>
     <MapScreen mapref={mapref}/>
   </View>
  )
}

export default Home

const styles = StyleSheet.create({})