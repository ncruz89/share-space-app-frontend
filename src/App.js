import React, { useContext, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/Context/auth.context";

import MainNav from "./shared/components/Navigation/MainNav/MainNav.component";
import Users from "./users/pages/Users/Users.component";
import Spinner from "./shared/components/UIElements/Spinner/Spinner.component";

const NewPlace = React.lazy(() =>
  import("./places/pages/NewPlace/NewPlace.component.")
);
const UserPlaces = React.lazy(() =>
  import("./places/pages/UserPlaces/UserPlaces.component")
);
const UpdatePlace = React.lazy(() =>
  import("./places/pages/UpdatePlace/UpdatePlace.component")
);
const Auth = React.lazy(() => import("./users/pages/Auth/Auth.component"));

const App = () => {
  const { isLoggedIn, login } = useContext(AuthContext);

  // auto login functionality using localStorage and token + a token timer
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new">
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Router>
      <MainNav />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <Spinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
