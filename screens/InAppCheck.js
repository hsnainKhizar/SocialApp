import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import Purchases from 'react-native-purchases'

const InAppCheck = () => {
    // TODO Fetch all packages from RevenueCat

  useEffect(()=>{
    const getPackages = async () =>{
      try{
        const offrings = await Purchases.getOfferings();
        if (offrings.current !== null){
          console.log(offrings.current);
        }
      }catch(e){
        console.error(e);
      }
    };
    getPackages();
  },[])
    return (
        <View>
            <Text>hello InApp</Text>
        </View>
    )
}

export default InAppCheck
