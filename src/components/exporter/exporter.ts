import LoginPage from "../Login";
import Dashboard from "../CustomerDashboard";
import api,{googleAuth} from "../API/LoginApi"
import {store,persistor} from "../Redux/store"
import { LoadingProvider } from "../Context/loading";
import { ItemProvider,useAddItems } from "../Context/items";
import { useLoading } from "../Context/loading";
import { Spinner } from "../Context/spinner";
import SpinnerContainer from "../Context/spinnerContainer"
import AlreadyLoggedInPopup from "../Alerts/loginpopup";
import BookingDetailsPage from "../BookingDetail";
import AddItemForm from "../AddItem";
import MenuPage from "../Menu";
import { useItems } from "../FetchData/item";
import MyTable from "../MyTable";
import DishCard from "../DishCard";
import { useBookingData } from "../Hooks/booking";
import SetTimingForm from "../Alerts/ReservationForm";
import { ConfimBooking } from "../Alerts/ConfimBooking";
import { addBookingItems, addOtherDetails, removeData,deleteItem } from "../Redux/booking";
import {addUser,removeUser} from "../Redux/auth"
import { useBookings } from "../FetchData/booking";


export {LoginPage,googleAuth,api,addUser,removeUser,store,persistor,LoadingProvider,Dashboard,useLoading,Spinner,SpinnerContainer,BookingDetailsPage,AlreadyLoggedInPopup,AddItemForm, MenuPage, useItems,DishCard,addBookingItems,addOtherDetails,removeData, MyTable,SetTimingForm,deleteItem,ConfimBooking,useBookings,useBookingData,ItemProvider,useAddItems};