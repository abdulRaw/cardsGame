import React from 'react';
import {Switch,Route} from "react-router-dom";
import Game from "./components/game/game";
import Home from "./components/Home/home";
import PageNotFound from "./components/pageNotFound/pageNotFound"
import './App.css';

function App() {
  return (
   
    <div className="App">
     <Switch>
      <Route path="/game" component={Game}/>
      <Route Path ="/" component ={Home}/>
      <Route component ={PageNotFound}/>
     </Switch>

    </div>
  );
}

export default App;
