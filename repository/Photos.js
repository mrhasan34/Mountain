import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect, componentDidMount} from 'react'


import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';



function Photos ({navigation, images}) {
    console.log("images :"+images);
    return (
        <ScrollView>    
              {
              images.map(i => (
              <Image style={{height:220,width:250, borderRadius:15, alignSelf:'center',marginBottom:20 }}
              source = {{uri:i}}/>
              ))
              }
        </ScrollView>
        );

  }
  
  export default Photos;
  