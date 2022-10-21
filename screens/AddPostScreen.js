import React, { useState, useContext} from 'react'
import { View,Text,Button,StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { InputField, InputWrapper ,AddImage, SubmitBtn, SubmitBtnText, StatusWrapper} from '../styles/AddPost';
import { AuthContext } from '../navigation/AuthProvider'
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const AddPostScreen = () => {
    const {user, logout} = useContext(AuthContext);
    const [image,setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post,setPost] = useState(null);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };
    
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };

    const submitPost = async () => {
      const imageUrl = await uploadImage();
      //console.log('Image Url:', imageUrl);

      firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime:firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      })
      .then(() =>{
        console.log('Post Added!');
        Alert.alert(
          'Post Published!',
          'Your post has been published Successfully!',
        );
        setPost(null);
      })
      .catch((error) => {
        console.log('Something went wrong with the added post to firestore.',error);
      });
    }
    const uploadImage = async () => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to file name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        //set transferred  state
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            );
          });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);
            // Alert.alert(
            //     'Image uploaded!',
            //     'Your image has been uploaded to the firabase Cloud Storage Successfully!'
            // );
            return url;

        }catch(e){
            console.log(e);
            return null;
        }
    }
    
    const actions = [
        {
          text: "Take Photo",
          icon: <Icon name="camera-outline" size={20}  color='white' />,
          name: "bt_takePhoto",
          height: 22,
          position: 3
        },
        {
          text: "Choose Photo",
          icon: <Icon  name="md-images-outline" size={20} color='white' />,
          name: "bt_ChoosePhoto",
          position: 4
        }
      ];
    const dummyfunction =(name)=>{ 
         if (name=="bt_ChoosePhoto"){
             choosePhotoFromLibrary()
         }
         else if (name=="bt_takePhoto"){
             takePhotoFromCamera()
         }
    }
    return (
        <View style ={styles.container}>
            <InputWrapper>
            {image != null ? <AddImage source={{uri: image}}/> : null}
               <InputField
                  placeholder= "What's on your mind?"
                  multiline
                  numberOfLines= {4}
                  value= {post}
                  onChangeText={(content) => setPost(content)}
               />
               {uploading ? (
                   <StatusWrapper>
                       <Text>{transferred} % Completed</Text>
                       <ActivityIndicator size= "large" color="#0000ff" />
                   </StatusWrapper>
               ):(
                   <SubmitBtn onPress={submitPost}>
                       <SubmitBtnText>Post</SubmitBtnText>
                   </SubmitBtn>
               )}
            </InputWrapper>
            <FloatingAction
                actions={actions}
                onPressItem={name=>{dummyfunction(name)}}
            >
            </FloatingAction>
        </View>
    );
};

export default AddPostScreen

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
});