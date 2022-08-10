import { View, Text } from 'react-native'
import React from 'react'

const Home = () => {
    return (
        <NavigationContainer>
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
              
              <Tab.Screen name='Hobbies' component={Hobbies} options={{
              headerShown: false,
              tabBarLabel:'todo list',
              tabBarIcon: ({color, size}) => (
                <Icon name='lock'
                color={color}
                size={size}
                />
              )
              }}
              ></Tab.Screen>
          </Tab.Navigator>    
        </NavigationContainer>
    
      );
}

export default Home