import React,{useEffect} from 'react';
import Providers from './navigation';
import Purchases from 'react-native-purchases'
import { API_KEY } from './src/constants';
import InAppCheck from './screens/InAppCheck';

const App = () => {
  useEffect(()=>{
    Purchases.setDebugLogsEnabled(true);
    //console.log(API_KEY);
    Purchases.setup(API_KEY)
  },[])
  return <Providers />;
  // return <InAppCheck /> ;
}
export default App; 