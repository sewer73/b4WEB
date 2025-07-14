import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleWebLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.x_studio_enlace_web) {
      window.open(product.x_studio_enlace_web, '_blank');
    }
  };

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg" onClick={handleClick}>
      <div className="aspect-[4/3] relative overflow-hidden">
        {product.x_studio_catalogofoto2 && typeof product.x_studio_catalogofoto2 === 'string' ? (
          <img
            src={product.x_studio_catalogofoto2 as string}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Sin imagen</span>
          </div>
        )}
        
        {product.x_studio_enlace_web && (
          <button
            onClick={handleWebLinkClick}
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            title="Ver enlace web"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg font-bold">
                €{product.list_price.toFixed(2)}
              </Badge>
              {product.compare_list_price > product.list_price && (
                <span className="text-sm text-muted-foreground line-through">
                  €{product.compare_list_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};