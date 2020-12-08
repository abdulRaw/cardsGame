import { LOG_IN } from "./actionType";

const INIT_STATE = {
  isLogined: false,
  userName : ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        isLogined:true,
        userName : action.payload
      };
    }
    default:
      return state;
  }
};
