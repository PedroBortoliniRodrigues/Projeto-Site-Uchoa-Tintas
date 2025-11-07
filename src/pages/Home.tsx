import { Link } from "react-router-dom";
import { ArrowRight, Paintbrush, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Transforme Seus Espaços com
            <span className="block text-primary mt-2">Tintas de Qualidade</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            As melhores marcas e produtos para seus projetos de pintura. Qualidade garantida e entrega rápida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg gap-2">
              <Link to="/catalog">
                Ver Catálogo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link to="/contact">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Paintbrush className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Variedade de Produtos</h3>
                <p className="text-muted-foreground">
                  Tintas, acessórios e ferramentas das melhores marcas do mercado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Qualidade Garantida</h3>
                <p className="text-muted-foreground">
                  Produtos certificados com garantia de fábrica e suporte técnico
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Entrega Rápida</h3>
                <p className="text-muted-foreground">
                  Receba seus produtos com segurança e agilidade em todo o Brasil
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira nossa seleção especial de produtos mais procurados
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-[400px] animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum produto disponível no momento</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/catalog">Ver Todos os Produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
