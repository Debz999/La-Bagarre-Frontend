import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from '../reducers/user'
import cart from '../reducers/cart'
import Header from '../components/Header'

const reducers = combineReducers({ user});
const store = configureStore({
  reducer: {user, cart},
 });

function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      
      <Header></Header>

      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
