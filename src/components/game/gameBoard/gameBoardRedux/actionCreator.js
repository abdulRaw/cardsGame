import {LOAD_DATA_FROM_LOCAL_STORAGE} from "./actionType"

export const cardsDataActionCreator = (data)=>{
    //console.log("called action.....",data);
    return{
        type:LOAD_DATA_FROM_LOCAL_STORAGE,
        payload : data
    }

}