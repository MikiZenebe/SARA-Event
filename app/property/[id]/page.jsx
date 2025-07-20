"use client";
import React from "react";
import { useParams } from "next/navigation";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import { Button } from "@/components/ui/button";
import { mockProperties } from "../mockData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = mockProperties.find((prop) => prop.id === id);

  if (!property) {
    return <div>Property not found</div>;
  }

  const attributes = property.attributes;
  const city = attributes.city.data.attributes;
  const location = city.location.data.attributes;
  const subCities = city.subcities.data;

  // Mock additional images for the gallery
  const galleryImages = [
    attributes.Image.data.attributes.url,
    "/Property/house2.jpg",
    "/Property/house3.jpg",
    "/Property/house4.jpg",
  ];

  // Mock similar properties
  const similarProperties = mockProperties
    .filter(
      (prop) =>
        prop.id !== id &&
        prop.attributes.city.data.attributes.Name === city.Name
    )
    .slice(0, 3);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <head>
        <title>{attributes.Title} | SAM Property</title>
        <meta name="description" content={attributes.Description} />
      </head>

      <PropertyHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {attributes.Title}
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {subCities[0]?.attributes.Name}, {location.Name}, {city.Name}
            </span>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            modules={[Pagination, Autoplay]}
            className="rounded-lg shadow-lg"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="h-96 w-full">
                  <img
                    src={image}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Property Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {attributes.Description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <FaBed className="text-[#c9b68f] mr-2 text-xl" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Bedrooms
                    </p>
                    <p className="font-semibold dark:text-white">
                      {attributes.Bedrooms}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaBath className="text-[#c9b68f] mr-2 text-xl" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Bathrooms
                    </p>
                    <p className="font-semibold dark:text-white">
                      {attributes.Bedrooms > 2
                        ? Math.floor(attributes.Bedrooms / 2)
                        : 1}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaRulerCombined className="text-[#c9b68f] mr-2 text-xl" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Area
                    </p>
                    <p className="font-semibold dark:text-white">
                      {attributes.Bedrooms * 50} m²
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {[
                  "Fully Furnished",
                  "Modern Kitchen",
                  "Balcony",
                  "Parking Space",
                  "Security System",
                  "Swimming Pool",
                  "Gym",
                  "24/7 Electricity",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#c9b68f] rounded-full mr-2"></span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Location
              </h3>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
                {/* Map placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Map would be displayed here
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {subCities[0]?.attributes.Name} is a prime location in{" "}
                {city.Name}, known for its excellent amenities and connectivity.
              </p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[#c9b68f]">
                  ${attributes.Price.toLocaleString()}
                </h3>
                <span className="bg-[#c9b68f] text-black text-sm px-3 py-1 rounded-full">
                  For Sell
                </span>
              </div>

              <div className="mb-6">
                <a href="tel:+251900014100">
                  <Button className="w-full bg-[#c9b68f] hover:bg-[#837559] text-black py-6 text-lg mb-4">
                    Contact Agent
                  </Button>
                </a>
              </div>

              {/* <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Property Agent
                </h4>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 mr-4 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/42.jpg"
                      alt="Agent"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold dark:text-white">John Doe</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Senior Property Agent
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-5 text-gray-500 dark:text-gray-400">
                      📞
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      +251 912 345 678
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 text-gray-500 dark:text-gray-400">
                      ✉️
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      john.doe@samproperty.com
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 w-full">
                    <img
                      src={property.attributes.Image.data.attributes.url}
                      alt={
                        property.attributes.Image.data.attributes
                          .alternativeText
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {property.attributes.Title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                      <FaMapMarkerAlt className="mr-2 text-sm" />
                      <span className="text-sm">
                        {
                          property.attributes.city.data.attributes.subcities
                            .data[0].attributes.Name
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#c9b68f] font-bold">
                        ${property.attributes.Price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 flex items-center">
                        <FaBed className="mr-1" />{" "}
                        {property.attributes.Bedrooms}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-[#c9b68f] hover:bg-[#96876a] text-black"
                      onClick={() =>
                        (window.location.href = `/property/${property.id}`)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <PropertyFooter />
    </>
  );
};

export default PropertyDetail;
