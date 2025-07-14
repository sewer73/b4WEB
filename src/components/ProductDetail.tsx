import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart } from "lucide-react";
import { formatPrice } from "@/utils/price";
import { Product } from "@/hooks/useProducts";

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetail = ({ product, isOpen, onClose }: ProductDetailProps) => {
  const imageUrl = typeof product.x_studio_catalogofoto2 === 'string' 
    ? product.x_studio_catalogofoto2 
    : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  const handleExternalLink = () => {
    if (product.x_studio_enlace_web) {
      window.open(product.x_studio_enlace_web, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.list_price)}
                </span>
                {product.compare_list_price > product.list_price && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compare_list_price)}
                  </span>
                )}
              </div>
              {product.compare_list_price > product.list_price && (
                <p className="text-green-600 font-medium">
                  You save {formatPrice(product.compare_list_price - product.list_price)}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
              
              {product.x_studio_enlace_web && (
                <Button variant="outline" onClick={handleExternalLink}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Product Information</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-muted-foreground">
                    Detailed product information and specifications will be available on the external website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};