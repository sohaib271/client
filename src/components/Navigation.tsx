import { useState } from "react";
import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom"
import { Menu, X, User, Calendar, ChefHat, Home, Utensils} from "lucide-react";
import { useSelector } from "react-redux";

interface RootState{
  auth:{
    loggedInUser:any
  }
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user=useSelector((state:RootState)=>state.auth.loggedInUser);

  const navItems = [
    { name: "Home", icon: Home, href: "/home" },
    { name: "Menu", icon: ChefHat, href: "/menu" },
    ...(user.role==="Customer"?[{ name: "My Table", icon: Utensils, href: "/mytable" }]:[]),
    { name: user?"Dashboard":"Sign In", icon: User, href: user?"/dashboard":"/signin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-playfair font-bold text-gold">
              FineDine
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-foreground hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Button variant="gold" size="sm" className="ml-4">
                Book Table
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-foreground hover:text-gold transition-colors duration-300 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4">
                <Button variant="gold" className="w-full">
                  Book Table
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;