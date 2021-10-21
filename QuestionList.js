//import { useSelector } from "react-redux";
//currentLength = useSelector(state => state.QuestionList)
//currentLengthValues = currentLength.length-1
const a =[]
const QuestionListReducer = (state =a,action)=>{
// switch(action.type){
    //case 'AddItem':
      //  return state.append(action.payload;
      //switch(action.type){
        //  case 'AddItem':
               //return state.push(4)
      //}
//}
switch(action.type){
    case 'ADDITEM':
      //  const theArray =[]
        //theArray.push(action.payload)
        //theArray.push([])
        currentLengthValues= state.length
        const question ={id:currentLengthValues,
          question:action.payload
        }
        state.push(question);
        return state;
    //case 'ADDTO2PO':
        //amount = state.length
        //index =amount-1
      //  state[index][1].push(action.theIndex) 
    default:
        return state;
}
};

export default QuestionListReducer;