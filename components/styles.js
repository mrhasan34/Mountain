import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
    container : {
        flex:1,
        margin:10,
    },
    title: {
        fontSize:20,
        margin:5
    },
    subtitle: {
        fontSize:20,
        marginTop:4,
        color:"#5142f5",
        margin:10
    },
    input : {
        //backgroundColor:'#14dce3',
        paddingHorizontal: 16,
        borderColor:'#eee',
        marginVertical: 12,
        borderRadius:6,
        borderWidth:10,
        fontSize:20 ,
    },
    buttonContainer: {
        backgroundColor:'#f7f305',
        paddingVertical:12,
        paddingHorizontal:16,
        borderRadius:6,
        alignItems:"center",
        marginTop:12,
        alignSelf:"flex-end",
    },
    buttonText: {     
        fontSize:18,
        fontWeight: "bold"

    },
    divider: {
        height:3,
        backgroundColor:'#ddd',
        marginVertical:32,
    },
    tasksText: {
        fontSize:28,
        fontWeight: "bold",
        margin:5,
    },
    taskContainer:{
        flexDirection:'row',
        marginBottom:8,
        borderBottomWidth:10,
        justifyContent:'space-between',
        padding:4,
        
    },
    taskText:{
        fontSize:20,
    },
    taskDelete:{
        backgroundColor:'red',
        height:32,
        width:32,
        borderRadius:16,
        alignItems:'center',
    },
    taskDeleteText:{
        fontSize:20,
        color:'white',
    },
});