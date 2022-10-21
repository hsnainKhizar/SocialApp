import React from 'react';
import { View,Text, Button, Image, TouchableOpacity,StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';

    return (
        <View
            style = {{
                width:5,
                height:5,
                marginHorizontal:3,
                backgroundColor
            }}
            >
        </View>
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity 
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);
const Next = () => (
    <Button
        title= 'Next'
        color = "#000000"
    />
);

const Done = ({...props}) => (
    <TouchableOpacity 
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: '#000000'}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return(
        <Onboarding
        // to change button background of skip next buttons
        //SkipButtonComponent={Skip}
        //NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent= {Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
            {
                backgroundColor: '#a6e4d0',
                image:<Image source={require('../assets/onboarding-img1.png')}/>,
                title: 'Connect To The World',
                subtitle: 'A New Way Connect To The World', 
            },
            {
                backgroundColor: '#fdeb93',
                image:<Image source={require('../assets/onboarding-img2.png')}/>,
                title: 'Share Your Favourites',
                subtitle: 'Share Your Thoughts With Similar Kind Of People', 
            },
            {
                backgroundColor: '#e9bcbe',
                image:<Image source={require('../assets/onboarding-img3.png')}/>,
                title: 'Become The Star',
                subtitle: 'Let The Spot Light Capture You!', 
            },
        ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});