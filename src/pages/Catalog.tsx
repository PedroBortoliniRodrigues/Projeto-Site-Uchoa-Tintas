import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { PaintCalculator } from "@/components/PaintCalculator";

export default function Catalog() {
  const { data: products, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(new Set(products?.map(p => p.category) || []));

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/10">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Catálogo de Produtos
            </h1>
            <p className="text-muted-foreground text-lg">
              Encontre tudo que você precisa para seu projeto
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              
              {/* Categories */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="hover:scale-105 transition-transform"
                >
                  Todos
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="hover:scale-105 transition-transform"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Carregando produtos...</p>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    {filteredProducts.length} produto(s) encontrado(s)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <Card className="py-20">
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-lg">
                      Nenhum produto encontrado
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar with Calculator */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <PaintCalculator />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
