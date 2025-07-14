import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Star, Users, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Travel } from "@/types/travel";
import { formatPrice } from "@/utils/price";

interface TravelDetailProps {
  travel: Travel;
  isOpen: boolean;
  onClose: () => void;
}

export const TravelDetail = ({ travel, isOpen, onClose }: TravelDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock carousel images - in real app would come from travel data
  const carouselImages = [
    travel.imgUrl,
    travel.imgUrl,
    travel.imgUrl,
  ];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="travel-detail-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-none">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 id="travel-detail-title" className="text-2xl font-bold">
              {travel.title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 h-auto"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Image carousel */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={carouselImages[currentImageIndex]}
              alt={`${travel.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {carouselImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 p-2 h-auto"
                  aria-label="Previous image"
                >
                  ←
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 p-2 h-auto"
                  aria-label="Next image"
                >
                  →
                </Button>
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Location and rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-xl">{travel.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-medium">{travel.rating}</span>
                <span className="text-muted-foreground">
                  ({travel.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-base text-muted-foreground">Duration</p>
                  <p className="font-medium">{travel.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-base text-muted-foreground">Group Size</p>
                  <p className="font-medium">{travel.group_size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-base text-muted-foreground">Activity</p>
                  <p className="font-medium capitalize">{travel.activity}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Experience the magic of {travel.title} in {travel.location}. This amazing {travel.activity} adventure offers unforgettable moments and breathtaking views. Perfect for groups of {travel.group_size}, this {travel.duration} journey will create memories that last a lifetime.
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-base text-muted-foreground">Price per person</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {formatPrice(travel.price)}
                  </span>
                  {travel.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      {formatPrice(travel.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <Button size="lg" className="px-8">
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};