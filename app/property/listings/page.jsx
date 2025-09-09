"use client";
import React, { useState, useMemo } from "react";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { mockProperties } from "@/libs/data/propertyData";

export default function PropertyListings() {
  const initialFilters = {
    country: "",
    location: "",
    city: "",
    subCity: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [properties] = useState(mockProperties);

  const locations = useMemo(() => {
    return [
      ...new Set(
        properties.map(
          (p) => p.attributes.city.data.attributes.location.data.attributes.Name
        )
      ),
    ];
  }, [properties]);

  const country = useMemo(() => {
    return [
      ...new Set(
        properties.map(
          (p) =>
            p.attributes.city?.data.attributes.country?.data.attributes?.Name
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

      return locationFilter && cityFilter && subCityFilter;
    });
  }, [properties, filters]);

  return (
    <>
      <head>
        <title>Property Listings - SAM Property</title>
        <meta
          name="description"
          content="Browse our extensive collection of properties in UAE and Ethiopia."
        />
      </head>

      <PropertyHeader />

      <main className="container mx-auto px-4 py-8">
        <PropertyFilters
          filters={filters}
          country={country}
          locations={locations}
          cities={cities}
          subCities={subCities}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />

        {/* Property Listings */}
        <section className="py-16 bg-gray-50 dark:bg-[#1f2937]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <PropertyFooter />
    </>
  );
}
