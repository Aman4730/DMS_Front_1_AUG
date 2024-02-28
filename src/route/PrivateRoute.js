import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const { isLogin, guestlogin } = useContext(AuthContext);

  return (
    // <Route
    //   exact={exact}
    //   render={(props) =>
    //     isLogin || (guestlogin && guestlogin.success) ? (
    //       <Component {...props} {...rest} />
    //     ) : (
    //       <Redirect to={`${process.env.PUBLIC_URL}/logout`} />
    //     )
    //   }
    // />
    <Route
      exact={exact}
      render={(props) =>
        isLogin || (guestlogin && guestlogin.success) ? (
          <Component {...props} {...rest} />
        ) : isLogin ? (
          <Redirect to={`${process.env.PUBLIC_URL}/logout`} />
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/auth-login`} />
        )
      }
    />
  );
};

export default PrivateRoute;
