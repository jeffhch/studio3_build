import React,{useState} from "react";
import { render } from "react-dom";
import { StyleSheet, View,Text,Button,TextInput,Modal} from "react-native";
import { useSelector } from "react-redux";

const CreatePost = props =>{
  
  //  let mode= props.state
    //function change_mode(){
      //  mode = false;
    //}
   // let mode = props.state
 //   function change_status(){
   //     console.log(props.state)
     //   props.state=false
    //console.log(props.state)
   
    //}
    const [currentName, setCurrentName]=useState("");
    const [currentTitle, setCurrentTitle]=useState("");
    const [currentQuestion, setCurrentQuestion]=useState("");
    const theInfo = [currentName,currentTitle,currentQuestion];
    const concatText = "Name: "+ currentName+"   Topic: "+currentTitle+"   Question: "+currentQuestion;


    return( 
        <Modal visible={props.state}  transparent>

        <View style={styles.outer_View}>
        <View style={styles.view_Size}>  

        <View style={styles.nameEntry}>
        <Text>Name:</Text>
        <TextInput style={{height:'70%', width:'95%',borderColor:'gray',borderWidth:1}}
        placeholder="Please enter your name"
        onChangeText={(val)=>setCurrentName(val)}
        />
         </View>

         <View style={styles.titleEntry}>
        <Text>Title:</Text>
        <TextInput style={{height:'100%',width:'95%',borderColor:'gray',borderWidth:1}}
        placeholder="Please enter your title here"
        onChangeText={(val)=>setCurrentTitle(val)}
        />
        </View>

        <View style={styles.questionEntry}>
        <Text>Your Question:</Text>
        <TextInput style={{height:'100%',width:'95%',borderColor:'gray',borderWidth:1}}
        placeholder="Please enter your question"
        onChangeText={(val)=>setCurrentQuestion(val)}
        />
        </View>

         <View style={styles.buttonWrap}>
        <View style={styles.button_view}>
        <Button title="Submit" onPress={() => props.submit(concatText,currentName,currentTitle,currentQuestion)}/>
        <Button title="Cancel" onPress={props.cancel} color='red'/>
        </View>
        </View>

   </View>
   </View>
   </Modal>
   
    );
   };
   
   const styles = StyleSheet.create({
       view_Size:{
           marginTop:10,
           width:'90%',
           height:'90%',
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:'#f0f8ff'
       },
       outer_View:{
           justifyContent:'center',
           alignItems:'center',
     
       },
       button_view:{
           flexDirection:'row',
           justifyContent:'space-between',
           height:'30%',
           
           
           
          
       },
       nameEntry:{
         //flexDirection: 'row',
         height:'15%',
         width:'100%',
         margin:5

       },
       titleEntry:{
        // flexDirection:'row',
         height:'10%',
         width:'100%',
         margin:20
       },
       questionEntry:{
        // flexDirection:'row',
         height:'40%',
         width:'100%',
         margin:15
       },
       buttonWrap:{
         height:'20%',
         margin:12
       }
   

  
  
   
   });
   
   export default CreatePost;