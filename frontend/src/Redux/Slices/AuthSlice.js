import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
import { jwtDecode } from "jwt-decode";


const tokenExpired = (token) => {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    console.warn("Token is missing or invalid.");
    return true; 
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return true;
  }
};

const setIsLoggedInInLocalStorage = (value) => {
  localStorage.setItem("isLoggedIn", JSON.stringify(value));
};

const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: token && !tokenExpired(token),
  role: localStorage.getItem("role") || "",
  token: token || undefined,
  data: (() => {
    const data = localStorage.getItem("data");
    if (data && data !== "undefined") {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse JSON data from localStorage", e);
        return {};
      }
    }
    return {};
  })(),
};

setIsLoggedInInLocalStorage(initialState.isLoggedIn);

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data, { rejectWithValue }) => {
    try {
      // Wrap the actual API call with toast.promise
      const res = await toast.promise(
        axiosInstance.put(`user/update/${data[0]}`, data[1]),
        {
          loading: "Wait! Profile update in progress...",
          success: "Profile updated successfully!",
          error: "Failed to update profile",
        }
      );

      return res.data; // Return the response data if successful
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage); // Display error message as toast
      return rejectWithValue(errorMessage); // Reject with the error message
    }
  }
);



export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.post("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const changePassword = createAsyncThunk(
  "/user/ChangePassword",
  async (data) => {
    try {
      const res = axiosInstance.post("user/change-password", data);
      toast.promise(res, {
        loading: "Wait! Change password in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change to Password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", action?.payload?.token);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export default authSlice.reducer;
