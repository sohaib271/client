import {createSlice} from "@reduxjs/toolkit"


const initialState={
  loggedInUser:null
};

const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    addUser:(state,action)=>{
      state.loggedInUser={
        id:action.payload.id,
        name:action.payload.name,
        image:action.payload.image,
        email:action.payload.email,
        role:action.payload.role,
      }
    },

    removeUser:(state)=>{
      state.loggedInUser=null
    }
  }
});

export const {addUser,removeUser}=authSlice.actions;

export default authSlice.reducer;