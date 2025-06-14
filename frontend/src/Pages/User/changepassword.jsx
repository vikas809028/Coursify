import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isValidPassword } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword, getUserData } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.oldPassword || !data.newPassword || !data.confirmNewPassword) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isValidPassword(data.newPassword)) {
      toast.error("Password should be 6 - 16 characters long with at least a number and special character");
      return;
    }
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    await dispatch(changePassword(data));
    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[81vh] lg:min-h-[76vh] p-4">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-6 w-full max-w-md bg-white shadow-lg backdrop-blur-md border border-gray-200"
        >
          <h1 className="text-center text-3xl font-bold text-gray-800">Change Password</h1>

          {/* Old Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="oldPassword" className="text-lg font-medium text-gray-700">
              Old Password
            </label>
            <input
              required
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter your old password"
              className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.oldPassword}
              onChange={handleInputChange}
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-lg font-medium text-gray-700">
              New Password
            </label>
            <input
              required
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.newPassword}
              onChange={handleInputChange}
            />
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmNewPassword" className="text-lg font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              required
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="Confirm your new password"
              className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.confirmNewPassword}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-md py-2 text-lg font-semibold tracking-wide text-white shadow-md"
          >
            Change Password
          </button>

          {/* Back to Profile Link */}
          <Link to="/user/profile">
            <p className="text-gray-600 hover:underline cursor-pointer flex items-center justify-center gap-2 text-sm">
              <AiOutlineArrowLeft className="text-lg" /> Back to Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
