import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from '../reducers/user'
import cart from '../reducers/cart'
import wishlist from '../reducers/wishlist';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';



const reducers = combineReducers({ user, cart, wishlist});
const persistConfig = { key: 'laBagarre', storage };


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 const persistor = persistStore(store);



// const store = configureStore({
//   reducer: {user, cart, wishlist},
//  });

function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
             <PersistGate persistor={persistor}>
      <Head>
        <title>Next.js App</title>
      </Head>
      
      <Header></Header>

      <Component {...pageProps} />
      <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
