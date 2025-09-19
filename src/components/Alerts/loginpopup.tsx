import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AlertProps {
  heading? : string
  paragraph?:string
  buttonContent? : string
  route?:string
  onConfirm?:()=>void;
}

const AlreadyLoggedInPopup = ({heading,paragraph,buttonContent,route,onConfirm}:AlertProps) => {
  const navigate = useNavigate();

  const handleClick=async()=>{
    if(onConfirm){
      await onConfirm();
    }
    if(route){
      navigate(route);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#1C1C1C] text-center p-6 rounded-2xl shadow-lg max-w-sm w-full border-t-4 border-gold"
      >
        <CheckCircle size={50} className="text-gold mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white">{heading}</h2>
        <p className="text-white mt-2">{paragraph}</p>
        <button
          onClick={handleClick}
          className="mt-5 px-5 py-2 text-black bg-gold hover:bg-gold-700 rounded-lg transition"
        >
          {buttonContent}
        </button>
      </motion.div>
    </div>
  );
};
export default AlreadyLoggedInPopup;
