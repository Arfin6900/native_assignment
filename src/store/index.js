import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootreducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage:AsyncStorage, // Defaults to localStorage for web and AsyncStorage for React Native
  };
  const persistedReducer = persistReducer(persistConfig, reducers);

  const store = createStore(persistedReducer, applyMiddleware(thunk));

export default store;



