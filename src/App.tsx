import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage,store,persistor, LoadingProvider,ConfimBooking,ItemProvider, MyTable, Dashboard,BookingDetailsPage,AddItemForm,MenuPage} from "./components/exporter/exporter"
import {GoogleOAuthProvider} from "@react-oauth/google"
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();
const GoogleAuthWrapper=()=>{
  return <GoogleOAuthProvider clientId="470291407670-0c532pu1s95vkv9l9fd4tjdm9aesiecr.apps.googleusercontent.com">
    <LoginPage/>
  </GoogleOAuthProvider>
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ItemProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/menu" element={<MenuPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/bookingdetail/:bookingId" element={<BookingDetailsPage/>}/>
          <Route path="/signin" element={<GoogleAuthWrapper/>} />
          <Route path="/mytable" element={<MyTable/>}/>
          <Route path="/additem" element={<AddItemForm/>} />
          <Route path="/confirmbooking" element={<ConfimBooking/>}/>
        </Routes>
        </ItemProvider>
      </BrowserRouter>
    </TooltipProvider>
    </PersistGate>
    </Provider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
