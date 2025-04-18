
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, ShoppingCart, Sun, Moon, Leaf, 
  BookOpen, Search, ChevronDown 
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const { cart, totalItems } = useCart();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Sell", path: "/sell" },
    { name: "Learn", path: "/learn" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-agro-green-600" />
          <span className="font-display text-xl font-bold text-foreground">
            AgroLearn<span className="text-agro-green-600">Commerce</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-agro-green-600 ${
                isActive(link.path)
                  ? "text-agro-green-600"
                  : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            asChild
          >
            <Link to="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            asChild
          >
            <Link to="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-agro-green-600 text-[10px] font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button size="sm" variant="default" className="bg-agro-green-600 hover:bg-agro-green-700">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative mr-2"
            asChild
          >
            <Link to="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-agro-green-600 text-[10px] font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-foreground"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container-custom space-y-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-base font-medium ${
                  isActive(link.path)
                    ? "text-agro-green-600"
                    : "text-foreground/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/search" 
              className="flex items-center py-2 text-base font-medium text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2 py-2">
                <UserButton afterSignOutUrl="/" />
                <span className="text-sm font-medium">My Account</span>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm" variant="default" className="w-full bg-agro-green-600 hover:bg-agro-green-700">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
