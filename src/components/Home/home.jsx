import React from "react";
import Login from "../login/login";

const Home = (props) => {
  return (
    <div className="Welcome">
      <h3>Welcome to Crads Deck...</h3>
      <p>Login to start Playing....Crads Deck</p>
       <Login/>
    </div>
  );
};

export default Home;
