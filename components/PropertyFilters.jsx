import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function PropertyFilters({
  filters,
  countries,
  cities,
  subcities,
  locations,
  handleFilterChange,
  resetFilters,
}) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
        Find Your Dream Property
      </h2>
      <div className="flex justify-between items-center mb-4 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Location Filter */}
          <Select
            value={filters?.country || ""}
            onValueChange={(value) => handleFilterChange(value, "country")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries?.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* City Filter */}
          <Select
            value={filters?.city || ""}
            onValueChange={(value) => handleFilterChange(value, "city")}
            disabled={!filters?.country}
            className={!filters?.country ? "disabled-cursor" : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities?.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sub-City Filter */}
          <Select
            value={filters?.subcity || ""}
            onValueChange={(value) => handleFilterChange(value, "subcity")}
            disabled={!filters?.city}
            className={!filters?.city ? "disabled-cursor" : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Subcity" />
            </SelectTrigger>
            <SelectContent>
              {subcities?.map((subcity) => (
                <SelectItem key={subcity} value={subcity}>
                  {subcity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters?.location || ""}
            onValueChange={(value) => handleFilterChange(value, "location")}
            disabled={!filters?.subcity}
            className={!filters?.subcity ? "disabled-cursor" : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations?.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={resetFilters}
            className="bg-[#c9b68f] hover:bg-[#c2b49b] text-black"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
