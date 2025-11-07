import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  // TODO: Implementar lógica do carrinho
  const cartItems: any[] = [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

          {cartItems.length === 0 ? (
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
            <div className="space-y-4">
              {/* Cart items will be rendered here */}
              <Card>
                <CardContent className="p-6">
                  <p>Itens do carrinho</p>
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
