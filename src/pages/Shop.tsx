import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from "lucide-react";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const maxPrice = Math.max(...products.map((product) => product.price));

  // Filter products by category, price range, and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default: // "featured"
        return a.featured ? -1 : b.featured ? 1 : 0;
    }
  });

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Shop Farm Products</h1>
          <p className="text-muted-foreground mt-2">
            Fresh, organic products sourced directly from local farmers
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort:</span>
              <select
                className="text-sm border rounded px-2 py-1"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Filter Sidebar */}
          <div 
            className={`${
              showFilters || !("md:block")
                ? "block animate-fade-in"
                : "hidden"
            } md:block md:w-64 lg:w-72 shrink-0`}
          >
            <div className="bg-card p-4 rounded-lg border shadow-sm divide-y divide-border">
              {/* Search */}
              <div className="pb-4">
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-7 w-7"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Categories */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Categories</h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Button
                        variant="ghost"
                        className={`justify-start w-full text-left ${
                          activeCategory === category.name
                            ? "bg-agro-green-100 text-agro-green-800 dark:bg-agro-green-800/30 dark:text-agro-green-200"
                            : ""
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                        {category.count && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            ({category.count})
                          </span>
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Price Range */}
              <div className="py-4">
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={[0, maxPrice]}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    ${priceRange[0].toFixed(2)}
                  </span>
                  <span className="text-sm">
                    ${priceRange[1].toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Other Filters */}
              <div className="py-4">
                <h3 className="font-medium mb-2">Filter By</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <label
                      htmlFor="featured"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Featured Products
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-arrivals" />
                    <label
                      htmlFor="new-arrivals"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="on-sale" />
                    <label
                      htmlFor="on-sale"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Mobile Close Button */}
              <div className="pt-4 md:hidden">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Desktop Sort Controls */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="text-sm">
                Showing <span className="font-semibold">{sortedProducts.length}</span> products
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <select
                  className="text-sm border rounded px-2 py-1"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {/* Current Filters */}
            {(activeCategory || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center">
                    Category: {activeCategory}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => setActiveCategory(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {searchQuery && (
                  <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center">
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {(activeCategory || searchQuery) && (
                  <Button
                    variant="ghost"
                    className="text-sm h-7 px-2"
                    onClick={() => {
                      setActiveCategory(null);
                      setSearchQuery("");
                      setPriceRange([0, maxPrice]);
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            )}
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery("");
                    setPriceRange([0, maxPrice]);
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
