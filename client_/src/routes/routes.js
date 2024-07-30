import { lazy } from "react";
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  DASHBOARD_ROUTE,
} from "../utils";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export const privateRoutes = [
  {
    path: DASHBOARD_ROUTE,
    Component: Dashboard,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTER_ROUTE,
    Component: Register,
  },
];
