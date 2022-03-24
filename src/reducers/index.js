import { combineReducers } from "redux";
import { reducer} from './reducer'

const reducers = combineReducers({
  category: reducer,
});

export default reducers;
