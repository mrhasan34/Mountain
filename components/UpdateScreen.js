import React, { useEffect, useState } from 'react'
import { SafeAreaView, TextInput,Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { appStyles } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



const UpdateScreen = ({navigation, route}) =>  {
  const {taskToUpdate} = route.params
  const taskId = taskToUpdate.id


  const [task, setTask] = useState({
    space: taskToUpdate.space,
    type:'note'
  });

  const resetForm = () => {
    setTask({
      space:''
    })
  }

  const [tasks, setTasks] = useState([]);
  
  const fetchTasks = async () => {
    const taskCollection = await firestore().collection('tasks').get()
    console.log(taskCollection.docs)

    setTasks(
      taskCollection.docs.map((doc) => {
        return {...doc.data(), id:doc.id}
      })
    )
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const updateTask = async (task) => {
    try{
      await firestore().collection('tasks').doc(taskId).update(task)
      resetForm();
      console.log("database guncellendi")
      navigation.navigate('todoList')
    }catch(error){
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={appStyles.container}>

        <Text style={appStyles.title}>My Tasks {task.space}</Text>

        <TextInput style={appStyles.input} 
        placeholder="Enter your task" 
        value={task.space}
        onChangeText={(value) => {setTask({...task, space: value})}}
        />

        <TouchableOpacity 
        style={appStyles.buttonContainer}
        onPress={() => updateTask(task)}
        >
          <Text style={appStyles.buttonText}>
            Update task
          </Text>
        </TouchableOpacity>

        <View style={appStyles.divider} />

        

      </View>
    </SafeAreaView>
  )
}
 export default UpdateScreen;