import {
  Route,
  Outlet,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Login } from "./pages/auth";

import { Layout } from "./components";
import { useSelector } from "react-redux";

import PageTitle from "./components/PageTitle";
import {
  ECommerce,
  Profile,
  Settings,
  AddPackage,
  ListPackage,
  CustomPackage,
  EditPackage,
  AddSetting,
  ListSetting,
  StoreDetails,
  Stores,
  CreateBlogs,
  YourBlogs,
} from "./pages/user";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            index
            path="/"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <ECommerce />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <Profile />
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <Settings />
              </>
            }
          />
          <Route
            path="/addpackage"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <AddPackage />
              </>
            }
          />
          <Route
            path="/listpackage"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <ListPackage />
              </>
            }
          />
          <Route
            path="/custompackage"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <CustomPackage />
              </>
            }
          />
          <Route
            path="/editpackage"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <EditPackage />
              </>
            }
          />
          <Route
            path="/addsetting"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <AddSetting />
              </>
            }
          />
          <Route
            path="/listsetting"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <ListSetting />
              </>
            }
          />
          <Route
            path="/stores"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <Stores />
              </>
            }
          />
          <Route
            path="/storedetails"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <StoreDetails />
              </>
            }
          />

          {/* // --------------------- */}
          <Route
            path="/createblogs"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <CreateBlogs />
              </>
            }
          />
          <Route
            path="/yourblogs"
            element={
              <>
                <PageTitle title="SHAFSAMAZONAFFILIATE IMPORTER" />
                <YourBlogs />
              </>
            }
          />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {/* <Route path="*" element={<Error404 />} /> */}
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Layout /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Router;
