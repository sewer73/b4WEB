import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/price";
import { toast } from "sonner";
import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onLikeToggle: (productId: number) => void;
}

export const ProductCard = ({
  product,
  onProductClick,
  onLikeToggle,
}: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLikeToggle(product.id);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.x_studio_enlace_web) {
      window.open(product.x_studio_enlace_web, '_blank');
    }
  };

  const imageUrl = typeof product.x_studio_catalogofoto2 === 'string' 
    ? product.x_studio_catalogofoto2 
    : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            ref={imgRef}
            src={isInView ? imageUrl : ""}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {!isImageLoaded && isInView && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Overlay with buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
                onClick={handleLikeClick}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isLiked ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </Button>
              
              {product.x_studio_enlace_web && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
                  onClick={handleExternalLinkClick}
                >
                  <ExternalLink className="h-4 w-4 text-white" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.list_price)}
            </span>
            {product.compare_list_price > product.list_price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compare_list_price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};