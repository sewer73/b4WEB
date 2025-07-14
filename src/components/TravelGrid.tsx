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
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 p-2 space-y-0">
      {travels.map((travel) => (
        <div key={travel.id} className="break-inside-avoid mb-6">
          <TravelCard
            travel={travel}
            onTravelClick={onTravelClick}
            onLikeToggle={onLikeToggle}
          />
        </div>
      ))}
    </div>
  );
};