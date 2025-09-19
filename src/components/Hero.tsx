import { Button } from "@/components/ui/button";
import { Calendar, ChefHat, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate=useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="FineDine Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-overlay-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
            Fine<span className="text-gold">Dine</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Where culinary artistry meets exceptional service in an atmosphere of refined elegance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              variant="gold" 
              size="lg" 
              className="group min-w-[200px]"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Reserve Your Table
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button onClick={()=>navigate("/menu")}
              variant="outline" 
              size="lg" 
              className="min-w-[200px] border-gold/50 text-gold hover:bg-gold/10"
            >
              <ChefHat className="h-5 w-5 mr-2" />
              Explore Menu
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-playfair font-bold text-gold mb-2">15+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-playfair font-bold text-gold mb-2">50+</div>
              <div className="text-muted-foreground">Signature Dishes</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-playfair font-bold text-gold mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Guests</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;