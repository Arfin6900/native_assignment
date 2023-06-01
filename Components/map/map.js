import {StyleSheet, View, PermissionsAndroid, Image} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from './mapStyle.json';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
// import { useSelector } from 'react-redux';

const MapScreen = props => {
  const places = useSelector(state => state?.userReducer?.places);

  return (
    <View style={styles.container}>
      <MapView
        //  liteMode={false}
        // mapType='hybrid'
        // showsPointsOfInterest
        userInterfaceStyle="dark"
        customMapStyle={mapStyle}
        showsCompass
        ref={props?.mapref}
        style={[styles.map]}
        initialRegion={{
          latitude: places[0]?.geometry?.location.lat
            ? places[0]?.geometry?.location.lat
            : 37.78825,
          longitude: places[0]?.geometry?.location.lng
            ? places[0]?.geometry?.location.lng
            : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        maxZoomLevel={19}>
        {places.length
          ? places?.map(val => {
              return (
                <Marker
                  key={val?.place_id}
                  coordinate={{
                    latitude: val.geometry?.location.lat,
                    longitude: val.geometry?.location.lng,
                  }}
                  title={val.name}
                  description={"your recent search"}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: 'green',
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 13,
                        width: 13,
                        backgroundColor: 'black',
                        borderRadius: 15,
                      }}></View>
                  </View>
                </Marker>
              );
            })
          : null}
      </MapView>
    </View>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationContainer: {
    margin: 70,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  locationText: {
    fontSize: 16,
  },
});
