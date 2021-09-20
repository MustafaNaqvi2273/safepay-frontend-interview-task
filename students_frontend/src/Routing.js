import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './Components/Home';

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routing;