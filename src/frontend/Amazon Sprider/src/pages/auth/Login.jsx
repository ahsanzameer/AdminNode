import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button, Page } from "../../components";
import { setUser } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("test@gmail.com");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [password, setPassword] = useState({
    isVisible: false,
    value: "12345678",
  });

  console.log("user", user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword({ ...password, value });
    }
  };

  const togglePassword = () =>
    setPassword((prev) => ({ ...prev, isVisible: !prev.isVisible }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setToggleBtn(true);
    const response = await loginApi(e);
    if (response.data?.status == 200) {
      dispatch(setUser(response.data?.data));
      setToggleBtn(false);
    } else if (response.data?.error?.message == "Incorrect Email or Password") {
      console.log("else error ====>");
      setToggleBtn(false);

      // setError(true);
    }
  };

  return (
    <Page
      title="Login"
      containerStyles="!h-screen !w-screen flex justify-center items-center"
    >
      <main className="w-full max-w-sm mx-4">
        <section className="w-full pb-5 overflow-hidden bg-white border rounded-lg shadow-2xl">
          <div className="px-6">
            <h1 className="my-5 text-xl font-bold text-center text-primary-600">
              Admin Page
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={email}
                  className="block w-full px-4 py-3 text-xs font-medium text-gray-900 bg-gray-100 rounded-md outline-none focus:ring-primary-500 focus:border-primary-500 caret-primary-400"
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div className="flex items-center w-full mb-1 overflow-hidden text-xs font-medium text-gray-900 bg-gray-100 rounded-md focus:ring-primary-500 focus:border-primary-500">
                <input
                  type={password.isVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={password.value}
                  className="w-full px-4 py-3 text-gray-900 bg-gray-100 outline-none caret-primary-400"
                  placeholder="Password"
                  required={true}
                />
                <div className="w-10 text-lg text-primary-500">
                  {password.isVisible ? (
                    <AiFillEyeInvisible
                      onClick={togglePassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <AiFillEye
                      onClick={togglePassword}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="w-full text-right text-[11px] font-medium mb-3 mt-2">
                <Link
                  to={"/forgot-password"}
                  className="text-primary-400 hover:text-primary-500 hover:underline"
                >
                  {" "}
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={toggleBtn}
                title={toggleBtn ? "Logging in" : "Login"}
                extraStyles={toggleBtn ? "!py-2 !w-full" : "!py-3 !w-full"}
              />

              <div className="w-full text-center text-nowrap text-[11px] font-medium mt-3">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary-400 hover:text-primary-500 hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </Page>
  );
};

export default Login;
