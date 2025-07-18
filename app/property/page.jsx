"use client";
import React, { useState, useCallback, useMemo } from "react";
import PropertyFooter from "@/components/PropertyFooter";
import PropertyHeader from "@/components/PropertyHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { mockProperties, mockCities } from "./mockData";
import { FaBalanceScale, FaBullseye, FaEye } from "react-icons/fa";

// Mock data for additional sections
const mockHomeData = {
  hero: {
    title: "Discover Luxury Living",
    subtitle:
      "Find properties that match your style and redefine your standards of living.",
    backgroundImage: "/propertybg.jpg",
  },
  aboutUs: {
    title: "About Us",
    description:
      "At SEM Properties, we specialize in delivering personalized real estate solutions that align with each client's unique preferences and needs. Our primary goal is to eliminate the stress and complexities often associated with property transactions, ensuring smooth and seamless access to desired properties across all 13 districts of Addis Ababa and in Dubai.",
    image:
      "https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732650082/about-us_1.jpg",
  },
  partners: {
    title: "Our Partners",
    logos: [
      {
        url: "logo.png",
        alt: "Partner 1",
      },
    ],
  },
  achievements: {
    title: "Our Achievements",
    stats: [
      { number: 500, label: "Properties Sold" },
      { number: 1000, label: "Happy Clients" },
      { number: 50, label: "Awards Won" },
      { number: 10, label: "Years Experience" },
    ],
  },
};

