import { useForm } from "react-hook-form";
import {loadStripe} from "@stripe/stripe-js"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import {api,addOtherDetails} from "../exporter/exporter"
import { useDispatch, useSelector } from "react-redux";

type TimingFormValues = {
  reserved_from: string;
  reserved_to: string;
};

interface ItemProps {
  onCancel:()=>void;
  items:[]
}

export default function SetTimingForm({ onCancel,items }: ItemProps) {

  const stripePromise= loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const user=useSelector((state:any)=>state.auth.loggedInUser);
  const now=new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  const maxDate = new Date();
  maxDate.setDate(now.getDate() + 7);
  const maxDateTime = maxDate.toISOString().slice(0, 16);
  const table_no=Math.round(Math.random() * 20);
  const { register, handleSubmit } = useForm<TimingFormValues>();
 const dispatch=useDispatch();

  const onSubmit =async (data: TimingFormValues) => {
     dispatch(addOtherDetails({table_no:table_no,booked_by:user.id,reserved_from:data.reserved_from,reserved_to:data.reserved_to}));
    try {
      const stripe=await stripePromise;
      const response=await api.post(`${import.meta.env.VITE_API_URL}/table/payment`,{items});
      const {error} = await stripe.redirectToCheckout({
        sessionId:response.data.id
      });
      if(error){
        console.log("Stripe payment error");
      }
    } catch (err) {
      console.log("Payment error ",err);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-opacity-50  backdrop-blur-sm flex items-center justify-center bg-[#1a1a1a] p-6 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-lg w-full max-w-md border border-gold">
        <h2 className="text-2xl font-bold text-gold text-center mb-6">
          Set Table Timing
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Time
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gold" size={18} />
              <input
                type="datetime-local"
                {...register("reserved_from", { required: true })}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-gold focus:ring-2 focus:ring-gold outline-none"
                min={minDateTime}
                max={maxDateTime}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 text-gold" size={18} />
              <input
                type="time"
                {...register("reserved_to", { required: true })}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-gold focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <Button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-700 text-white font-semibold hover:bg-gray-600 px-4 py-2 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gold text-black font-semibold hover:bg-yellow-500 px-4 py-2 rounded-lg"
            >
              Pay Now
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
