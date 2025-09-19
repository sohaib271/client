import { useDispatch, useSelector } from "react-redux";
import {AlreadyLoggedInPopup,api,useLoading,removeData,persistor,SpinnerContainer} from "../exporter/exporter";
import { useNavigate } from "react-router-dom";


export function ConfimBooking(){
  const items=useSelector((state:any)=> state.booking.items);
  const dispatch=useDispatch();
  const {startLoading,stopLoading}=useLoading();
  const navigate=useNavigate();
  const bookingData=useSelector((state:any)=> state.booking.bookingData);
  const reserved_from=new Date(bookingData.reserved_from).toISOString();
  const reserved_to =new Date(`${bookingData.reserved_from.split("T")[0]}T${bookingData.reserved_to}`).toISOString();

  const sendData=async()=>{
    try {
      startLoading();
      const res=await api.post(`${import.meta.env.VITE_API_URL}/table/book`, {items,table_no:bookingData.table_no,booked_by:bookingData.booked_by,reserved_from,reserved_to});
      if(res.data.msg) stopLoading(); console.log("Table not booked");
      dispatch(removeData());
      persistor.purge();
      stopLoading();
      navigate("/dashboard")
    } catch (error) {
      console.log("Error posting data")
    }

  }

  return <>
    <SpinnerContainer/>
    <AlreadyLoggedInPopup heading="Payment Successful" paragraph="Your table has been booked. Check dashboard for further information." onConfirm={sendData} buttonContent="Click to Confirm"/>
  </>
}

