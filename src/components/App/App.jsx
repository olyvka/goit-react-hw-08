import { Route, Routes } from "react-router-dom";
import Loyaut from "../Layout/Layout";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import { Bars } from "react-loader-spinner";
import css from "./App.module.css";

const HomePage = lazy(() => import("./../../pages/HomePage/HomePage.jsx"));
const RegistrationPage = lazy(() =>
  import("./../../pages/RegistrationPage/RegistrationPage.jsx")
);
const LoginPage = lazy(() => import("./../../pages/LoginPage/LoginPage.jsx"));
const ContactsPage = lazy(() =>
  import("./../../pages/ContactsPage/ContactsPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div className={css.loader}>
      <Bars
        height="80"
        width="80"
        color="#7277e3"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <Loyaut>
      <Suspense
        fallback={
          <div className={css.loader}>
            <Bars
              height="80"
              width="80"
              color="#7277e3"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Routes>
      </Suspense>
    </Loyaut>
  );
}
