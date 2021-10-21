const value =0
const IndexValuesReducer = (state = value,action)=>{
// switch(action.type){
    //case 'AddItem':
      //  return state.append(action.payload;
      //switch(action.type){
        //  case 'AddItem':
               //return state.push(4)
      //}
//}
switch(action.type){
    case 'ADDINDEX':
         return state+1;
    default:
        return state;
}
};

export default IndexValuesReducer;