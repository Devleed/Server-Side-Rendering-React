import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";

import Routes from "../client/Routes";

export default (req, store, context) => {
  // gets all the raw html from the component
  // excluding the event handlers
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // pulls out meta and title tags from the component
  const helmet = Helmet.renderStatic();

  // creates html markup and adds client's bundle.js file in the end
  // client's bundle file loads and re-renders the component
  // with event handlers
  return `
    <html>
        <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        </head>
        <body>
            <div id="root">${content}</div>
            <script>
              window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <script src="bundle.js"></script>
        </body>
    </html>
  `;
};
