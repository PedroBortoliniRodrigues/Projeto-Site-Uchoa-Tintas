import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export const PaintCalculator = () => {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [coats, setCoats] = useState<string>("2");
  const [result, setResult] = useState<number | null>(null);

  const calculatePaint = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    const c = parseFloat(coats);

    if (!w || !h || !c) return;

    // Cálculo: área (m²) × número de demãos / rendimento por litro (geralmente 10-12 m²/L)
    const area = w * h;
    const rendimentoPorLitro = 10; // m² por litro
    const litrosNecessarios = (area * c) / rendimentoPorLitro;
    
    // Arredondar para cima considerando latas de 3.6L ou 18L
    const latas36 = Math.ceil(litrosNecessarios / 3.6);
    const latas18 = Math.ceil(litrosNecessarios / 18);

    setResult(litrosNecessarios);
  };

  const getLatasRecomendadas = () => {
    if (!result) return null;
    
    const latas36 = Math.ceil(result / 3.6);
    const latas18 = Math.ceil(result / 18);
    
    return { latas36, latas18 };
  };

  const latas = getLatasRecomendadas();

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculadora de Tinta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Largura (m)</Label>
            <Input
              id="width"
              type="number"
              placeholder="Ex: 4"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="height">Altura (m)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Ex: 3"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="coats">Número de Demãos</Label>
          <Input
            id="coats"
            type="number"
            placeholder="Ex: 2"
            value={coats}
            onChange={(e) => setCoats(e.target.value)}
            min="1"
            max="4"
          />
        </div>

        <Button onClick={calculatePaint} className="w-full">
          Calcular Quantidade
        </Button>

        {result !== null && latas && (
          <div className="mt-4 p-4 bg-background rounded-lg border-2 border-primary/20">
            <h4 className="font-semibold mb-3 text-primary">Resultado:</h4>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Volume necessário:</strong> {result.toFixed(2)} litros
              </p>
              <p className="text-muted-foreground">
                Área a pintar: {(parseFloat(width) * parseFloat(height)).toFixed(2)} m²
              </p>
              
              <div className="mt-3 pt-3 border-t">
                <p className="font-semibold mb-2">Recomendação de compra:</p>
                <div className="space-y-1">
                  <p className="text-muted-foreground">
                    • {latas.latas36} lata(s) de 3,6L
                  </p>
                  <p className="text-muted-foreground">ou</p>
                  <p className="text-muted-foreground">
                    • {latas.latas18} lata(s) de 18L
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                * Cálculo baseado em rendimento médio de 10m²/L. Superfícies porosas podem necessitar mais tinta.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
