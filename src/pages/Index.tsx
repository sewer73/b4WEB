import { useState, useMemo, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { FilterButton } from "@/components/FilterButton";
import { TravelGrid } from "@/components/TravelGrid";
import { Travel, SortOption } from "@/types/travel";
import { useFilteredTravels } from "@/hooks/useFilteredTravels";

const TravelDetail = lazy(() =>
  import("@/components/TravelDetail").then((module) => ({
    default: module.TravelDetail,
  }))
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [filters, setFilters] = useState({
    activity: [] as string[],
    location: [] as string[],
    duration: [] as string[],
    group_size: [] as string[],
    sort: null as SortOption | null,
  });

  const [travels, setTravels] = useState<Travel[]>([
    {
      id: "1",
      title: "Adventure in the Alps",
      location: "Switzerland",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviewCount: 124,
      duration: "7 days",
      group_size: "8-12 people",
      activity: "adventure",
      likes: 89,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "2",
      title: "Cultural Tour of Japan",
      location: "Tokyo",
      price: 2199,
      rating: 4.9,
      reviewCount: 89,
      duration: "10 days",
      group_size: "6-10 people",
      activity: "cultural",
      likes: 156,
      isLiked: true,
      imgUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "3",
      title: "Tropical Paradise Escape",
      location: "Maldives",
      price: 3499,
      rating: 4.7,
      reviewCount: 67,
      duration: "5 days",
      group_size: "2-4 people",
      activity: "relaxation",
      likes: 234,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "4",
      title: "Northern Lights Safari",
      location: "Iceland",
      price: 1899,
      originalPrice: 2199,
      rating: 4.6,
      reviewCount: 156,
      duration: "6 days",
      group_size: "4-8 people",
      activity: "nature",
      likes: 178,
      isLiked: true,
      imgUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "5",
      title: "Urban Photography Walk",
      location: "New York",
      price: 299,
      rating: 4.4,
      reviewCount: 203,
      duration: "1 day",
      group_size: "6-12 people",
      activity: "urban",
      likes: 92,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "6",
      title: "Amazon Rainforest Expedition",
      location: "Brazil",
      price: 2799,
      rating: 4.8,
      reviewCount: 78,
      duration: "8 days",
      group_size: "4-6 people",
      activity: "nature",
      likes: 145,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "7",
      title: "Mediterranean Sailing",
      location: "Greece",
      price: 1699,
      rating: 4.5,
      reviewCount: 134,
      duration: "7 days",
      group_size: "6-8 people",
      activity: "adventure",
      likes: 167,
      isLiked: true,
      imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "8",
      title: "Moroccan Desert Adventure",
      location: "Morocco",
      price: 999,
      originalPrice: 1299,
      rating: 4.7,
      reviewCount: 189,
      duration: "5 days",
      group_size: "8-15 people",
      activity: "adventure",
      likes: 198,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "9",
      title: "Balinese Cooking Class",
      location: "Bali",
      price: 199,
      rating: 4.9,
      reviewCount: 267,
      duration: "4 hours",
      group_size: "4-10 people",
      activity: "cultural",
      likes: 312,
      isLiked: true,
      imgUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "10",
      title: "Spa Retreat in Tuscany",
      location: "Italy",
      price: 2299,
      rating: 4.6,
      reviewCount: 98,
      duration: "6 days",
      group_size: "2-6 people",
      activity: "relaxation",
      likes: 145,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "11",
      title: "Patagonia Hiking Expedition",
      location: "Argentina",
      price: 1999,
      rating: 4.8,
      reviewCount: 112,
      duration: "9 days",
      group_size: "6-10 people",
      activity: "adventure",
      likes: 189,
      isLiked: false,
      imgUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "12",
      title: "Seoul Street Food Tour",
      location: "South Korea",
      price: 149,
      rating: 4.5,
      reviewCount: 234,
      duration: "3 hours",
      group_size: "8-16 people",
      activity: "cultural",
      likes: 156,
      isLiked: true,
      imgUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
  ]);

  const filteredTravels = useFilteredTravels(travels, searchQuery, filters);

  const availableOptions = useMemo(() => {
    return {
      activities: [...new Set(travels.map((t) => t.activity))],
      locations: [...new Set(travels.map((t) => t.location))],
      durations: [...new Set(travels.map((t) => t.duration))],
      groupSizes: [...new Set(travels.map((t) => t.group_size))],
    };
  }, [travels]);

  const handleLikeToggle = (travelId: string) => {
    setTravels((prev) =>
      prev.map((travel) => {
        if (travel.id === travelId) {
          const newIsLiked = !travel.isLiked;
          return {
            ...travel,
            isLiked: newIsLiked,
            likes: newIsLiked ? travel.likes + 1 : travel.likes - 1,
          };
        }
        return travel;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StickySearchBar value={searchQuery} onChange={setSearchQuery} />
      
      {/* Hero Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Discover Amazing Travels
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your next adventure from thousands of unique experiences around the world
            </p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </section>

      {/* Filters and Results */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredTravels.length} travels found
            </h2>
            <FilterButton
              filters={filters}
              onFiltersChange={setFilters}
              availableOptions={availableOptions}
            />
          </div>
          
          <TravelGrid
            travels={filteredTravels}
            onTravelClick={setSelectedTravel}
            onLikeToggle={handleLikeToggle}
          />
        </div>
      </section>

      {/* Travel Detail Modal */}
      {selectedTravel && (
        <Suspense fallback={<div>Loading...</div>}>
          <TravelDetail
            travel={selectedTravel}
            isOpen={!!selectedTravel}
            onClose={() => setSelectedTravel(null)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
