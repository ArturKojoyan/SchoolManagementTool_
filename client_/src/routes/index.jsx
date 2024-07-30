import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { isAuthSelector, setIsAuth } from "../store/slices/userSlice";

const AppRouter = () => {
  const isAuth = useSelector(isAuthSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setIsAuth(true));
    }
  }, [location.pathname, dispatch]);

  return (
    <Suspense fallback={<></>}>
      <Routes>
        {isAuth &&
          privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
