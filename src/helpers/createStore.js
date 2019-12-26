import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Axios from "axios";

import reducers from "../client/reducers";

// server-side store
export default req => {
  const axiosInstance = Axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: { cookie: req.get("cookie") || "" }
  });

  const store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
