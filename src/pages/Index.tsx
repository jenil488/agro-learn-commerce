
import React from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CourseCard from "@/components/CourseCard";
import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { 
  featuredProducts, 
  newProducts, 
  featuredCourses,
  featuredCategories 
} from "@/data";

const Index = () => {
  return (
    <div>
      <HeroSection />
      
      {/* Featured Categories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Product Categories</h2>
              <p className="text-muted-foreground mt-2">Browse products by category</p>
            </div>
            <Button variant="ghost" size="sm" className="group" asChild>
              <Link to="/shop" className="flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Handpicked quality from local farmers</p>
            </div>
            <Button variant="ghost" size="sm" className="group" asChild>
              <Link to="/shop" className="flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground mt-2">Fresh from the farm to your table</p>
            </div>
            <Button variant="ghost" size="sm" className="group" asChild>
              <Link to="/shop" className="flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="section-padding bg-agro-green-50 dark:bg-agro-green-900/20">
        <div className="container-custom">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Learn Farming Skills</h2>
              <p className="text-muted-foreground mt-2">Enhance your knowledge with expert courses</p>
            </div>
            <Button variant="ghost" size="sm" className="group" asChild>
              <Link to="/learn" className="flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-agro-green-700 to-agro-green-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Ready to Start Selling?</h2>
            <p className="text-white/90 text-lg">
              Join our community of farmers and reach customers directly. No middlemen, better profits.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-agro-green-800 hover:bg-white/90"
              asChild
            >
              <Link to="/sell">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
