import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getThemeFromStorage = () => {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const initialState = {
  user: { userName: "Ram" },
  theme: getThemeFromStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("logged in");
    },
    logoutUser: (state) => {
      state.user=null;
      localStorage.setItem('user',null);
      toast.success('Logged out Successfully')
      console.log("logged out");
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});
export default userSlice.reducer;
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
