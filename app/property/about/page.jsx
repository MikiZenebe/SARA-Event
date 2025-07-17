"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import Link from "next/link";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { mockAboutData } from "../mockData";

function PropertyAbout() {
  const [aboutUsSections, setAboutUsSections] = useState([]);
  const [partnerSections, setPartnerSections] = useState([]);
  const [mileStoneSections, setMileStoneSections] = useState([]);
  const [missionSection, setMissionSection] = useState([]);
  const [teamSection, setTeamSection] = useState([]);
  const [testimonialSection, setTestimonialSection] = useState([]);
  const [counterOn, setCounterOn] = useState(false);

  useEffect(() => {
    // Set data from mock
    const filteredAboutSections =
      mockAboutData.propertyAboutUs.data.attributes.blocks.filter(
        (item) => item.__typename === "ComponentLayoutPropertyAboutUs"
      );
    setAboutUsSections(filteredAboutSections);

    const filteredMissionSections =
      mockAboutData.propertyAboutUs.data.attributes.blocks.filter(
        (item) => item.__typename === "ComponentComponentsLink"
      );
    setMissionSection(filteredMissionSections);

    const filteredTeamSections =
      mockAboutData.propertyAboutUs.data.attributes.blocks.filter(
        (item) => item.__typename === "ComponentLayoutServiceCard"
      );
    setTeamSection(filteredTeamSections);

    const filteredTestimonialSections =
      mockAboutData.propertyAboutUs.data.attributes.blocks.filter(
        (item) => item.__typename === "ComponentLayoutTestimonial"
      );
    setTestimonialSection(filteredTestimonialSections);

    const filteredMileStoneSections =
      mockAboutData.propertyAboutUs.data.attributes.blocks.filter(
        (item) => item.__typename === "ComponentLayoutOurAcheivement"
      );
    setMileStoneSections(filteredMileStoneSections);

    const filteredPartnerSections =
      mockAboutData.propertyAboutUs.data.attributes.blocks.filter(
        (item) => item.__typename === "ComponentLayoutPartners"
      );
    setPartnerSections(filteredPartnerSections);
  }, []);

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
      <PropertyHeader />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className="hero-section relative w-full h-[70vh]">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732695347/background_ac0513044d.jpg"
              alt="alt"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
              <div className="w-[60%] mx-auto">
                <h1 className="text-center text-white font-medium text-4xl">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="pb-20 pt-10 bg-white dark:bg-[#1f2937]">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={titleSlide}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                {aboutUsSections[0]?.Title?.title}{" "}
                <span className="text-[#969963]">
                  {aboutUsSections[0]?.Title?.secondTitle}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                At SEM Properties, we specialize in delivering personalized real
                estate solutions that align with each client&#39;s unique
                preferences and needs. Our primary goal is to eliminate the
                stress and complexities often associated with property
                transactions, ensuring smooth and seamless access to desired
                properties across all 13 districts of Addis Ababa and in Dubai.
              </p>
            </motion.div>

            {/* Mission & Vision Cards */}

            <div>
              {missionSection.map((section, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants[index % 3]}
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
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="w-6 h-6 text-indigo-500"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                          </svg>
                          <div class="ml-4 text-xl">Mission</div>
                        </div>
                        <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                          To provide customized real estate solutions catering
                          to clients specific preferences and needs. Above all
                          decreasing the hassle of clients. Ensuring seamless
                          access to properties desired in all 13 districts of
                          Adiss Ababa and Dubai.
                        </p>
                      </div>
                      <div class="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r">
                        <div class="flex items-center mb-6">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="w-6 h-6 text-indigo-500"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                          </svg>
                          <div class="ml-4 text-xl">Vision</div>
                        </div>
                        <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                          To become an exceptional real estate marketing firm
                          recognized for our integrity, reliability, and strive
                          for virtue, both in Addis Ababa and Dubai.
                        </p>
                      </div>
                      <div class="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0">
                        <div class="flex items-center mb-6">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="w-6 h-6 text-indigo-500"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                          </svg>
                          <div class="ml-4 text-xl">Values</div>
                        </div>
                        <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                          Transparency and reliability: high standards of
                          honesty and accountability in all encounters.
                          Customer-oriented approach: providing tailored
                          solutions Local and Global reach: combining local and
                          international perspectives within the market
                          Innovation: delivering top-notch solutions that are
                          strategically created and technologically modern
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Team Section */}
            <div className="mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleSlide}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">
                  {teamSection[0]?.ServiceCard?.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {teamSection[0]?.ServiceCard?.description}
                </p>
              </motion.div>

              <div className="relative">
                <img
                  src={
                    teamSection[0]?.ServiceCard?.image?.data?.attributes?.url
                  }
                  alt={
                    teamSection[0]?.ServiceCard?.image?.data?.attributes
                      ?.alternativeText
                  }
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                  <button className="bg-[#969963] text-white px-6 py-2 rounded-lg hover:bg-[#7a6d57] transition-colors">
                    {teamSection[0]?.ServiceCard?.button}
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleSlide}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">
                  {testimonialSection[0]?.testimonailTitle?.title}{" "}
                  <span className="text-[#969963]">
                    {testimonialSection[0]?.testimonailTitle?.secondTitle}
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonialSection[0]?.testimonialCard?.map(
                  (testimonial, index) => (
                    <motion.div
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants[index % 3]}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                    >
                      <h3 className="text-xl font-semibold mb-4">
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {testimonial.description}
                      </p>
                      <button className="text-[#969963] hover:text-[#7a6d57] font-medium">
                        {testimonial.button}
                      </button>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Partners Section */}
            <div className="mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleSlide}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">
                  {partnerSections[0]?.partnerTitle?.title}{" "}
                  <span className="text-[#969963]">
                    {partnerSections[0]?.partnerTitle?.secondTitle}
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {partnerSections[0]?.partnerDescription}
                </p>
              </motion.div>

              <div className="relative">
                <img
                  src={
                    partnerSections[0]?.partnerImage?.image?.data?.attributes
                      ?.url
                  }
                  alt={
                    partnerSections[0]?.partnerImage?.image?.data?.attributes
                      ?.alternativeText
                  }
                  className="w-full h-[200px] object-cover rounded-lg"
                />
              </div>
            </div>

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
                            <CountUp
                              end={parseInt(achievement.title)}
                              duration={2}
                            />
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
          </div>
        </section>
      </div>
      <PropertyFooter />
    </>
  );
}

export default PropertyAbout;
