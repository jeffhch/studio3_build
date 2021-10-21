import React,{useState} from "react";
import { StyleSheet, View,Text,Button} from "react-native";


import QAndAHome from "./components/QAndAHome";
import Header from "./components/Header.js";
import CreateButton from "./components/CreateButton.js";
import CreatePost from "./components/CreatePost";
import { createStore } from "redux";
import allReducers from "./store/index";
import {Provider} from 'react-redux';

const store = createStore(
 allReducers

);

//let a 
//let b =2

//function validation(){
  //if (b>1){
    //a=<Text>The home screen is not exported</Text>
    //return a;
 // } else{
  // a=<QAndAHome/>
  // return a;
  //}

//}


export default function App(){

  //const [currentStatus, setCurrentStatus] = useState(false);
 // function change_status(){
   // setCurrentStatus(true);
  //  console.log('it is working')
 // }
  return(
<Provider store={store}>
<QAndAHome/>
</Provider>
  );
};


const styles = StyleSheet.create({
   


});