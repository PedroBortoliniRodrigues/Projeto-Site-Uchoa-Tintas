import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Kitchen } from "@/components/3d/Kitchen";
import { LivingRoom } from "@/components/3d/LivingRoom";
import { LeisureArea } from "@/components/3d/LeisureArea";
import { Bedroom } from "@/components/3d/Bedroom";
import { Loader2 } from "lucide-react";

type RoomType = "kitchen" | "living" | "leisure" | "bedroom";

export default function PaintVisualizer() {
  const { data: products } = useProducts();
  const [selectedColor, setSelectedColor] = useState("#FF6B35");
  const [room, setRoom] = useState<RoomType>("living");

  const paintColors = products?.filter((p) => p.category === "Tintas") || [];

  const getColorFromProduct = (productName: string, productColor?: string): string => {
    if (productColor) return productColor;

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
      bege: "#F5F5DC",
      marrom: "#8B4513",
      preto: "#1a1a1a",
    };

    const name = productName.toLowerCase();
    for (const [key, value] of Object.entries(colorMap)) {
      if (name.includes(key)) return value;
    }
    return "#FF6B35";
  };

  const roomComponents = {
    kitchen: Kitchen,
    living: LivingRoom,
    leisure: LeisureArea,
    bedroom: Bedroom,
  };

  const RoomComponent = roomComponents[room];

  const roomNames = {
    kitchen: "Cozinha",
    living: "Sala de Estar",
    leisure: "Área de Lazer",
    bedroom: "Quarto",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/10">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Visualizador 3D de Ambientes
            </h1>
            <p className="text-muted-foreground text-lg">
              Escolha um ambiente, selecione uma cor e veja como ficaria em tempo real
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* 3D Visualization */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden shadow-2xl border-2">
                <CardContent className="p-0">
                  <div className="relative w-full aspect-video bg-gradient-to-br from-accent/20 to-background">
                    <Canvas shadows>
                      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
                      <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={15}
                        maxPolarAngle={Math.PI / 2}
                      />
                      
                      <ambientLight intensity={0.4} />
                      <directionalLight
                        position={[5, 5, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                      />
                      <pointLight position={[-5, 5, -5]} intensity={0.5} />
                      
                      <Suspense fallback={null}>
                        <RoomComponent wallColor={selectedColor} />
                        <Environment preset="apartment" />
                      </Suspense>
                    </Canvas>

                    {/* Instructions Overlay */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-sm font-medium">
                        🖱️ Arraste para rotacionar | 🔍 Scroll para zoom
                      </p>
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="p-4 border-t bg-gradient-to-r from-card to-accent/5">
                    <p className="text-sm font-semibold mb-3 text-center">Escolha o Ambiente:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {(Object.keys(roomComponents) as RoomType[]).map((roomKey) => (
                        <Button
                          key={roomKey}
                          variant={room === roomKey ? "default" : "outline"}
                          onClick={() => setRoom(roomKey)}
                          className="w-full transition-all hover:scale-105"
                        >
                          {roomNames[roomKey]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="mt-4 bg-gradient-to-r from-primary/10 to-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">Ambiente Atual: {roomNames[room]}</p>
                      <p className="text-sm text-muted-foreground">
                        Cor selecionada: {paintColors.find(p => getColorFromProduct(p.name, p.color) === selectedColor)?.name || "Laranja"}
                      </p>
                    </div>
                    <div
                      className="w-16 h-16 rounded-full border-4 border-background shadow-lg"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Color Selection Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    🎨 Selecione a Cor
                  </h3>
                  
                  {paintColors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                      <p className="text-sm text-muted-foreground">Carregando cores...</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {paintColors.map((product) => {
                        const color = getColorFromProduct(product.name, product.color);
                        return (
                          <button
                            key={product.id}
                            onClick={() => setSelectedColor(color)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                              selectedColor === color
                                ? "border-primary bg-primary/10 scale-105 shadow-lg"
                                : "border-border hover:border-primary/50 hover:bg-accent/50"
                            }`}
                          >
                            <div
                              className="w-12 h-12 rounded-full border-2 border-border shadow-md flex-shrink-0"
                              style={{ backgroundColor: color }}
                            />
                            <div className="text-left flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                R$ {product.price.toFixed(2)}
                              </p>
                            </div>
                            {selectedColor === color && (
                              <div className="text-primary">✓</div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </div>
  );
}
