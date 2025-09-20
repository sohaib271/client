import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addBookingItems, useItems } from "../exporter/exporter";

type ItemContextType = {
  addButtonController: boolean;
  addItems: (id: number, quantity: number,userId:number) => void;
  buttonHandler:()=>void;
  buttonStateFalse:()=>void;
};

const ItemContext = createContext<ItemContextType>({
  addButtonController: false,
  addItems: () => {},
  buttonHandler:()=>{},
  buttonStateFalse:()=>{}
});

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [addButtonController, setAddButtonController] = useState(false);
  const buttonHandler=()=> setAddButtonController(true);
  const buttonStateFalse=()=> setAddButtonController(false);
  const { data: items } = useItems();
  const dispatch = useDispatch();
  const addItems = (id: number, quantity: number,userId:number) => {
    const findItem = items.find((item) => item.id === id);
    dispatch(
      addBookingItems({
        item_id: id,
        addedBy:userId,
        item_name: findItem.item_name,
        item_image: findItem.item_image,
        item_price: findItem.price,
        quantity: quantity,
      })
    );
  };

  return (
    <ItemContext.Provider value={{ addButtonController, addItems,buttonHandler, buttonStateFalse }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useAddItems = () => useContext(ItemContext);
