
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  QrCode, 
  ArrowRight 
} from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qrcode">("card");
  
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + tax + shipping;

  if (totalItems === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="text-center py-16">
            <div className="bg-muted inline-flex p-4 rounded-full mb-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button size="lg" className="bg-agro-green-600 hover:bg-agro-green-700" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-muted-foreground"
                    onClick={clearCart}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              <ul className="divide-y">
                {cart.map((item) => (
                  <li key={item.id} className="p-4">
                    <div className="flex items-start">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Sold by {item.seller.name}
                            </p>
                          </div>
                          <p className="text-base font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stockQuantity}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Link to="/shop" className="text-agro-green-600 flex items-center hover:text-agro-green-800">
                <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="couponCode" className="block text-sm font-medium mb-1">
                    Apply Coupon
                  </label>
                  <div className="flex">
                    <Input
                      id="couponCode"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none focus-visible:ring-0"
                    />
                    <Button
                      className="rounded-l-none bg-agro-green-600 hover:bg-agro-green-700"
                      disabled={!couponCode}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="block text-sm font-medium mb-2">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      className={`flex items-center justify-center ${
                        paymentMethod === "card" ? "bg-agro-green-600 hover:bg-agro-green-700" : ""
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Card
                    </Button>
                    <Button
                      variant={paymentMethod === "qrcode" ? "default" : "outline"}
                      className={`flex items-center justify-center ${
                        paymentMethod === "qrcode" ? "bg-agro-green-600 hover:bg-agro-green-700" : ""
                      }`}
                      onClick={() => setPaymentMethod("qrcode")}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-agro-green-600 hover:bg-agro-green-700" 
                  size="lg"
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
