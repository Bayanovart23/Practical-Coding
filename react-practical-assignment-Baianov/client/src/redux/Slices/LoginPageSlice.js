import {createSlice} from "@reduxjs/toolkit";

const LoginPageSlice = createSlice({
    name: 'login',
    initialState: {
        id: 1001,
    }
    ,
    reducers: {
        addUser(state, action){
            state.login = action.payload;
        },
        deleteUser(state, action){
            state.login = '';
        }
    }})

export const {addUser, deleteUser} = LoginPageSlice.actions;
export default LoginPageSlice.reducer;