// startup point for server side rendering
import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";

import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import Routes from "./client/Routes";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    }
  })
);
app.use(express.static("public"));

app.get("*", (req, res) => {
  // get the store
  const store = createStore(req);

  // do some data manipulation and pass store to the component
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      // take all promises and check one by one
      // cover that promise by an outer promise
      // check if promise is resolved or rejected
      // in either case resolve the outer promise
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    console.log(context);
    if (context.url) return res.redirect(301, context.url);

    if (context.notFound) res.status(404);

    // sends the html to user
    res.send(content);
  });
});

app.listen(3000, () => console.log("runnin"));
