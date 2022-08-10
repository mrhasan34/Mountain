import React, { useState } from 'react'
import { SafeAreaView, View,Button,Alert, Text,Image ,StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

import CheckBox from '@react-native-community/checkbox';
import { appStyles } from './styles';


function RegisterScreen({navigation}) {

  const [isSelected, setSelection] = useState(false);
  const [text, setText] = useState();
  const [tasks, setTasks] = useState([]);

  const [email, setEmail]= React.useState('');
  const [password, setPassword]= React.useState('');
  const [password2, setPassword2] = React.useState('');
  const handleEmail = (text) => {
    setEmail(text);
  }
  const handlePassword = (pass) => {
    setPassword(pass);
  }
  const handlePassword2 = (pass) => {
    setPassword2(pass);
  }
  


  const createUser = (email, password) => {
    if(password==password2){
      auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
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
    } else{
      console.log("passwordlar eşleşmiyor");
    }
  }


  return (
   
      <View style={appStyles.container}>

      <Text style={{fontSize:20, fontWeight:'bold' , alignSelf:'center', marginBottom:20, color:'black', marginRight:20 }}>Create Account</Text>

      <View style={{flexDirection:'row'}}>
          <Icon name="user" size={30} color="#666" style={{marginRight:5}} />
        <TextInput
        placeholder='kullanıcı adı@gmail.com' style={{flex:1, height:40, marginBottom:10, fontSize:20, fontWeight:'700', borderBottomWidth:1, backgroundColor:'white'}}
        onChangeText={handleEmail}/>
      </View>

      <View style={{flexDirection:'row'}}>
            <Icon name="lock" size={30} color="#666" style={{marginRight:5}} />
              <TextInput 
              placeholder='password' style={{flex:1, height:40, marginBottom:10, fontSize:20, fontWeight:'700', borderBottomWidth:1, backgroundColor:'white'}}
              secureTextEntry={true}
              onChangeText={handlePassword}/>

        </View>

        <View style={{flexDirection:'row'}}>
            <Icon name="lock" size={30} color="#666" style={{marginRight:5}} />
              <TextInput 
              placeholder='RePassword' style={{flex:1, height:40, marginBottom:10, fontSize:20, fontWeight:'700', borderBottomWidth:1, backgroundColor:'white'}}
              secureTextEntry={true}
              onChangeText={handlePassword2}/>
      </View>

      <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:18}}>Kullanım şartlarını <Text style={{color:'red'}}> okudum</Text> ve <Text style={{color:'red'}}> kabul ediyorum</Text>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={{height:3}}
              />
              </Text>
      </View>

      <View style={{marginTop:5, marginBottom:5}}>
                {
                  isSelected ? (
                    <Button
                    style={{flex:1, height:30}}
                    title="Kullanıcı Oluştur"
                    onPress={() => createUser(email, password)}
                  />
                  ) : null
                }
              
              </View>

              <Image style={{height:240,width:240, borderRadius:15, alignSelf:'center',marginTop:10, backgroundColor:'yellow' }}
              source = {require('Mountain/pictures/yinyang.png')}/>


      </View>
   
  );
}

export default RegisterScreen;