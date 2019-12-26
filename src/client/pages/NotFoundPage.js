import React from "react";

const NotFound = ({ staticContext = {} }) => {
  // props.staticContext is comin from StaticRouter
  staticContext.notFound = true;
  return <h1>OOPs, Page not found</h1>;
};

export default {
  component: NotFound
};
