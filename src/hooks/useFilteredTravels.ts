import { useMemo } from "react";
import { Travel, SortOption } from "@/types/travel";

interface Filters {
  activity: string[];
  location: string[];
  duration: string[];
  group_size: string[];
  sort: SortOption | null;
}

export const useFilteredTravels = (
  travels: Travel[],
  searchQuery: string,
  filters: Filters,
) => {
  return useMemo(() => {
    let filtered = travels.filter((travel) => {
      // Search filter
      const matchesSearch =
        travel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        travel.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Activity filter
      const matchesActivity =
        filters.activity.length === 0 ||
        filters.activity.includes(travel.activity);

      // Location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.includes(travel.location);

      // Duration filter
      const matchesDuration =
        filters.duration.length === 0 ||
        filters.duration.includes(travel.duration);

      // Group size filter
      const matchesGroupSize =
        filters.group_size.length === 0 ||
        filters.group_size.includes(travel.group_size);

      return (
        matchesSearch &&
        matchesActivity &&
        matchesLocation &&
        matchesDuration &&
        matchesGroupSize
      );
    });

    // Sort
    if (filters.sort) {
      switch (filters.sort) {
        case SortOption.BEST_RATED:
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case SortOption.LOWEST_PRICE:
          filtered.sort((a, b) => a.price - b.price);
          break;
        case SortOption.HIGHEST_PRICE:
          filtered.sort((a, b) => b.price - a.price);
          break;
      }
    }

    return filtered;
  }, [travels, searchQuery, filters]);
};