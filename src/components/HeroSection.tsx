
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-agro-green-700 to-agro-green-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-20 bg-cover bg-center" />
      
      <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Grow Your Farm Business
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-md">
              Buy and sell farm products directly while learning sustainable farming practices all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-agro-green-800 hover:bg-white/90"
                asChild
              >
                <Link to="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Products
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/learn">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-white/10 blur-2xl" />
              <img
                src="/placeholder.svg"
                alt="Farmer with fresh produce"
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
