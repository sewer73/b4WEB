import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SortOption } from "@/types/travel";

interface FilterButtonProps {
  filters: {
    activity: string[];
    location: string[];
    duration: string[];
    group_size: string[];
    category: string[];
    sort: SortOption | null;
  };
  onFiltersChange: (filters: {
    activity: string[];
    location: string[];
    duration: string[];
    group_size: string[];
    category: string[];
    sort: SortOption | null;
  }) => void;
  availableOptions: {
    activities: string[];
    locations: string[];
    durations: string[];
    groupSizes: string[];
    categories: string[];
  };
}

export const FilterButton = ({
  filters,
  onFiltersChange,
  availableOptions,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMultiSelectChange = (
    type: "activity" | "location" | "duration" | "group_size" | "category",
    value: string,
    checked: boolean,
  ) => {
    const currentValues = filters[type];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFiltersChange({
      ...filters,
      [type]: newValues,
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sort: value as SortOption,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      activity: [],
      location: [],
      duration: [],
      group_size: [],
      category: [],
      sort: null,
    });
  };

  const hasActiveFilters = 
    filters.activity.length > 0 ||
    filters.location.length > 0 ||
    filters.duration.length > 0 ||
    filters.group_size.length > 0 ||
    filters.category.length > 0 ||
    filters.sort !== null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          className="gap-2"
          aria-label="Open filters menu"
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-auto p-1 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Activity Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Activity</Label>
            {availableOptions.activities.map((activity) => (
              <div key={activity} className="flex items-center space-x-2">
                <Checkbox
                  id={`activity-${activity}`}
                  checked={filters.activity.includes(activity)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange("activity", activity, !!checked)
                  }
                />
                <Label
                  htmlFor={`activity-${activity}`}
                  className="text-sm capitalize"
                >
                  {activity}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Location Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location</Label>
            {availableOptions.locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={filters.location.includes(location)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange("location", location, !!checked)
                  }
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Duration Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Duration</Label>
            {availableOptions.durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={filters.duration.includes(duration)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange("duration", duration, !!checked)
                  }
                />
                <Label
                  htmlFor={`duration-${duration}`}
                  className="text-sm"
                >
                  {duration}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Group Size Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Group Size</Label>
            {availableOptions.groupSizes.map((groupSize) => (
              <div key={groupSize} className="flex items-center space-x-2">
                <Checkbox
                  id={`group-${groupSize}`}
                  checked={filters.group_size.includes(groupSize)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange("group_size", groupSize, !!checked)
                  }
                />
                <Label
                  htmlFor={`group-${groupSize}`}
                  className="text-sm"
                >
                  {groupSize}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Category Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            {availableOptions.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.category.includes(category)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange("category", category, !!checked)
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Sort Options */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sort by</Label>
            <RadioGroup
              value={filters.sort || ""}
              onValueChange={handleSortChange}
            >
              {Object.values(SortOption).map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`sort-${option}`} />
                  <Label htmlFor={`sort-${option}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};