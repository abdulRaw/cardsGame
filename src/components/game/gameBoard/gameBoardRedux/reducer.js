import {LOAD_DATA_FROM_LOCAL_STORAGE} from "./actionType"

const INIT_STATE = {
    gameOver:false,
    cardsData : []
  };

  export default (state = INIT_STATE, action) => {
   // console.log("calling reducer...... of gameBoard.."," your action is => ",action.type);
    switch (action.type) {
      case LOAD_DATA_FROM_LOCAL_STORAGE: {
       // console.log(action.payload, "recived from action... in swithch")
        return {
          ...state,
          cardsData : action.payload
        };
      }
      default:
        return state;
    }
}