const PropertyHome = React.memo(function PropertyHome() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.Name) {
      toast.error("Name required...");
      return false;
    }
    if (!formData.Email) {
      toast.error("Email required...");
      return false;
    }
    if (!formData.Message) {
      toast.error("Message required...");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully!");
      setFormData({ Name: "", Email: "", Message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message");
    }
  };

  const initialFilters = {
    location: "",
    city: "",
    subCity: "",
    priceRange: "",
    propertyType: "all",
    bedrooms: "any",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [properties] = useState(mockProperties);
  const [locations] = useState([
    ...new Set(
      mockCities.cities.data.map(
        (city) => city.attributes.location.data.attributes.Name
      )
    ),
  ]);
  const [cities] = useState([
    ...new Set(mockCities.cities.data.map((city) => city.attributes.Name)),
  ]);
  const [subCities] = useState([
    ...new Set(
      mockCities.cities.data.flatMap((city) =>
        city.attributes.subcities.data.map((subcity) => subcity.attributes.Name)
      )
    ),
  ]);
  const [counterOn, setCounterOn] = useState(false);

  const handleFilterChange = (value, name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      ...initialFilters,
      bedrooms: "any",
    });
  };

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
          (subcity) => subcity.attributes.Name === filters.subCity
        );
      const bedroomsFilter =
        filters.bedrooms === "any" ||
        property.attributes.Bedrooms === parseInt(filters.bedrooms);

      return locationFilter && cityFilter && subCityFilter && bedroomsFilter;
    });
  }, [properties, filters]);

  console.log(filteredProperties);

  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.5,
        duration: 0.7,
      },
    }),
  };

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
      <head>
        <title>SAM Property Listing and Management</title>
        <meta
          name="description"
          content="SAM Property Listing and Management is the best Property listing in UAE and Ethiopia."
        />
      </head>

      <PropertyHeader />
      <Toaster position="top-right" reverseOrder={false} />
      <header
        className="relative w-full h-[70vh] flex justify-center items-center bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('${mockHomeData.hero.backgroundImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleSlide}
          className="relative z-10 text-center px-4 flex flex-col items-center justify-center text-white"
        >
          <h3 className="text-4xl md:text-6xl font-bold mb-2">
            {mockHomeData.hero.title}
          </h3>
          <p className="text-lg md:text-xl mb-8">
            {mockHomeData.hero.subtitle}
          </p>
          <Button
            onClick={() => (window.location.href = "/property/listings")}
            className="bg-[#c9b68f] hover:bg-[#9c8d70] text-black px-8 py-6 text-lg"
          >
            View All Properties
          </Button>
        </motion.div>
      </header>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={titleSlide}
        className="bg-white dark:bg-[#1f2937] w-[83%] mx-auto shadow-lg rounded-lg flex flex-col md:flex-row justify-center items-center px-8 py-6 -mt-20 z-10 relative"
      >
        <section>
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
            Find Your Dream Property
          </h2>
          <div className="flex justify-between items-center mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {/* Location Filter */}
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

              {/* City Filter */}
              <Select
                value={filters?.city || ""}
                onValueChange={(value) => handleFilterChange(value, "city")}
                disabled={!filters?.location}
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
                disabled={!filters?.city}
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

              {/* Bedrooms Filter */}
              {/* <Select
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
              </Select> */}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={resetFilters}
              className="bg-[#c9b68f] hover:bg-[#c2b49b] text-black"
            >
              Reset Filters
            </Button>
          </div>
        </section>
      </motion.div>

      {/* Property Listings */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants[index % 3]}
              >
                <Card
                  className="h-full cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/property/${property.id}`)
                  }
                >
                  <CardHeader className="p-0">
                    <img
                      src={property.attributes.Image.data.attributes.url}
                      alt={
                        property.attributes.Image.data.attributes
                          .alternativeText
                      }
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold mb-2 dark:text-white">
                      {property.attributes.Title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                      {property.attributes.Description}
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <span className="text-[#948567] font-bold">
                        ${property.attributes.Price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.attributes.Bedrooms} Beds
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white dark:bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full flex justify-center md:w-1/2 mx-auto">
              <img
                src={"/Property/PropertyLogo.jpeg"}
                alt="About Us"
                className="w-[50%] h-auto rounded-lg "
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                {mockHomeData.aboutUs.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {mockHomeData.aboutUs.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
            {mockHomeData.partners.title}
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            loop={true}
            modules={[Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="w-full"
          >
            {mockHomeData.partners.logos.map((logo, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={logoVariants}
                  className="flex justify-center items-center mx-auto w-full"
                >
                  <img
                    src={logo.url}
                    alt={logo.alt}
                    className="w-48 h-32 object-contain"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <motion.div
        // key={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        // variants={cardVariants[index % 3]}
      >
        <div class="container p-6 px-6 mx-auto bg-white dark:bg-gray-800">
          <div class="mb-16 text-center">
            <p class="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              SEM properties
            </p>
          </div>
          <div class="flex flex-wrap my-12 dark:text-white">
            <div class="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3">
              <div class="flex items-center mb-6">
                <FaBullseye color="#c9b68f" size={25} />
                <div class="ml-4 text-xl">Mission</div>
              </div>
              <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                To provide customized real estate solutions catering to clients
                specific preferences and needs. Above all decreasing the hassle
                of clients. Ensuring seamless access to properties desired in
                all 13 districts of Adiss Ababa and Dubai.
              </p>
            </div>
            <div class="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r">
              <div class="flex items-center mb-6">
                <FaEye color="#c9b68f" size={25} />
                <div class="ml-4 text-xl">Vision</div>
              </div>
              <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                To become an exceptional real estate marketing firm recognized
                for our integrity, reliability, and strive for virtue, both in
                Addis Ababa and Dubai.
              </p>
            </div>
            <div class="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0">
              <div class="flex items-center mb-6">
                <FaBalanceScale color="#c9b68f" size={25} />
                <div class="ml-4 text-xl">Values</div>
              </div>
              <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                Transparency and reliability: high standards of honesty and
                accountability in all encounters. Customer-oriented approach:
                providing tailored solutions Local and Global reach: combining
                local and international perspectives within the market
                Innovation: delivering top-notch solutions that are
                strategically created and technologically modern
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievements Section */}
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className="mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleSlide}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              {mileStoneSections[0]?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {mileStoneSections[0]?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mileStoneSections[0]?.acheivementCard?.map(
              (achievement, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants[index % 3]}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
                >
                  <h3 className="text-4xl font-bold text-[#969963] mb-4">
                    {counterOn && (
                      <CountUp end={parseInt(achievement.title)} duration={2} />
                    )}
                    {!counterOn && achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {achievement.description}
                  </p>
                  <button className="text-[#969963] hover:text-[#7a6d57] font-medium">
                    {achievement.button}
                  </button>
                </motion.div>
              )
            )}
          </div>
        </div>
      </ScrollTrigger>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="Name"
                  name="Name"
                  type="text"
                  placeholder="Your Name"
                  onChange={handleInputChange}
                  value={formData.Name}
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  id="Email"
                  name="Email"
                  type="email"
                  placeholder="Your Email"
                  onChange={handleInputChange}
                  value={formData.Email}
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  id="Message"
                  name="Message"
                  placeholder="Your Message"
                  onChange={handleInputChange}
                  value={formData.Message}
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#c9b68f] hover:bg-[#75694f] text-black"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <PropertyFooter />
    </>
  );
});

export default PropertyHome;
