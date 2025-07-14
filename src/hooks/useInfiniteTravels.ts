import { useInfiniteQuery } from "@tanstack/react-query";
import { Travel } from "@/types/travel";
import { travels } from "@/data/travels";

const ITEMS_PER_PAGE = 8;

interface TravelsPage {
  data: Travel[];
  nextPage?: number;
  hasMore: boolean;
}

const fetchTravels = async ({ pageParam = 0 }): Promise<TravelsPage> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const start = pageParam * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const data = travels.slice(start, end);
  const hasMore = end < travels.length;
  
  return {
    data,
    nextPage: hasMore ? pageParam + 1 : undefined,
    hasMore,
  };
};

export const useInfiniteTravels = () => {
  return useInfiniteQuery({
    queryKey: ["travels"],
    queryFn: fetchTravels,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};