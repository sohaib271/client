import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Trash } from "lucide-react";
import {SetTimingForm} from "./exporter/exporter"
import { useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem,persistor } from "./exporter/exporter";

export default function MyTable() {
const items=useSelector((state:any)=>state.booking.items);
const user=useSelector((state:any)=>state.auth.loggedInUser);
const bookingItems=items.filter(i => i.addedBy===user.id);
  const dispatch=useDispatch();
  const [time,setTime]=useState(false);
  const totalPrice = useMemo(()=> bookingItems.reduce((acc,item)=>{
      var price=Number(item.item_price);
      const total= acc + price * item.quantity;
      return total;
    },0),[bookingItems]);
    
    function removeItem(id){
      dispatch(deleteItem(id));
      persistor.purge();
    }

  function setTiming(){
    setTime(true);
  }

  function cancel(){
    setTime(false);
  }

  return (
   <>
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      {time && <SetTimingForm items={bookingItems} onCancel={cancel}/>}
      <motion.h1
        className="text-3xl font-bold text-center text-gold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Table
      </motion.h1>

      <div className="space-y-6">
        {bookingItems?.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center bg-gray-800 rounded-xl shadow-md p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.item_image}
              alt={item.item_name}
              className="w-16 h-16 rounded-lg object-cover border-2 border-gold"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gold">{item.item_name}</h2>
              <p className="text-sm text-gray-300">Price: Rs. {item.item_price}</p>
              <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
            </div>
            <button onClick={()=>removeItem(item.item_id)} className="text-red-400 hover:text-red-600 transition">
              <Trash />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 bg-gray-900 rounded-xl p-4 shadow-lg text-center">
        <h2 className="text-xl font-semibold text-gold">
          Total: Rs. {totalPrice}
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          To confirm your booking, you need to pay{" "}
          <span className="text-gold font-medium">
            30% (Rs. {Math.round(totalPrice * 0.3)})
          </span>{" "}
          of the total price.
        </p>
      </div>

      {/* Sticky Button */}
      <div className="sticky bottom-4 flex justify-center mt-6">
        <Button onClick={setTiming} className="bg-gold text-black font-semibold hover:bg-yellow-500 px-6 py-2 rounded-xl flex items-center gap-2">
          <Clock size={18} /> Set Table Timing
        </Button>
      </div>
    </div>
   </>
  );
}
