import {DRAG_START_AT} from "./actionType"

const INIT_STATE = {
    eventObj:"",
    ref:"",
    initalPos:""
}

export default (state=INIT_STATE,action)=>{
    switch(action.type){
        case DRAG_START_AT: {
            return {
                ...state,
                 ...action.payload
                
            }
        }
        default: return state; 
    }
}