"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import { motion } from "framer-motion";
import { mockProperties } from "../property/mockData";
import { Button } from "@/components/ui/button";

const PropertyHome = () => {
  const initialFilters = {
    location: "",
    city: "",
    subCity: "",
    priceRange: "",
    bedrooms: "any",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [properties] = useState(mockProperties);

  // Extract unique locations
  const locations = useMemo(() => {
    return [
      ...new Set(
        properties.map(
          (p) => p.attributes.city.data.attributes.location.data.attributes.Name
        )
      ),
    ];
  }, [properties]);

  // Cities depend on selected location
  const cities = useMemo(() => {
    return [
      ...new Set(
        properties
          .filter(
            (p) =>
              !filters.location ||
              p.attributes.city.data.attributes.location.data.attributes
                .Name === filters.location
          )
          .map((p) => p.attributes.city.data.attributes.Name)
      ),
    ];
  }, [properties, filters.location]);

  // SubCities depend on selected city
  const subCities = useMemo(() => {
    return [
      ...new Set(
        properties
          .filter(
            (p) =>
              !filters.city ||
              p.attributes.city.data.attributes.Name === filters.city
          )
          .flatMap((p) =>
            p.attributes.city.data.attributes.subcities.data.map(
              (s) => s.attributes.Name
            )
          )
      ),
    ];
  }, [properties, filters.city]);

  const handleFilterChange = (value, name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "location" ? { city: "", subCity: "" } : {}),
      ...(name === "city" ? { subCity: "" } : {}),
    }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const locationFilter =
        !filters.location ||
        property.attributes.city.data.attributes.location.data.attributes
          .Name === filters.location;

      const cityFilter =
        !filters.city ||
        property.attributes.city.data.attributes.Name === filters.city;

      const subCityFilter =
        !filters.subCity ||
        property.attributes.city.data.attributes.subcities.data.some(
          (sub) => sub.attributes.Name === filters.subCity
        );

      const bedroomsFilter =
        filters.bedrooms === "any" ||
        property.attributes.Bedrooms === parseInt(filters.bedrooms);

      const priceFilter =
        !filters.priceRange ||
        (filters.priceRange === "low" && property.attributes.Price < 1000000) ||
        (filters.priceRange === "mid" &&
          property.attributes.Price >= 1000000 &&
          property.attributes.Price < 5000000) ||
        (filters.priceRange === "high" && property.attributes.Price >= 5000000);

      return (
        locationFilter &&
        cityFilter &&
        subCityFilter &&
        bedroomsFilter &&
        priceFilter
      );
    });
  }, [properties, filters]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <PropertyHeader />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[500px] bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="Property background"
            className="object-cover w-full h-full opacity-30"
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl font-bold leading-tight"
          >
            Find Your Dream Property
          </motion.h1>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-4 text-lg"
          >
            Explore the best properties tailored to your needs.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg p-6">
          <CardHeader>
            <CardTitle>Find Properties</CardTitle>
            <CardDescription>
              Search for properties based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <Select
                value={filters.location}
                onValueChange={(value) => handleFilterChange(value, "location")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* City */}
              <Select
                value={filters.city}
                onValueChange={(value) => handleFilterChange(value, "city")}
                disabled={!filters.location}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sub City */}
              <Select
                value={filters.subCity}
                onValueChange={(value) => handleFilterChange(value, "subCity")}
                disabled={!filters.city}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sub City" />
                </SelectTrigger>
                <SelectContent>
                  {subCities.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price */}
              <Select
                value={filters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange(value, "priceRange")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Below 1M</SelectItem>
                  <SelectItem value="mid">1M - 5M</SelectItem>
                  <SelectItem value="high">5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                value={filters.bedrooms}
                onValueChange={(value) => handleFilterChange(value, "bedrooms")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button>Search</Button>
            </div>
          </CardContent>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-6 py-12">
        <div className="w-full max-w-6xl mx-auto">
          {filteredProperties.length === 0 ? (
            <p className="text-center text-gray-600">
              No properties found matching your criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={
                      property.attributes.Icon?.data?.attributes?.url ??
                      "/placeholder.jpg"
                    }
                    alt={property.attributes.Name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">
                      {property.attributes.Name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {property.attributes.city.data.attributes.Name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Bedrooms: {property.attributes.Bedrooms}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${property.attributes.Price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <PropertyFooter />
    </div>
  );
};

export default PropertyHome;
