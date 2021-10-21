import React from "react";
import { StyleSheet, View,Text} from "react-native";


const Header = props =>{
 return(   
<Text style={styles.title}>Questions and Answers(Q&A)</Text>
    
  

 );
};

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold',
        fontSize:20
    }

});

export default Header;