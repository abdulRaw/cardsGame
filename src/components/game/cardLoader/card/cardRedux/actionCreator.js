import {DRAG_START_AT} from "./actionType"


export const cardDragActionOrigin = (data)=>{
    return{
        type:DRAG_START_AT,
        payload:data
    }

}