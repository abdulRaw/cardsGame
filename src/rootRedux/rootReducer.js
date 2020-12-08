import {combineReducers} from 'redux';
import userReducer from "../components/login/reduxLogin/reducer"
import gameBoardReducer from "../components/game/gameBoard/gameBoardRedux/reducer"
import cardReducer from "../components/game/cardLoader/card/cardRedux/reducer"





const rootReducer  = combineReducers({userReducer,gameBoardReducer,cardReducer})

export default rootReducer;