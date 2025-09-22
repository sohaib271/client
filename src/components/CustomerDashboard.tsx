import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Clock,
  Hash,
  DollarSign,
  Eye,
  LogOut,
  Plus,
  Info,
  Search,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  SpinnerContainer,
  useLoading,
  removeUser,
  persistor,
  api,
  useBookings,
  useBookingData,
  Spinner,
} from "./exporter/exporter";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface RootState {
  auth: {
    loggedInUser: any;
  };
}

export default function Dashboard() {
  const userData = useSelector((state: RootState) => state.auth.loggedInUser);
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("Reserved");
  const [search, setSearch] = useState("");

  const { data: booking, isLoading } = useBookings();
  const refinedData = useBookingData(booking || []);

  const handleLogout = async () => {
    const logout = await api.get(
      `${import.meta.env.VITE_API_URL}/auth/logout/${userData.id}`
    );
    startLoading();
    if (!logout.data) console.log("Api error");
    stopLoading();
    dispatch(removeUser());
    persistor.purge();
    navigate("/signin");
    stopLoading();
  };

  const filteredBookings = refinedData?.filter(
    (b) => b.status === filter && b.id.toString().includes(search.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  return (
    <>
      <SpinnerContainer />
      <div className="min-h-screen bg-[#1C1C1C] text-white p-4 sm:p-6">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gold animate-fade-down text-center sm:text-left">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            {userData?.role === "Admin" && (
              <Button
                onClick={() => navigate("/additem")}
                className="bg-gold text-black font-semibold px-4 py-2 rounded-lg hover:bg-white transition flex items-center gap-2"
              >
                <Plus size={16} /> Add Item
              </Button>
            )}
            {userData?.role === "Admin" && (
              <Button
                onClick={() => navigate("/customerinfo")}
                className="bg-gold text-black font-semibold px-4 py-2 rounded-lg hover:bg-white transition flex items-center gap-2"
              >
                <Info size={16} /> Customer Info
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-3 focus:outline-none">
                <span className="text-sm sm:text-base">{userData?.name}</span>
                <img
                  src={userData?.image}
                  alt="Customer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-gold animate-fade"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2A2A2A] border border-gold text-white">
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="flex items-center gap-2 cursor-pointer focus:bg-[#1F1F1F]"
                >
                  <LogOut size={16} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search by Booking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white border border-gold focus:ring-2 focus:ring-gold outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gold" size={18} />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setFilter("Reserved")}
              className={`px-4 py-2 rounded-lg ${
                filter === "Reserved"
                  ? "bg-gold text-black"
                  : "bg-[#2A2A2A] text-white border border-gold"
              }`}
            >
              Reserved
            </Button>
            <Button
              onClick={() => setFilter("Served")}
              className={`px-4 py-2 rounded-lg ${
                filter === "Served"
                  ? "bg-gold text-black"
                  : "bg-[#2A2A2A] text-white border border-gold"
              }`}
            >
              Served
            </Button>
            <Button
              onClick={() => setFilter("Cancelled")}
              className={`px-4 py-2 rounded-lg ${
                filter === "Cancelled"
                  ? "bg-gold text-black"
                  : "bg-[#2A2A2A] text-white border border-gold"
              }`}
            >
              Cancelled
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#2A2A2A] border border-gold animate-fade-up">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gold mb-4">
                {filter} Bookings
              </h2>
              {filteredBookings?.length > 0 ? (
                filteredBookings?.map((booking) => (
                  <div
                    key={booking?.id}
                    className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#1F1F1F] p-3 sm:p-4 rounded-xl shadow mb-3 hover:scale-[1.02] transition"
                  >
                    <div className="space-y-1 text-sm sm:text-base mb-3 sm:mb-0">
                      <p className="flex items-center space-x-2">
                        <Clock size={16} className="text-gold shrink-0" />
                        <span>
                          {booking?.reservedFrom} - {booking?.reservedTo}
                        </span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gold shrink-0" />
                        <span>{booking?.bookedAt}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Hash size={16} className="text-gold shrink-0" />
                        <span>{booking?.id}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <DollarSign size={16} className="text-gold shrink-0" />
                        <span>
                          Rs{" "}
                          {booking?.payablePrice -
                            Math.round(booking?.payablePrice * 0.3)}
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate(`/bookingdetail/${booking?.id}`)}
                      className="w-full sm:w-auto bg-gold text-black font-semibold px-4 py-2 rounded-lg hover:bg-white transition flex items-center justify-center gap-2"
                    >
                      <Eye size={16} /> View Details
                    </Button>

                    {/* Relative time at bottom-right */}
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {formatDistanceToNow(new Date(booking?.bookedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No {filter} bookings found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
