import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";

export default function PaintVisualizer() {
  const { data: products } = useProducts();
  const [selectedColor, setSelectedColor] = useState("#FF6B35");
  const [wall, setWall] = useState<"front" | "left" | "right">("front");

  const paintColors = products?.filter((p) => p.category === "Tintas") || [];

  const getColorFromProduct = (productName: string): string => {
    const colorMap: Record<string, string> = {
      branco: "#FFFFFF",
      gelo: "#F5F5DC",
      areia: "#C2B280",
      cinza: "#808080",
      azul: "#0096FF",
      verde: "#00A86B",
      amarelo: "#FFD700",
      vermelho: "#DC143C",
      rosa: "#FFB6C1",
      laranja: "#FF6B35",
    };

    const name = productName.toLowerCase();
    for (const [key, value] of Object.entries(colorMap)) {
      if (name.includes(key)) return value;
    }
    return "#FF6B35";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Visualizador de Pintura 3D</h1>
            <p className="text-muted-foreground">
              Selecione uma cor e veja como ficaria na sua parede
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Room Visualization */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-background to-muted">
                    {/* Simple 3D Room Effect */}
                    <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                      <div className="relative w-full h-full max-w-4xl">
                        {/* Floor */}
                        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-muted to-muted-foreground/20 transform-gpu" 
                             style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg)" }} />
                        
                        {/* Back Wall */}
                        <div className="absolute top-[10%] left-[10%] right-[10%] h-[50%] transition-colors duration-300"
                             style={{ backgroundColor: selectedColor, boxShadow: "inset 0 0 100px rgba(0,0,0,0.3)" }} />
                        
                        {/* Left Wall */}
                        {wall === "left" && (
                          <div className="absolute top-[10%] left-0 w-[15%] h-[50%] transition-colors duration-300"
                               style={{ 
                                 backgroundColor: selectedColor,
                                 transform: "skewY(-15deg)",
                                 transformOrigin: "top left",
                                 boxShadow: "inset -20px 0 40px rgba(0,0,0,0.4)"
                               }} />
                        )}
                        
                        {/* Right Wall */}
                        {wall === "right" && (
                          <div className="absolute top-[10%] right-0 w-[15%] h-[50%] transition-colors duration-300"
                               style={{ 
                                 backgroundColor: selectedColor,
                                 transform: "skewY(15deg)",
                                 transformOrigin: "top right",
                                 boxShadow: "inset 20px 0 40px rgba(0,0,0,0.4)"
                               }} />
                        )}
                        
                        {/* Window frame */}
                        <div className="absolute top-[20%] right-[20%] w-32 h-40 bg-card border-4 border-muted-foreground/50 rounded-sm shadow-2xl">
                          <div className="absolute inset-2 bg-gradient-to-br from-blue-100 to-blue-50 opacity-60" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wall Selection */}
                  <div className="p-4 border-t bg-card">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant={wall === "front" ? "default" : "outline"}
                        onClick={() => setWall("front")}
                      >
                        Parede Frontal
                      </Button>
                      <Button
                        variant={wall === "left" ? "default" : "outline"}
                        onClick={() => setWall("left")}
                      >
                        Parede Esquerda
                      </Button>
                      <Button
                        variant={wall === "right" ? "default" : "outline"}
                        onClick={() => setWall("right")}
                      >
                        Parede Direita
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Color Selection */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Selecione a Cor</h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {paintColors.map((product) => {
                      const color = getColorFromProduct(product.name);
                      return (
                        <button
                          key={product.id}
                          onClick={() => setSelectedColor(color)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                            selectedColor === color
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div
                            className="w-12 h-12 rounded-full border-2 border-border shadow-md"
                            style={{ backgroundColor: color }}
                          />
                          <div className="text-left flex-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              R$ {product.price.toFixed(2)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
