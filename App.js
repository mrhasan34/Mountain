// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from './components/Input';
import { appStyles} from '/styles';
import RegisterScreen from './components/RegisterScreen';
import TodoList from './components/TodoList';
import UpdateScreen from './components/UpdateScreen';
import Storage from './repository/storage';
import Photos from './repository/Photos';
import BridgePhotos from './repository/BridgePhotos';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Home() {
  return (
    <Tab.Navigator
        initialRouteName='todoList'
        screenOptions={{
          tabBarActiveTintColor:'tomato',
          tabBarInactiveTintColor:'gray'
        }}
      >
        <Tab.Screen name='todoList' component={TodoList} options={{
          headerShown: false,
          tabBarLabel:'todo list',
          tabBarIcon: ({color, size}) => (
            <Icon name='pencil'
            color={color}
            size={size}
            />
          )
          }}
          ></Tab.Screen>

<Tab.Screen name='Photos' component={Storage} options={{
          headerShown: false,
          tabBarLabel:'photos',
          tabBarIcon: ({color, size}) => (
            <Icon name='photo'
            color={color}
            size={size}
            />
          )
          }}
          ></Tab.Screen>
          
          
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Input'>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="TabNavigator" component={Home}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Input" component={Input} options={{ headerShown: false }} />
        <Stack.Screen name="Storage" component={Storage} options={{ headerShown: false }} />
        <Stack.Screen name="Photos" component={Photos} options={{ headerShown: false }} />
        <Stack.Screen name="BridgePhotos" component={BridgePhotos} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;