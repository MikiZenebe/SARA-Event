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
  locations,
  cities,
  subCities,
  handleFilterChange,
  resetFilters,
  country,
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
              {country.map((country) => (
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
            className={!filters?.location ? "disabled-cursor" : ""}
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
            value={filters?.subCity || ""}
            onValueChange={(value) => handleFilterChange(value, "subCity")}
            className={!filters?.city ? "disabled-cursor" : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sub City" />
            </SelectTrigger>
            <SelectContent>
              {subCities?.map((subCity) => (
                <SelectItem key={subCity} value={subCity}>
                  {subCity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters?.location || ""}
            onValueChange={(value) => handleFilterChange(value, "location")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations?.map((location) => (
                <SelectItem value={location} key={location}>
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
