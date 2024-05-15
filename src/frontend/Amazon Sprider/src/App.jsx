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

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';



const Router = () => {
  return (
    <BrowserRouter>
      {/* <Routes> */}
        {/* <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<Home />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Home />} />
        </Route> */}
      {/* </Routes> */}

        <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
       

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />


  
        
        
      </Routes>
        {/* <Route path="*" element={<Error404 />} /> */}
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
