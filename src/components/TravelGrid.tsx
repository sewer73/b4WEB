import { Travel } from "@/types/travel";
import { TravelCard } from "./TravelCard";

interface TravelGridProps {
  travels: Travel[];
  onTravelClick: (travel: Travel) => void;
  onLikeToggle: (travelId: string) => void;
}

export const TravelGrid = ({
  travels,
  onTravelClick,
  onLikeToggle,
}: TravelGridProps) => {
  if (travels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-xl">No travels found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
      {travels.map((travel) => (
        <TravelCard
          key={travel.id}
          travel={travel}
          onTravelClick={onTravelClick}
          onLikeToggle={onLikeToggle}
        />
      ))}
    </div>
  );
};