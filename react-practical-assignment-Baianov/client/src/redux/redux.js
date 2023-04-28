import {configureStore} from "@reduxjs/toolkit";
import LoginPageSlice from "./Slices/LoginPageSlice";
import HomePageSlice from "./Slices/HomePageSlice";

export default configureStore({
    reducer: {
        loginPage: LoginPageSlice,
        homePage: HomePageSlice,
    }
})