import QuestionListReducer from "./reducers/QuestionList";
import QuestionComponentsReducer from "./reducers/questionComponents";
import IndexValuesReducer from "./reducers/indexValues";
import ResponsesRecordReducer from "./reducers/responsesRecord";

import { combineReducers} from "redux";

const allReducers = combineReducers({
    QuestionList : QuestionListReducer,
    QuestionComponents: QuestionComponentsReducer,
    IndexValues : IndexValuesReducer,
    theResponses : ResponsesRecordReducer
});

export default allReducers;