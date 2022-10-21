import React, {useContext,useState , useEffect } from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import {View} from 'react-native'
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
 
const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() =>{
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else{
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if( isFirstLaunch == null) {
    return null;
  } else if ( isFirstLaunch == true) {
      routeName = 'Onboarding'
  } else {
    routeName = 'Login'
  }
  return(
      <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
             name = "Onboarding"
             component = {OnboardingScreen}
             options= {{header: () => null}}
          />
          <Stack.Screen
             name = "Login"
             component = {LoginScreen}
             options= {{header: () => null}}
          />
          <Stack.Screen 
            name= "Signup" 
            component={SignupScreen}
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                shadowColor: '#f9fafd',
                elevation: 0,
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <FontAwesome.Button 
                     name="long-arrow-left"
                     size={25}
                     backgroundColor="#f9fafd"
                     color="#333"
                     onPress={() => navigation.navigate('Login')}
                  
                  />
                </View>
              ),
            })}
            />
      </Stack.Navigator>
  );
};

export default AuthStack;

//     <NavigationContainer>
//     <AppStack.Navigator headerMode="none">
//       <AppStack.Screen name="Onboarding" component={OnboardingScreen}></AppStack.Screen>
//       <AppStack.Screen name="Login" component={LoginScreen}></AppStack.Screen>
//     </AppStack.Navigator>
//   </NavigationContainer>