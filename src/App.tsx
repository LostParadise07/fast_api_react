import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/dashboard";
import Index from './pages/index';
import SignIn from './pages/signin';
import SignUp from "./pages/signup";
import SavedArticle from "./pages/saved_article";
import PrivateRoute from './PrivateRoute';

function App() {

  

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/saved_articles" component={SavedArticle} />
        </Switch>
  </BrowserRouter>
  );
}

export default App;
