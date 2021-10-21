const b =[]
const QuestionComponentsReducer = (state =b,action)=>{
// switch(action.type){
    //case 'AddItem':
      //  return state.append(action.payload;
      //switch(action.type){
        //  case 'AddItem':
               //return state.push(4)
      //}
//}
switch(action.type){
    case 'ADDITEM2':
        const theArray =[]
        theArray.push(action.userName)
        theArray.push(action.userTopic)
        theArray.push(action.userQuestion)
        theArray.push([])
        state.push(theArray)
        return state;
    default:
        return state;
}
};

export default QuestionComponentsReducer;