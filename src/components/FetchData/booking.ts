import {api,store} from "../exporter/exporter";
import { useQuery } from "@tanstack/react-query";

const fetchBookings=async ()=>{
  const res=await api.get(`${import.meta.env.VITE_API_URL}/table/all/${store.getState().auth.loggedInUser.id}`);
  if(!res) throw new Error("Error fetching Bookings");

  const allBookings=res.data;

  return allBookings.myBookings || allBookings.allBookings;
}

export const useBookings=()=>{
  return useQuery({
    queryKey:["booking"],
    queryFn:fetchBookings,
    retry:false
  })
}