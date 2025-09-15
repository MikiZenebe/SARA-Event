"use client";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useMemo } from "react";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import Image from "next/image";
import { motion } from "framer-motion";
import { addressData, mockProperties } from "@/libs/data/propertyData";

const FindProperty = () => {
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

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732648286/Spin_1x_1_5s_200px_200px_1_04797cef0e.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }

  const cardVariants = [
    {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
    {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
    {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
  ];

  return (
    <>
      <PropertyHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Property</h1>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location Filter */}
            <Select
              value={filters.country}
              onValueChange={(value) => handleFilterChange(value, "country")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select
              value={filters.city}
              onValueChange={(value) => handleFilterChange(value, "city")}
              disabled={!filters.country}
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

            {/* Subcity Filter */}
            <Select
              value={filters.subCity}
              onValueChange={(value) => handleFilterChange(value, "subcity")}
              disabled={!filters.city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subcity" />
              </SelectTrigger>
              <SelectContent>
                {subCities.map((subcity) => (
                  <SelectItem key={subcity} value={subcity}>
                    {subcity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange(value, "location")}
              disabled={!filters.subcity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Bedrooms Filter */}
            <Input
              type="number"
              placeholder="Number of Bedrooms"
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange(e.target.value, "bedrooms")}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants[index % 3]}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={property.attributes.Image?.data[0]?.attributes.url}
                  alt={
                    property.attributes.Image?.data[0]?.attributes
                      .alternativeText
                  }
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-full">
                  <img
                    src={property.attributes.Icon?.data[0]?.attributes.url}
                    alt={
                      property.attributes.Icon?.data[0]?.attributes
                        .alternativeText
                    }
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle>{property.attributes.Title}</CardTitle>
                <CardDescription>
                  {property.attributes.city?.data.attributes.Name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {property.attributes.Description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-bold">
                    {property.attributes.Price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {property.attributes.Bedrooms} Bedrooms
                  </p>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </div>
      <PropertyFooter />
    </>
  );
};

export default FindProperty;
