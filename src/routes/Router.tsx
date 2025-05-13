import { Route, Routes } from "react-router";
import { routes, type RouteConfig } from "./routeConfig";
import PrivateRouter from "./PrivateRouter";

function Router() {
  return (
    <Routes>
      {routes.map((router) => {
        if (router.children) {
          return (
            <Route
              key={router.path}
              path={router.path}
              element={<router.element />}
            >
              {getRoutesComponent(router.children)}
            </Route>
          );
        }
        let Component = <router.element />;
        if (router.isAuth) {
          Component = (
            <PrivateRouter>
              <router.element />
            </PrivateRouter>
          );
        }
        return <Route path={router.path} element={Component} />;
      })}
    </Routes>
  );
}

function getRoutesComponent(router: RouteConfig[]) {
  return router.map((router) => {
    if (router.children) {
      let Component = <router.element />;
      if (router.isAuth) {
        Component = (
          <PrivateRouter>
            <router.element />
          </PrivateRouter>
        );
      }

      return (
        <Route path={router.path} element={Component}>
          {getRoutesComponent(router.children)}
        </Route>
      );
    }
    let Component = <router.element />;
    if (router.isAuth) {
      Component = (
        <PrivateRouter>
          <router.element />
        </PrivateRouter>
      );
    }
    return <Route path={router.path} element={Component} />;
  });
}

export default Router;
