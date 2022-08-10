import { StyleSheet, Button, View, SafeAreaView, Text, Alert, FlatList, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect} from 'react'
import { Image } from "@rneui/themed";
import { Card, ListItem, Icon } from 'react-native-elements'
import firebase from '@react-native-firebase/app';


import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { renderNode } from '@rneui/base';
import Photos from './Photos';



const Storage = ({ navigation }) => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
   
    const [imageTab, setImageTab] = useState(['']);
    
    useEffect(() => {
      setImageTab([]);
      console.log("use effect ilk calıstıgında imagetab :"+imageTab);
      firebase.storage()
        .ref('images/')
        .listAll()
        .then(function(result) {
            result.items.forEach(function(imageRef) {
                imageRef.getDownloadURL().then(function(url) {
                    imageTab.push(url);
                    setImageTab(imageTab);
                    console.log("image tab :"+imageTab)
                }).catch(function(error) {
                    // Handle any errors
                });
            });
        })
        .catch((e) => console.log('Errors while downloading => ', e));
        <Photos images={imageTab} />
    }, [uploading]);

    
          

      const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            setImage(image.path);
          });
          submitPicture();
      }

      const choosePhotoFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setImage(image.path);
          });
          submitPicture();         
      }

      const submitPicture = async () => {
        const uploadUri = image;
        
        let filename = 'images/'+uploadUri.substring(uploadUri.lastIndexOf('/')+1); 
    
    
        const fileExtension = uploadUri.split('.').pop();
        const fileid = `${uuid()}.${fileExtension}`;
        console.log("file id :"+fileid);
        
        //console.log(uploadUri)
        //console.log(filename)

        try{
          Alert.alert(
            'image uploaded!',
            'your image has been uploaded to firebase cloud storage succesfully!'
          )
          setUploading(true)
          await storage().ref(filename).putFile(uploadUri);
        }catch(e) {
        console.log(e)
      }
      setImage(null);
      }

    
      

  return (
    <SafeAreaView style={{flex:1}}>
      <Button
            onPress={takePhotoFromCamera}
            title="take photo from camera"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        <Button
            onPress={choosePhotoFromGallery}
            title="choose photo from library"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        <ScrollView>    
              {
              imageTab.map(i => (
              <Image style={{height:220,width:250, borderRadius:15, alignSelf:'center',marginBottom:20 }}
              source = {{uri:i}}/>
              ))
              }
        </ScrollView>
        
        

        

    </SafeAreaView>
  )
}

export default Storage