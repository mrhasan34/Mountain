import { SafeAreaView, Text, TextInput, TouchableOpacityBase, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearLayout from 'react-linear-layout';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appStyles } from './styles';

import { Dimensions} from 'react-native' 


function Input  ({ navigation }) {
  const [name, setName] = React.useState('');
  const [pass, setPass] = React.useState('');
  const handleName = (text) => {
    setName(text);
  }
  const handlePass = (text) => {
    setPass(text);
  }

  const loginUser = (name, pass) => {
      auth()
    .signInWithEmailAndPassword(name, pass)
    .then(() => {
      navigation.navigate('Home')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });

  }
  
  
  const [userData, setUserData] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '576805930825-rqainm4245iha106npf8d7bgb55s2p2s.apps.googleusercontent.com',
    });
  }, [])
  async function onGoogleButtonPress() {
    try{
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);

      navigation.navigate('Home');
    }
    catch(error){
      console.log('hata :'+error);
    }
  }

  async function facebookLogin() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    navigation.navigate('Home')

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);

  }
  

  return (
    <ScrollView>
      <View style={appStyles.container}>


      <Image style={{height:220,width:250, borderRadius:15, alignSelf:'center',marginBottom:20 }}
        source = {require('Mountain/pictures/login.png')}/>

        <Text style={{fontSize:40, marginBottom:10, alignSelf:'center', color:'yellow',backgroundColor:'#111111'}}>Welcome</Text>
        <View style={appStyles.ViewContainer}>
          <Icon name="user" size={40} color="#666" style={{marginRight:5}} />
          <TextInput placeholder='Email ID' style={{flex:1, fontSize:17, fontWeight:'700'}} 
            onChangeText={handleName}
          />
        </View>

        <View style={appStyles.ViewContainer}>
          <Icon name="lock" size={40} color="#666" style={{marginRight:5}} />
          <TextInput placeholder='Password' 
          style={{flex:1}}
          secureTextEntry={true}
          onChangeText={handlePass}
           />
           <TouchableOpacity onPress={() => {}}>
              <Text style={{color:'#AD40AF', fontWeight:'500', fontSize:25}}>Forgot</Text>
           </TouchableOpacity>
        </View>
        
        <TouchableOpacity>
        <Text style={{
            height:50,
            fontWeight:'700',
            fontSize:20,
            color:'white',
            margin:10,
            backgroundColor:'#ba34eb',
            justifyContent: "center" ,
            textAlign: 'center',
            borderRadius:10,
            paddingTop:10,
          }}
          onPress = {
            () => loginUser(name, pass)
         }
          >Login</Text>
        </TouchableOpacity>

        <Text style={{textAlign:'center', color:'black', fontWeight:'800', marginTop:10, marginBottom:15}} >Or. login with...</Text>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>

        <TouchableOpacity style={{borderWidth:1, borderColor:'#03fcdf', borderRadius:15, paddingVertical:10, paddingHorizontal:30}} onPress={onGoogleButtonPress}>
        <Image style={{height:50,width:50, borderRadius:15}}
        source = {require('Mountain/pictures/google.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style={{borderWidth:1, borderColor:'#03fcdf', borderRadius:15, paddingVertical:10, paddingHorizontal:30}} 
        onPress={() => facebookLogin().then((res) => setUserData(res), console.log(userData)) }>
        <Image style={{height:50,width:50, borderRadius:15}}
        source = {require('Mountain/pictures/facebook.png')}/>
        </TouchableOpacity>
        
        <TouchableOpacity style={{borderWidth:1, borderColor:'#03fcdf', borderRadius:15, paddingVertical:10, paddingHorizontal:30}} onPress={() => {}}>
        <Image style={{height:50,width:50, borderRadius:15}}
        source = {require('Mountain/pictures/twitter.png')}/>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
        <Text style={{fontSize:20}}>New to the app? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} >
          <Text style={{color:'#AD40AF', fontWeight:'700',fontSize:20}}>Register</Text>
        </TouchableOpacity>
        </View>
        

        
      </View>
    </ScrollView>
  )
};

export default Input



