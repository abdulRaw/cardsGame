import React, { useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {MY_SITE_NAME} from ".././AppContants"
import { loginActionCreator } from "./reduxLogin/actionCreator";
import {connect} from "react-redux"
const Login = (props) => {
    const history = useHistory();
  const [userName, setUserName] = useState(
    localStorage.getItem(MY_SITE_NAME+"_User") || ""
  );
  useEffect(() => {
    localStorage.setItem(MY_SITE_NAME+"_User", userName);
  }, [userName]);

  const handleLogin =()=>{
      props.loginActionCreator(userName);
     history.push('/game');
  }

  return (
    <div className={"login"}>
   <label>User Name : </label>
      <input
        name="user"
        value={userName}
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button onClick = {handleLogin}>Login</button>
    </div>
  );
};



export default connect(null,{loginActionCreator})(Login);
