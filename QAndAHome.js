import React,{useState} from "react";
import { StyleSheet, View,Modal,TextInput,Button,Text,ScrollView,TouchableOpacity} from "react-native";

import Header from "../components/Header.js";
import CreateButton from "../components/CreateButton.js";
import CreatePost from "./CreatePost";
import QuestionHolder from "./QuestionHolder"
import ResponseWindow from "./ResponseWindow.js";
import { useSelector,useDispatch } from "react-redux";
import {additem,additem2,addIndex,addResponse} from '../store/actions/index'


const QAndAHome = props =>{
const [currentStatus, setCurrentStatus]=useState(false);
const a = useSelector(state => state.QuestionList)
const dispatch = useDispatch();
const [currentResponseWin,setCurrentResponseWin]=useState(false);
const indexNumber = 0;
const b=useSelector(state =>state.QuestionComponents) 
const currentIndex =useSelector(state => state.IndexValues)
const listIndex= 0;
const y = useSelector(state=>state.theResponses)





function change_Status(){
  setCurrentStatus(false)
  //console.log('hello')
  //console.log(a)
  //dispatch(additem(2))
  console.log(a)
  
 console.log(currentIndex)
  
  

}
function save_Question(info,name,topic,question){
//dispatch(AddItem(info))
dispatch(additem(info))
console.log(a)
addComponentSeparate(name,topic,question)
console.log(b)
//console.log(currentIndex)
//dispatch(addIndex())
//setCurrentIndex[currentIndex]
changeYourIndex()
//console.log(currentIndex)
  setCurrentStatus(false)

  
}
//let a = 'It is working'
function displayQuesiton(name,title, question){
  result = string.concat(name,title, question)
  console.log(result)
}

function changeResponseWinSt(){
  setCurrentResponseWin(false)
  //dispatch(addResponse(info))

}
function addComponentSeparate(name,topic,question){
dispatch(additem2(name,topic,question))
}
function whenQuestionIsClicked(){
  setCurrentResponseWin(true)
  //console.log(key.target.getAttritube("key"))
  //console.log(b[props.key])
}
function changeYourIndex(){
  dispatch(addIndex())
}
function accumulatedIndex(){
if (accumulatedIndex==0)
return accumulatedIndex
}
if (accumulatedIndex>0){
  accumulatedIndex= accumulatedIndex+1
  return accumulatedIndex
}



function handleKey(theItem){
index =a.indexOf(theItem)
return index
}

//function addToTheList(item){
//
//}
function appendTheArray(x){
dispatch(addResponse(x))
}

    return(   
        <View>
        <View style={styles.topView}>
          <Header/>
        </View>
        <ScrollView style={styles.middleView}>
          
          {a.map(item =><TouchableOpacity onPress={()=>whenQuestionIsClicked()} key={item.id}><Text style={styles.viewInsideMiddleView} key={item.id}>{item.question}</Text></TouchableOpacity>)}
        
        </ScrollView >
        <View style={styles.bottomView}>
        <Button title="Ask Questions" onPress={() =>setCurrentStatus(true)}/>
        </View>
        <CreatePost state={currentStatus} cancel={change_Status} submit={save_Question}/>
        <ResponseWindow status={currentResponseWin} cancel={changeResponseWinSt} submit={appendTheArray} outcome={useSelector(state=>state.theResponses)}/>
        </View>
   
    );
   };
   
   const styles = StyleSheet.create({
    topView:{
    
        width: '100%',
        height:'10%',
        backgroundColor:'#8a2be2',
        padding: 0,
        marginTop:40,
        justifyContent:'center',
        alignItems:'center'
        
        
      },
      middleView:{
        width:'100%',
        height:'77%',
        backgroundColor:'#d3d3d3'
        
      },
      bottomView:{
        width:'100%',
        height:'8%',
        backgroundColor:'#8a2be2',
        justifyContent: 'center',
        alignItems:'center'
        
        
        
      },
      viewInsideMiddleView:{
        margin:20,
        backgroundColor:'white',
        height:80
      }

  
   
   });
   
   export default QAndAHome;