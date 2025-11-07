import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const { getItemCount } = useCart();
  const cartItemsCount = getItemCount();

  const NavLinks = () => (
    <>
      <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
        Início
      </Link>
      <Link to="/catalog" className="text-foreground hover:text-primary transition-colors font-medium">
        Catálogo
      </Link>
      <Link to="/paint-visualizer" className="text-foreground hover:text-primary transition-colors font-medium">
        Visualizador 3D
      </Link>
      <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
        Contato
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Uchoa Tintas" className="h-10 w-10 object-contain" />
          <span className="font-bold text-xl">Uchoa Tintas</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
