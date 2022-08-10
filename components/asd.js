import React, { useState } from 'react'
import { SafeAreaView, TextInput,Text, View, TouchableOpacity, FlatList } from 'react-native'
import { appStyles } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';


useEffect(function() {
  console.log("use effect calıstı")
  const ref = storage().ref('images/');
  ref.listAll().then((result) => {
    result.items.forEach((itemsRef) => {
      itemsRef.getDownloadURL().then((downloadURL) => {
        setImageTab(downloadURL);
        console.log("image tab: "+imageTab)
      }); 
    });    
  });
  
  setUploading(false);
}, [Storage]); 

<ScrollView>
          {
            imageTab.map(image => {
              return (
                <Card >
                  <Image style={{height: 200, width: 200}} source={{uri: image}} />
                </Card>
              )
            })
          }
        </ScrollView>


<Stack.Navigator initialRouteName="appForTabNavigator">
        <Stack.Screen name="input" component={Input}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

        <Stack.Screen name="appForTabNavigator" component={appForTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>


function TodoList({navigation}) {
  const [task, setTask] = useState({
    space:''
  });


  const deleteDatabase = async (id) => {
    const res = await firestore().collection('tasks').doc(id).delete()
    console.log(res)
  }

  const createTask = async (task) => {
    try{
      await firestore().collection('tasks').add(task)
      console.log("database e gönderildi")
    }catch(error){
      console.log(error)
    }

  };

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
        <Text style={appStyles.subtitle}>
        enter your tasks in the text box below and press the Add button
        </Text>

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

        <FlatList
        data={tasks}
        renderItem={({item, index}) => (
          <View style={appStyles.taskContainer}>
            <Text style={appStyles.taskText}>{item}</Text>
            <TouchableOpacity 
            style={appStyles.taskDelete}
            onPress={() => deleteDatabase(tasks.id)}
            >
              <Text style={appStyles.taskDeleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        />

      </View>
    </SafeAreaView>
  )
}

export default TodoList