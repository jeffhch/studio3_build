const value =[]
const ResponsesRecordReducer = (state = value,action)=>{
// switch(action.type){
    //case 'AddItem':
      //  return state.append(action.payload;
      //switch(action.type){
        //  case 'AddItem':
               //return state.push(4)
      //}
//}
switch(action.type){
    case 'ADDRESPONSE':
        state.push(action.yourRes)
         return state;
    default:
        return state;
}
};

export default ResponsesRecordReducer;