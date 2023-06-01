import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Fetch_places_history} from '../../src/store/actions';
// import {add} from '../../src/store/reducer/places.reducer';
const {height, width} = Dimensions.get('screen');
const InputComp = ({GoToSpecificLocation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const dispatch = useDispatch();

  const [searchLocations, setsearchLocations] = useState('');
  const [results, setresults] = useState([]);
  console.log(
    '===========search Locations values---------------------->',
    searchLocations,
  );
  const apiKey = 'AIzaSyBibKHufKudku4CjJARAuVNws-JvXL-C0g';
  const apiUrl = searchLocations
    ? `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchLocations}&radius=5000&key=${apiKey}`
    : `https://maps.googleapis.com/maps/api/place/textsearch/json?&radius=5000&key=${apiKey}`;
  useEffect(() => {
    // Make an HTTP request to the constructed API URL and handle the response
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const filteredPlaces = places.filter(place =>
          place.name.includes(searchLocations),
        );
        const combinedResults = filteredPlaces.concat(data.results);
        if(searchLocations){
        setresults(combinedResults);
        console.log("combinedResults",combinedResults)
      }else{
        setresults([])
      }
        // Handle the API response data
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }, [searchLocations]);

  const places = useSelector(state => state?.userReducer?.places);
  console.log('results====================>', results);

  // useEffect(()=>{
  //   const filteredPlaces = places.filter(place =>
  //     place.name.includes(searchLocations)
  //   );

  //   setresults(filteredPlaces.concat(results));
  // },[searchLocations])

  // console.log("<=========================>filteredPlaces",filteredPlaces)
  const close_handler = () => {
    setModalVisible(false);
    setresults([]);
    setsearchLocations('');
  };
  return (
    <>
      {!modalVisible ? (
        <TouchableOpacity
          style={styles.inp}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={{color: 'grey'}}>Search For Places</Text>
          <Text style={{fontSize: 20}}>🔍</Text>
        </TouchableOpacity>
      ) : null}
      <Modal
        visible={modalVisible}
        style={styles.modal}
        transparent
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableOpacity style={styles.Close} onPress={close_handler}>
          <Text style={{zIndex: 100}}>❌</Text>
        </TouchableOpacity>

        <View style={styles.ModalView}>
          <TextInput
            style={styles.inp}
            placeholder="Search for locations"
            placeholderTextColor={'grey'}
            onChangeText={e => {
              setsearchLocations(e);
            }}
            autoComplete="postal-address"
          />
          {!searchLocations ? (
            <Text style={styles.History}>History 🕒</Text>
          ) : null}
          <FlatList
            style={{top: 70, left: 45}}
            data={
              places && !results.length
                ? places.length > 5
                  ? places?.slice(-7,places.length)?.reverse()
                  : places
                : results.slice(0, 7)
            }
            
            renderItem={({item, index}) => (
              <TouchableOpacity
              key={item.place_id }
                style={styles.resultDiv}
                onPress={() => {
                  GoToSpecificLocation(item?.geometry?.location);
                  let checking = places.some(
                    val => val.place_id == item.place_id,
                  );
                  if (!checking) {
                    places?.push(item);
                    dispatch(Fetch_places_history(places));
                  }
                  setModalVisible(false);
                  setresults([]);
                  setsearchLocations('');
                }}>
                <View>
                  <Text style={styles.Name}>{item.name}</Text>
                  <Text style={styles.address}>{item.formatted_address}</Text>
                </View>
                {!searchLocations ||
                places.some(
                  place =>
                    place.name.includes(searchLocations) &&
                    item.place_id == place?.place_id,
                ) == true ? (
                  <Text style={styles.History_emoji}>🕒</Text>
                ) : null}
              </TouchableOpacity>
            )}
            keyExtractor={item => item.place_id}
          />
        </View>
      </Modal>
    </>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  inp: {
    height: 50,
    width: '75%',
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
    color: 'grey',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  resultDiv: {
    width: '74.8%',
    backgroundColor: 'white',
    zIndex: 100,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // borderWidth: 0.1,
    margin: 3,
    padding: 5,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 5,
  },
  ModalView: {
    height: height / 1.4,
    width: width / 1.1,
    alignSelf: 'center',
    backgroundColor: 'white',
    top: height / 45,
    borderRadius: 20,
  },
  modal: {
    backgroundColor: 'grey',
  },
  address: {color: 'grey', fontSize: 10, maxWidth: 200},
  Name: {color: 'black', fontSize: 13, fontWeight: "400"},
  History: {
    fontSize: 20,
    color: 'grey',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    top: 70,
  },
  History_emoji: {
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  Close: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    top: 18,
    right: 10,
  },
});
