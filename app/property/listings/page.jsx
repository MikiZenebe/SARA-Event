"use client";
import React, { useState, useMemo } from "react";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { addressData, mockProperties } from "@/libs/data/propertyData";

export default function PropertyListings() {
  const initialFilters = {
    country: "",
    city: "",
    subcity: "",
    location: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const [properties] = useState(mockProperties);

  const countries = useMemo(() => {
    return [...new Set(addressData.map((item) => item.country))];
  }, []);

  const cities = useMemo(() => {
    if (!filters.country) return [];
    const selectedCountry = addressData.find(
      (item) => item.country === filters.country
    );
    return selectedCountry
      ? selectedCountry.cities.map((city) => city.name)
      : [];
  }, [filters.country]);

  const subcities = useMemo(() => {
    if (!filters.city) return [];
    const selectedCountry = addressData.find(
      (item) => item.country === filters.country
    );
    const selectedCity = selectedCountry?.cities.find(
      (city) => city.name === filters.city
    );
    return selectedCity
      ? selectedCity.subcities.map((subcity) => subcity.name)
      : [];
  }, [filters.country, filters.city]);

  const locations = useMemo(() => {
    if (!filters.subcity) return [];
    const selectedCountry = addressData.find(
      (item) => item.country === filters.country
    );
    const selectedCity = selectedCountry?.cities.find(
      (city) => city.name === filters.city
    );
    const selectedSubcity = selectedCity?.subcities.find(
      (subcity) => subcity.name === filters.subcity
    );
    return selectedSubcity ? selectedSubcity.locations : [];
  }, [filters.country, filters.city, filters.subcity]);

  const handleFilterChange = (value, name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && {
        city: "",
        subcity: "",
        location: "",
        bedrooms: "",
      }),
      ...(name === "city" && { subcity: "", location: "", bedrooms: "" }),
      ...(name === "subcity" && { location: "", bedrooms: "" }),
      ...(name === "location" && { bedrooms: "" }),
    }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const countryFilter =
        !filters.country ||
        property.attributes.Address.Country === filters.country;
      const cityFilter =
        !filters.city || property.attributes.Address.City === filters.city;
      const subcityFilter =
        !filters.subcity ||
        property.attributes.Address.Subcity === filters.subcity;
      const locationFilter =
        !filters.location ||
        property.attributes.Address.Location === filters.location;
      const bedroomsFilter =
        !filters.bedrooms ||
        property.attributes.Bedrooms === parseInt(filters.bedrooms);

      return (
        countryFilter &&
        cityFilter &&
        subcityFilter &&
        locationFilter &&
        bedroomsFilter
      );
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
          countries={countries}
          locations={locations}
          cities={cities}
          subcities={subcities}
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
