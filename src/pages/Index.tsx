import { useState, useMemo, lazy, Suspense, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { FilterButton } from "@/components/FilterButton";
import { TravelGrid } from "@/components/TravelGrid";
import { Travel, SortOption } from "@/types/travel";
import { useFilteredTravels } from "@/hooks/useFilteredTravels";
import { useInfiniteTravels } from "@/hooks/useInfiniteTravels";

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
    category: [] as string[],
    sort: null as SortOption | null,
  });

  const [travels, setTravels] = useState<Travel[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteTravels();

  // Flatten all pages of travels
  const allTravels = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  // Update local travels state when new data is fetched
  useEffect(() => {
    setTravels(allTravels);
  }, [allTravels]);

  const filteredTravels = useFilteredTravels(travels, searchQuery, filters);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const availableOptions = useMemo(() => {
    return {
      activities: [...new Set(travels.map((t) => t.activity))],
      locations: [...new Set(travels.map((t) => t.location))],
      durations: [...new Set(travels.map((t) => t.duration))],
      groupSizes: [...new Set(travels.map((t) => t.group_size))],
      categories: [...new Set(travels.map((t) => t.category).filter(Boolean))],
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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Error loading travels. Please try again.</p>
      </div>
    );
  }

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
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-muted rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <TravelGrid
                travels={filteredTravels}
                onTravelClick={setSelectedTravel}
                onLikeToggle={handleLikeToggle}
              />
              
              {/* Infinite scroll sentinel */}
              <div ref={sentinelRef} className="h-10 flex items-center justify-center">
                {isFetchingNextPage && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                )}
              </div>
            </>
          )}
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
