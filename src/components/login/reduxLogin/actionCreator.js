import {LOG_IN} from "./actionType";

export const loginActionCreator = (userData)=>{
    return{
        type:LOG_IN,
        payload:userData
    }

}