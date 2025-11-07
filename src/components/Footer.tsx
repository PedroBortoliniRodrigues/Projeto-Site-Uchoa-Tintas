import { Paintbrush, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Paintbrush className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Uchoa Tintas</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sua loja de confiança para tintas e acessórios de qualidade.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog?category=tintas" className="text-muted-foreground hover:text-primary transition-colors">
                  Tintas
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=acessorios" className="text-muted-foreground hover:text-primary transition-colors">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=ferramentas" className="text-muted-foreground hover:text-primary transition-colors">
                  Ferramentas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(11) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@uchoatintas.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Uchoa Tintas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
