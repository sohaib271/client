import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useItems, DishCard, Spinner,api,useLoading,useAddItems } from "./exporter/exporter";
import {useBookings,useBookingData} from "./exporter/exporter"
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const navigate=useNavigate();
  const {startLoading,stopLoading}=useLoading();
  const {addButtonController}=useAddItems();
  const { data: items,isLoading } = useItems();
  console.log(items)
  const filteredItems = items?.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );

  const {data:booking}=useBookings();
  const refinedData=useBookingData(booking || []);

  const filterBookings=useMemo(()=> {
   const isReserved= refinedData.find(b => b.status==="Reserved");
   if(!isReserved) return false;
   return true;
},[refinedData]);

  async function deleteItem(id:number){
    startLoading();
    const removeItem=await api.delete(`${import.meta.env.VITE_API_URL}/item/delete/${id}`);

    if(removeItem.data.msg) stopLoading(); console.log("Item not deleted");
    stopLoading();

  }

  if(isLoading) return <Spinner/>

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 pb-20">
      <motion.h1
        className="text-4xl font-bold text-center text-gold mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Menu
      </motion.h1>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-xl bg-gray-800 text-white border border-gold focus:ring-2 focus:ring-gold outline-none"
          />
          <Search className="absolute left-4 top-3.5 text-gold" size={20} />
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems?.length > 0 ? (
          filteredItems?.map(item => (
           <DishCard isReserved={filterBookings} deleteItem={deleteItem} itemId={item.id}  key={item.id} name={item.item_name} description={item.description} price={item.price} image={item.item_image} rating={4.7}  />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No items found.
          </p>
        )}
      </div>
      {addButtonController && <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
        <Button onClick={()=>navigate("/mytable")}
          variant="gold" 
          size="sm" 
          className="w-64 mx-auto"
        >
          Next
        </Button>
      </div>}
       <Button
      onClick={() => navigate("/additem")}
      variant="outline"
      size="sm"
      className="w-32 mt-3 border-gold text-gold hover:bg-gold hover:text-black transition"
    >
      Add More
    </Button>

    </div>
  );
}