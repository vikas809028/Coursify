import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";
import { Box, Flex, Image } from "@chakra-ui/react";
import loginImage from "../Assets/loginImage.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    // dispatch login action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <Flex className="flex flex-wrap flex-col gap-8 md:gap-4 md:flex-row py-16 lg:py-2 justify-around items-center lg:justify-around lg:min-h-[76vh]  px-4">
        <Box>
          <Image loading="lazy"
            src={loginImage}
            boxSize={{sm:"400px",md:"400px",lg:"550px"}}
            objectFit={"contain"}
            borderRadius={"full"}
          ></Image>
        </Box>

        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col gap-5 bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-center text-2xl lg:text-3xl font-bold text-gray-800">
            Login
          </h1>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition-all duration-300"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Flex>
    </HomeLayout>
  );
}

export default Login;
