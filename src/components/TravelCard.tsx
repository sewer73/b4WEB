import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Travel } from "@/types/travel";
import { formatPrice } from "@/utils/price";
import { toast } from "@/hooks/use-toast";

interface TravelCardProps {
  travel: Travel;
  onTravelClick: (travel: Travel) => void;
  onLikeToggle: (travelId: string) => void;
}

export const TravelCard = ({
  travel,
  onTravelClick,
  onLikeToggle,
}: TravelCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle(travel.id);
    
    if (travel.isLiked) {
      toast({
        title: "Eliminado de favoritos",
        description: `${travel.title} ha sido eliminado de tus favoritos`,
      });
    } else {
      toast({
        title: "Añadido a favoritos",
        description: `${travel.title} ha sido añadido a tus favoritos`,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
    >
      <Card
        className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
        onClick={() => onTravelClick(travel)}
      >
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            ref={imgRef}
            src={isInView ? travel.imgUrl : ""}
            alt={`${travel.title} - ${travel.location}`}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && isInView && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 p-2 h-auto bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleLikeClick}
            aria-label={travel.isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-4 w-4 ${
                travel.isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
        
        <CardContent className="p-4 space-y-2">
          <div>
            <h3 className="font-semibold text-xl truncate">{travel.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-base truncate">{travel.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{travel.rating}</span>
              <span className="text-muted-foreground text-base">
                ({travel.reviewCount} reviews)
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {travel.category || travel.activity}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xl">
                {formatPrice(travel.price)}
              </span>
              {travel.originalPrice && (
                <span className="text-muted-foreground text-base line-through">
                  {formatPrice(travel.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span className="text-base">{travel.likes}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};