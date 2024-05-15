import {
  Route,
  Outlet,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Home } from "./pages/user";
import { Login } from "./pages/auth";

import { Layout } from "./components";
import { useSelector } from "react-redux";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<Home />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Layout /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Router;
