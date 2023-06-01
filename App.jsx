import 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import MapScreen from './Components/map/map';
import {Provider, useSelector} from 'react-redux';
import InputComp from './Components/InputComp';
import store from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const App = () => {
  const persistor = persistStore(store);
  const mapref = useRef(null);
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Your app components */}
          <View style={{flex: 1}}>
            <InputComp GoToSpecificLocation={GoToSpecificLocation} />
            <MapScreen mapref={mapref} />
          </View>
        </PersistGate>
      </Provider>
  );
};

export default App;
