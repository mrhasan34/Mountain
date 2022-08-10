import React, { useEffect, useState } from 'react'
import { SafeAreaView, TextInput,Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { appStyles } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



function TodoList({navigation}) {
  const [task, setTask] = useState({
    space:'',
    type: 'note'
  });

  const [tasks, setTasks] = useState([]);

  const resetForm = () => {
    setTask({
      space:''
    })
  }
  
  const fetchTasks = async () => {
    const taskCollection = await firestore().collection('tasks').get()
    
    setTasks(
      taskCollection.docs.map((doc) => {
        return {...doc.data(), id:doc.id}
      })
    )
  }

  useEffect(() => {

    fetchTasks();

    firestore().collection('tasks').where("type","==","note").onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if(change.type == 'removed'){
          console.log('remove task :', change.doc.data())
        }
        fetchTasks()
      })
    })

  }, [])

  const deleteDatabase = async (id) => {
    const res = await firestore().collection('tasks').doc(id).delete()
    console.log(res)
  }

  const createTask = async (task) => {
    try{
      await firestore().collection('tasks').add(task)
      resetForm();
      console.log("database e gönderildi")
    }catch(error){
      console.log(error)
    }
  };

  const deleteTask = async (id) => {
    const res = await firestore().collection('tasks').doc(id).delete();
    console.log(res);
    fetchTasks();
  }

/* const [text, setText] =useState("");
  const [tasks, setTasks] = useState([]);

 /* const handleAddTaskPress = () =>{
    setTasks([...tasks, text]);
    setText("");

    setTask({space:text});
    createTask(task);
  };

  const handleDeleteTaskPress = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  }; */

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
        onPress={() => createTask(task)}
        >
          <Text style={appStyles.buttonText}>
            Add Text
          </Text>
        </TouchableOpacity>

        <View style={appStyles.divider} />

        <ScrollView>
          {
            tasks.map(task => {
              return (
                <Card key={task.id}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>{task.space}</Text>
                  <View style={{justifyContent:'flex-end', flexDirection:'row'}} >
                  <Icon
                  name='edit'
                  color={'blue'}
                  size={28}
                  onPress={() => navigation.navigate('Update', {
                    taskToUpdate: task
                  })}
                  />
                  <Icon
                  name='delete'
                  color={'red'}
                  size={28}
                  onPress={() => deleteTask(task.id)}
                  />
                  </View>
                  </View>
                </Card>
              )
            })
          }
        </ScrollView>


      </View>
    </SafeAreaView>
  )
}

export default TodoList