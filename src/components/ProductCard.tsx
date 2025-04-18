
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formattedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100)).toFixed(2) 
    : product.price.toFixed(2);

  return (
    <Card className="card-hover overflow-hidden border border-border/40">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 rounded-full bg-agro-green-600 px-2 py-0.5 text-xs font-medium text-white">
              New
            </span>
          )}
          {product.discount && (
            <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              {product.discount}% OFF
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 rounded-full bg-background/80 hover:bg-background"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
          <h3 className="mb-1 text-base font-medium line-clamp-1">{product.name}</h3>
          
          <div className="mb-2 flex items-center text-sm">
            <span className="flex items-center text-yellow-500">
              <Star className="mr-1 h-3.5 w-3.5 fill-yellow-500" />
              {product.rating}
            </span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">Sold by {product.seller.name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">${formattedPrice}</span>
              {product.discount && (
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="h-8 bg-agro-green-600 hover:bg-agro-green-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-1 h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
