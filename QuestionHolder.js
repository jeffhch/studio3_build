import { setStatusBarBackgroundColor } from "expo-status-bar";
import React from "react";
import { StyleSheet, View,Text, BackHandler} from "react-native";

const QuestionHolder = props =>{
    return(   
        <View style={styles.questionView}>
 
       </View>
     
   
    );
   };
   
   const styles = StyleSheet.create({
    questionView:{
        height:20,
        width:'100%',
        backgroundColor:'#b0e0e6'

    }
   
   });
   
   export default QuestionHolder;