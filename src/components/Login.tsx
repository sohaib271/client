import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {useGoogleLogin} from "@react-oauth/google"
import { CheckCircle } from "lucide-react";
import { googleAuth,useLoading,addUser,SpinnerContainer,AlreadyLoggedInPopup } from "./exporter/exporter"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

interface RootState{
  auth:{
    loggedInUser:any
  }
}

export default function LoginPage() {
  const {startLoading,stopLoading}=useLoading();
  const user=useSelector((state:RootState)=>state.auth.loggedInUser)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const responseGoogle=async(authResult)=>{
    startLoading();
    try {
      if(authResult.code){
        const res=await googleAuth(authResult.code);
        const userInfo=res.data.userInfo;
        if(!userInfo){
          console.log("Error finding User");
          stopLoading();
        }
        dispatch(addUser({id:userInfo.id,name:userInfo.name, image:userInfo.image,email:userInfo.email,role:userInfo.role}));
        navigate(`/dashboard`);        
      }
    } catch (error) {
      console.error("Error : ",error);
    }
    stopLoading();
  }
  const googleLogin=useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
  })

  return (
    <>
    <SpinnerContainer/>
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#1C1C1C] rounded-2xl shadow-xl p-8 text-center"
      >
       {user && <AlreadyLoggedInPopup icon={CheckCircle} heading="You are already logged in."  paragraph="You don't need to sign in again."  buttonContent="Go back to Home Page" route="/"/>}
        <h1 className="text-3xl font-bold text-[#EBC634] mb-2">Sign In</h1>
        <p className="text-gray-400 mb-8">Sign in to continue your reservation</p>

        {/* Google Sign In */}
        <Button onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 bg-[#EBC634] text-black font-semibold rounded-xl py-3 hover:bg-[#CDAF30] transition-colors"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#333]"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-[#333]"></div>
        </div>

        {/* Email & Password */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-[#EBC634]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#333] text-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-[#EBC634]"
          />
          <Button className="w-full bg-[#EBC634] text-black font-semibold rounded-xl py-3 hover:bg-[#CDAF30] transition-colors">
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-500">
          Don’t have an account? <a href="#" className="text-[#EBC634] hover:underline">Sign up</a>
        </p>
      </motion.div>
    </div>
    </>
  );
}
