import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Trash2, X, Package, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"dinheiro" | "pix" | "cartao">("pix");

  const handleCheckoutWhatsApp = () => {
    const phoneNumber = "5591980293915";
    
    let message = "*🛒 NOVO PEDIDO - UCHOA TINTAS*\n\n";
    message += "*Produtos:*\n";
    message += "```\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qtd: ${item.quantity} | R$ ${item.price.toFixed(2)} cada\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += "```\n";
    message += `*Forma de Pagamento:* ${paymentMethod.toUpperCase()}\n\n`;
    message += `*TOTAL: R$ ${getTotal().toFixed(2)}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/10">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Carrinho de Compras
              </h1>
              {items.length > 0 && (
                <p className="text-muted-foreground flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {itemCount} {itemCount === 1 ? "item" : "itens"} no carrinho
                </p>
              )}
            </div>
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearCart} className="hover:bg-destructive hover:text-destructive-foreground">
                <X className="h-4 w-4 mr-2" />
                Limpar Carrinho
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-20 text-center">
                <div className="bg-accent/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Explore nosso catálogo e adicione produtos incríveis ao seu carrinho
                </p>
                <Button asChild size="lg" className="hover:scale-105 transition-transform">
                  <Link to="/catalog">
                    <Package className="mr-2 h-4 w-4" />
                    Ir para o Catálogo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-28 h-28 object-cover rounded-lg shadow-md"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-primary">
                            {item.quantity}x
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="w-12 text-center">
                                <span className="font-bold text-lg">{item.quantity}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Subtotal</p>
                              <p className="font-bold text-xl text-primary">
                                R$ {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Checkout Section */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4 shadow-xl border-2">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Resumo do Pedido
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Confira os detalhes antes de finalizar
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-medium">R$ {getTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Itens:</span>
                          <span className="font-medium">{itemCount}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-primary">
                            R$ {getTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-semibold mb-3">Forma de Pagamento:</h3>
                      <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                        <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "dinheiro" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}>
                          <RadioGroupItem value="dinheiro" id="dinheiro" />
                          <Label htmlFor="dinheiro" className="flex-1 cursor-pointer font-medium">
                            💵 Dinheiro
                          </Label>
                        </div>
                        <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}>
                          <RadioGroupItem value="pix" id="pix" />
                          <Label htmlFor="pix" className="flex-1 cursor-pointer font-medium">
                            📱 PIX
                          </Label>
                        </div>
                        <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "cartao" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}>
                          <RadioGroupItem value="cartao" id="cartao" />
                          <Label htmlFor="cartao" className="flex-1 cursor-pointer font-medium">
                            💳 Cartão
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button 
                      className="w-full shadow-lg hover:scale-105 transition-transform" 
                      size="lg"
                      onClick={handleCheckoutWhatsApp}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Finalizar Pedido
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Você será redirecionado para o WhatsApp para confirmar seu pedido
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
