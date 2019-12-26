// startup point for client side application
// this file is used to breath logic like event handelers into html
// which has already rendered before
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import thunk from "redux-thunk";
import Axios from "axios";

import Routes from "./Routes";
import reducers from "./reducers";

// we will have to use BrowserRouter for client side
// but we can't use it for our server side
// because it expects an address bar but server dose'nt have any address bar
// we will use StaticRouter for server side

// creating client axios instance
const axiosInstance = Axios.create({
  baseURL: "/api"
});

// client-side store
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// hydrate function is used to re hydrate the html page
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
