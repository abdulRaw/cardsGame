import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import GameBoard from "./gameBoard/gameBoard"


const Game = (props) => {
    const {userName,isLogined} = props

    console.log(props)
return ( <>{isLogined ? <><h3>Welcome {userName}</h3><GameBoard/> </> : <Redirect to="/"/>}</> );
}

const mapPropsToState =(store)=>{
    return {
        userName : store.userReducer.userName,
        isLogined: store.userReducer.isLogined
    }
}

export default connect(mapPropsToState,null)(Game);