import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.data?._id);

  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name must be at least 5 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    try {
      const result = await dispatch(updateProfile([userId, formData]));
      if (updateProfile.fulfilled.match(result)) {
        await dispatch(getUserData());
        toast.success("Profile updated successfully!");
        navigate("/user/profile");
      } else {
        toast.error(result.payload || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Unexpected error occurred.");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[81vh] lg:min-h-[76vh]  p-4">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-6 w-full max-w-md bg-white shadow-lg backdrop-blur-md border border-gray-200"
        >
          <h1 className="text-center text-3xl font-bold text-gray-800">Edit Profile</h1>

          {/* Profile Image Upload */}
          <label className="cursor-pointer flex justify-center" htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full border-4 border-gray-300 transition-transform transform hover:scale-105 shadow-md"
                src={data.previewImage}
                alt="Preview"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 text-gray-400" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />

          {/* Input Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-lg font-medium text-gray-700">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-md py-2 text-lg font-semibold tracking-wide text-white shadow-md"
          >
            Update Profile
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

export default EditProfile;
