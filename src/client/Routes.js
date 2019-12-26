import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import App from "./App";
import AdminsList from "./pages/AdminsListPage";
import NotFound from "./pages/NotFoundPage";

console.log("routes ran");

// App is the root route and it's going to recieve routes array inside
// props.route.routes and it can display these routes by renderRoutes function
export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true
      },
      {
        ...AdminsList,
        path: "/admins"
      },
      {
        ...UsersListPage,
        path: "/users"
      },
      {
        ...NotFound
      }
    ]
  }
];
