import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart}>
                <X className="h-4 w-4 mr-2" />
                Limpar Carrinho
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground mb-6">
                  Adicione produtos ao seu carrinho para continuar comprando
                </p>
                <Button asChild>
                  <Link to="/catalog">Ir para o Catálogo</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="font-bold text-lg">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Checkout Section */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Forma de Pagamento</h3>
                    <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="dinheiro" id="dinheiro" />
                        <Label htmlFor="dinheiro" className="flex-1 cursor-pointer">💵 Dinheiro</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">📱 PIX</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="cartao" id="cartao" />
                        <Label htmlFor="cartao" className="flex-1 cursor-pointer">💳 Cartão de Crédito/Débito</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-semibold">Total:</span>
                      <span className="text-3xl font-bold text-primary">
                        R$ {getTotal().toFixed(2)}
                      </span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleCheckoutWhatsApp}
                    >
                      🛒 Finalizar Pedido via WhatsApp
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Você será redirecionado para o WhatsApp para confirmar seu pedido
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
