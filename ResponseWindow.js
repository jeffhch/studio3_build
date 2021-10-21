import React,{useState} from "react";
import { StyleSheet, View,Text,Modal,Button,TextInput,ScrollView, Touchable} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import {additem,additem2,addIndex,addResponse} from '../store/actions/index'

//dispatch = useDispatch()


const ResponseWindow = props =>{
    theList = ["Hi,how are you1","Hi,how are you2","Hi,how are you3","Hi,how are you4","Hi,how are you5","Hi,how are you6","Hi,how are you7","Hi,how are you8","Hi,how are you9","Hi,how are you10","Hi,how are you11","Hi,how are you12","hi13","hi14","hi15"]
    const [boxValue,setBoxValue] = useState("")
    //const [output,setOutput]=useState("")
  const y= props.outcome


    //function addItem(){
        //dispatch(addResponse(boxValue))
    //}
       
    //}
 return(   
     <Modal visible={props.status} transparent>



<View style={styles.outerView}>




    <View style={styles.innerView}>






<View style={styles.responseView}>
    <Text style={{fontWeight:"bold"}}>All the responseses:</Text>
    <ScrollView style={styles.insideResponseView}>
  {y.map((item) => <Text key={item}>{item}</Text>)}
</ScrollView>
</View>

<View style={styles.answerView}>
<TextInput placeholder="This is the place for answering the question" style={{borderColor:'grey',borderWidth:1,height:"80%",width:"100%"}}  onChangeText= {(val)=>setBoxValue(val)}
/>

</View>

<View style={styles.buttonView}>
<Button title="Reply" onPress={()=>props.submit(boxValue)}/>
<Button title="Cancel" onPress={props.cancel} color='red'/>
</View>



</View>

</View>

</Modal>
    
  

 );
};

const styles = StyleSheet.create({

outerView:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:40,
    
},
innerView:{
justifyContent:"center",
alignItems:"center",
backgroundColor:'white',
height:"90%",
width:"90%"
},
questionView:{
   // backgroundColor:'darkgrey',
    height:"15%",
    width:"100%"


},
responseView:{
   // backgroundColor:'firebrick',
    height:"50%",
    width:"100%"

},
answerView:{
    //backgroundColor:'yellow',
    height:"20%",
    width:"100%"

},
buttonView:{
    flexDirection:'row',
           justifyContent:'space-between',
           height:'7%',
         //  backgroundColor:'orange',
           marginHorizontal:10
           
},
insideResponseView:{
width:"100%",
height:"40%",
//backgroundColor:'green'

}


});

export default ResponseWindow;