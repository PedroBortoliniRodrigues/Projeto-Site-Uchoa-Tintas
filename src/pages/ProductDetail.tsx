import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-20 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Button asChild>
              <Link to="/catalog">Voltar ao Catálogo</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/catalog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Catálogo
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <Card className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  {product.stock < 10 && product.stock > 0 && (
                    <Badge variant="secondary">Poucos em estoque</Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg">{product.category}</p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-4">
                    R$ {product.price.toFixed(2)}
                  </div>
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    disabled={product.stock === 0}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {product.stock === 0 ? "Produto Esgotado" : "Adicionar ao Carrinho"}
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-lg mb-2">Descrição</h2>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Marca</h3>
                    <p className="text-muted-foreground">{product.brand}</p>
                  </div>
                  {product.size && (
                    <div>
                      <h3 className="font-semibold mb-1">Tamanho</h3>
                      <p className="text-muted-foreground">{product.size}</p>
                    </div>
                  )}
                  {product.color && (
                    <div>
                      <h3 className="font-semibold mb-1">Cor</h3>
                      <p className="text-muted-foreground">{product.color}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-1">Disponível</h3>
                    <p className="text-muted-foreground">{product.stock} unidades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
