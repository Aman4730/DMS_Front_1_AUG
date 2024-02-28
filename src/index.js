import React, { Suspense, lazy } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Error404Modern = lazy(() => import("./pages/error/404-modern"));
// document.addEventListener("keydown", function (event) {
//   if (event.ctrlKey && event.key === "p") {
//     event.preventDefault();
//   }
// });
// document.addEventListener("contextmenu", function (event) {
//   event.preventDefault();
// });
// document.addEventListener("keyup", (e) => {
//   navigator.clipboard.writeText("");
// });
ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<div />}>
      <Router basename={`/`}>
        <Route
          render={({ location }) =>
            location.state && location.state.is404 ? (
              <Error404Modern />
            ) : (
              // <HashRouter>
              <App />
              // </HashRouter>
            )
          }
        />
      </Router>
    </Suspense>
  </React.Fragment>,
  document.getElementById("root")
);
reportWebVitals();
