import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Star, Trash } from "lucide-react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddItems } from "./Context/items";

interface DishCardProps {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  rating?: number;
  deleteItem?: (id: number) => void; 
  itemId?: number;
  isReserved?:boolean;
}

const DishCard = ({ name, itemId, description, price, image, rating, deleteItem,isReserved }: DishCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [buttonController, setButtonController] = useState(false);
  const user = useSelector((state: any) => state.auth.loggedInUser);
  const {addItems,buttonHandler}=useAddItems();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleAdd = () => {
    addItems(itemId, quantity,user.id);
    buttonHandler();
    setButtonController(true)
  }; 

  return (
    <Card className="group hover-lift cursor-pointer bg-card border-border overflow-hidden relative">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {user.role === "Admin" && (
        <button
          onClick={() => deleteItem(itemId)}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition shadow-lg"
        >
          <Trash size={16} />
        </button>
      )}
        <div className="absolute top-4 left-4 bg-gold/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-primary-foreground fill-current" />
          <span className="text-xs font-semibold text-primary-foreground">{rating}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-playfair font-bold text-gold">
             Rs {price}
            </span>
            
            {/* Customer actions */}
            {user.role === "Customer" && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gold rounded-lg overflow-hidden">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gold hover:bg-gold/10"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1 || buttonController}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="min-w-[2rem] text-center font-medium text-foreground">
                    {quantity}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gold hover:bg-gold/10"
                    onClick={increaseQuantity}
                    disabled={buttonController}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleAdd}
                  variant="gold" 
                  size="sm"
                  className="group/btn"
                  disabled={buttonController || isReserved}
                >
                  {buttonController 
                    ? <IoCheckmarkDoneCircleOutline /> 
                    : <Plus className="h-4 w-4 mr-2 transition-transform group-hover/btn:rotate-90" />}
                  {buttonController ? "Item Added" : "Add"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;
