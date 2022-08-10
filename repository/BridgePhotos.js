import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect, componentDidMount} from 'react'


import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import Photos from './Photos';
import App from '../App';
import { Component } from 'react'


function BridgePhotos() {
  const [imageTab, setImageTab] = useState(['']);
  firebase.storage()
        .ref('images/')
        .listAll()
        .then(function(result) {
            result.items.forEach(function(imageRef) {
                imageRef.getDownloadURL().then(function(url) {
                    imageTab.push(url);
                    console.log("verileri :"+imageTab)
                    setImageTab(imageTab);
                }).catch(function(error) {
                    console.log("error :"+error)
                });
            });
        })
        .catch((e) => console.log('Errors while downloading => ', e))
  
  return (
    <Photos images={imageTab} />
  )
}

export default BridgePhotos