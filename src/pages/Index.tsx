import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DishCard from "@/components/DishCard";
import { Button } from "@/components/ui/button";
import { ChefHat, Star, Clock, MapPin } from "lucide-react";
import {useItems,Spinner, useAddItems, useBookings} from "../components/exporter/exporter"
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Index = () => {
  const navigate=useNavigate();
  const {data:items,isLoading}=useItems();
  const {addButtonController,buttonStateFalse}=useAddItems();
  const {data:booking}=useBookings();

  const isReserved=useMemo(()=>{
    const findB=booking?.find(b=> b.status==="Reserved");
    if(!findB) return false;
    return true;
  },[booking])
  if(isLoading) return <Spinner/>
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <section id="menu" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Signature <span className="text-gold">Dishes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our chef's masterpieces, carefully crafted with the finest ingredients and presented with artistic flair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {items?.map((dish, index) => (
              <div 
                key={dish.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <DishCard name={dish.item_name} isReserved={isReserved}  itemId={dish.id} description={dish.description} price={dish.price} image={dish.item_image} rating={4.5}
                 />
              </div>
            ))}
          </div>
          {addButtonController && <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
        <Button onClick={()=>{navigate("/mytable"); buttonStateFalse();}}
          variant="gold" 
          size="sm" 
          className="w-64 mx-auto"
        >
          Next
        </Button>
      </div>}

          <div className="text-center">
            <Button onClick={()=>navigate("/menu")} variant="outline" size="lg" className="border-gold/50 text-gold hover:bg-gold/10">
              <ChefHat className="h-5 w-5 mr-2" />
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-charcoal-light/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
                Award Winning
              </h3>
              <p className="text-muted-foreground">
                Recognized by Michelin Guide for exceptional culinary excellence
              </p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
                Fresh Daily
              </h3>
              <p className="text-muted-foreground">
                Ingredients sourced daily from local farms and premium suppliers
              </p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
                Prime Location
              </h3>
              <p className="text-muted-foreground">
                Located in the heart of the city with stunning panoramic views
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="book" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Ready for an Unforgettable <span className="text-gold">Experience?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Reserve your table now and indulge in a culinary journey that will create lasting memories
            </p>
            <Button onClick={()=> navigate("/mytable")} variant="gold" size="lg" className="animate-gold-glow">
              Book Your Table Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-gold mb-4">FineDine</h3>
              <p className="text-muted-foreground">
                Where culinary artistry meets exceptional service in an atmosphere of refined elegance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Street 11</p>
                <p>Gujranwala, Wapda Town</p>
                <p>+92 306-0624288</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Hours</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Mon-Thu: 5:00 PM - 10:00 PM</p>
                <p>Fri-Sat: 5:00 PM - 11:00 PM</p>
                <p>Sun: 4:00 PM - 9:00 PM</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Instagram: @finedine</p>
                <p>Facebook: FineDine Restaurant</p>
                <p>Twitter: @finedine_sohaib</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 FineDine Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;