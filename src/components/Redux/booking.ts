import { createSlice } from "@reduxjs/toolkit";

const initialState={
  items:[],
  bookingData:{
    table_no:null,
    booked_by:null,
    reserved_from:null,
    reserved_to:null,
  }
};

const bookingSlice=createSlice({
  name:"booking",
  initialState,
  reducers:{
    addBookingItems:(state,action)=>{
      const newItem=action.payload;
      const existingItem=state.items.find(item => item.item_id===newItem.item_id);

      if(existingItem){
        existingItem.quantity+=newItem.quantity;
      }else{
        state.items.push(action.payload);
      }
    },
    addOtherDetails:(state,action)=>{
      state.bookingData={
        table_no:action.payload.table_no,
        booked_by:action.payload.booked_by,
        reserved_from:action.payload.reserved_from,
        reserved_to:action.payload.reserved_to
      }
    },
    removeData:(state)=>{
      state.items=[];
      state.bookingData={
        table_no:null,
        booked_by:null,
        reserved_from:null,
        reserved_to:null,
      }
    },

    deleteItem:(state,action)=>{
      const newItem=state.items.filter(i => i.item_id!==action.payload);
      state.items=newItem;
    }
  }
});

export const {addBookingItems,addOtherDetails,removeData,deleteItem}=bookingSlice.actions;

export default bookingSlice.reducer;