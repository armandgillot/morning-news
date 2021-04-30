import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ScreenHome from "./ScreenHome";
import ScreenSource from "./ScreenSource";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import ScreenMyArticles from "./ScreenMyArticles";

import { Provider } from "react-redux";
import wishList from "./reducers/article";
import token from "./reducers/token";
import { createStore, combineReducers } from "redux";
const store = createStore(combineReducers({ wishList, token }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenSource} path="/screensource" exact />
          <Route
            component={ScreenArticlesBySource}
            path="/screenarticlesbysource/:id"
          />
          <Route component={ScreenMyArticles} path="/screenmyarticles" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
