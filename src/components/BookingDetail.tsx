import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Clock, Calendar, User, Hash, DollarSign, CheckCircle,Utensils } from "lucide-react";
import {useBookings,useBookingData,SpinnerContainer,api,useLoading, Spinner} from "./exporter/exporter"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface RootState{
  auth:{
    loggedInUser:any
  }
}

export default function BookingDetails() {
  const [status, setStatus] = useState("Reserved");
  const userData=useSelector((state:RootState)=>state.auth.loggedInUser);
  const {startLoading,stopLoading}=useLoading();
  const {data:booking,isLoading}=useBookings();
  const {bookingId}=useParams();
  const updateStatus=async(st)=>{
    startLoading();
    const res=await api.patch(`${import.meta.env.VITE_API_URL}/table/update-status/${bookingId}`, {st} );
    if(res.data.msg) stopLoading(); console.log("Status not updated");
    setStatus(st);
    stopLoading();
  }

  const refinedData=useBookingData(booking || []);
  const matchedBooking=useMemo(()=>refinedData.find((b) => b.id===Number(bookingId)),[refinedData]);
  const today=new Date();
  const time=today.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
  const dt=today.toLocaleDateString();
  
  const handleDownloadSlip = () => {
    const doc=new jsPDF({
      unit:'mm',
      format:[70,80]
    });
    doc.setFontSize(10);
    doc.text(`Booking ID : ${matchedBooking.id}`, 20,15);

    doc.setFontSize(8);

    doc.text(`Table No : ${matchedBooking.table}`,10,20);
    doc.text(`Date : ${matchedBooking.reservedDate}`,10,25);
    doc.text(`Reservation Timing : ${matchedBooking.reservedFrom} - ${matchedBooking.reservedTo}`,10,30);
    doc.text(`Payable Price : Rs ${matchedBooking.payablePrice - Math.round(matchedBooking.payablePrice * 0.3)}`,10,35);

    doc.save("finedineBookingreceipt.pdf");
  };

  if(isLoading) return <Spinner/>
  return (
    <>
    <SpinnerContainer/>
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-neutral-800 border border-gold text-white shadow-lg rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
            src={matchedBooking.userImage}
            alt="Customer"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-gold animate-fade"
          />
                <span className="font-semibold text-lg">{matchedBooking?.userName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Hash size={16} className="text-gold" />
                <span>{matchedBooking.id}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-gold font-semibold">Booked Dishes</h2>
              <div className="grid grid-cols-2 gap-4">
                {matchedBooking.items.map((dish) => (
                  <motion.div
                    key={dish.item_id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-neutral-700 rounded-xl p-3 flex flex-col items-center"
                  >
                    <img
                      src={dish.item.item_image}
                      alt={dish.item.item_name}
                      className="w-20 h-20 rounded-lg object-cover border border-gold"
                    />
                    <p className="mt-2 text-sm">{dish.item.item_name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-gold" size={18} />
                <span>Payable Price: Rs {matchedBooking.payablePrice - Math.round(matchedBooking.payablePrice * 0.3)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="text-gold" size={18} />
                <span>Table No : {matchedBooking.table}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-gold" size={18} />
                <span>Timing: {matchedBooking.reservedFrom} - {matchedBooking.reservedTo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-gold" size={18} />
                <span>Date: {matchedBooking.reservedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gold">Status:</span>
                <span>{matchedBooking.status}</span>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              {(matchedBooking.status === "Reserved" && userData.role==="Admin") && (
                <Button
                  onClick={()=>updateStatus("Served")}
                  className="bg-gold text-black hover:bg-yellow-400 rounded-xl px-4"
                  disabled={time<matchedBooking.reservedFrom || dt<matchedBooking.reservedDate}
                >
                  Mark as Served
                </Button>
              )}
              {userData.role==="Customer" && matchedBooking.status==="Reserved" && <Button
                onClick={handleDownloadSlip}
                className="bg-white text-black hover:bg-gray-200 rounded-xl px-4 flex items-center space-x-2"
              >
                <Download size={16} /> <span>Download Slip</span>
              </Button>}
            </div>
            {userData.role==="Customer" && <p className="text-gold text-xs">Note : You have to show the downloaded slip on Reception</p>}
            {((time<matchedBooking.reservedFrom || dt<matchedBooking.reservedDate) && userData.role==="Admin") && <p className="text-gold text-xs">Note : This button is disabled till reservation time</p>}
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </>
  );
}
