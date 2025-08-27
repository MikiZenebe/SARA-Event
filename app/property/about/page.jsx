"use client";
import { useState, useEffect } from "react";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyFooter from "@/components/PropertyFooter";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { mockAboutData } from "../mockData";
import { FaBullseye, FaEye, FaBalanceScale } from "react-icons/fa";

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

  const testimonials = [
    {
      name: "W/RO Tsedale Girma",
      // title: "Chief Executive Officer, AYSOL Management Consultancy",
      content:
        "From our very first meeting, Sara event & marketing property made it clear that our needs came first. They took the time to understand exactly what we were looking for and guided us through every step of the process with honesty, transparency, and professionalism. It’s rare to find someone in real estate who truly listens and gives honest advice even when it’s not the easiest option. We felt informed, supported, and confident throughout our journey. We highly recommend Sara event & marketing property to anyone looking for a trustworthy and client-focused real estate experience.",
    },
    {
      name: "Ato Zena Asefa",
      // title: "Director, Care for the Nation",
      content:
        "Working with Sara event & marketing property was a refreshing experience. They were not just focused on making a sale; they genuinely cared about what was best for us. Their honest guidance helped us avoid costly mistakes and make confident decisions. It’s rare to find such integrity in this industry. We truly felt like we had a partner we could trust.",
    },
    {
      name: "Ato Werku Birhane",
      // title: "Ethiopia",
      content:
        "We couldn’t have asked for a better real estate experience. Sara event & marketing property was always professional, responsive, and upfront with us. They made sure our goals were the top priority and provided honest advice every step of the way. The process felt seamless because we knew we were in good hands.",
    },
  ];

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const maxChars = 150;

  return (
    <>
      <PropertyHeader />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className="hero-section relative w-full h-[35vh]">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/banner.jpg"
              alt="alt"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#969963] bg-opacity-75 flex items-center p-8">
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
                    <div class="mb-6 text-center">
                      <p class=" text-3xl font-bold  text-gray-900 dark:text-white ">
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
                          To provide customized real estate solutions catering
                          to clients specific preferences and needs. Above all
                          decreasing the hassle of clients. Ensuring seamless
                          access to properties desired in all 13 districts of
                          Adiss Ababa and Dubai.
                        </p>
                      </div>
                      <div class="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r">
                        <div class="flex items-center mb-6">
                          <FaEye color="#c9b68f" size={25} />
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
                          <FaBalanceScale color="#c9b68f" size={25} />
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

            {/* Testimonials Section */}
            <section className="py-16  dark:bg-gray-800">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Client Testimonials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, idx) => {
                  const isExpanded = expanded[idx];
                  const isLong = testimonial.content.length > maxChars;
                  const displayText =
                    isExpanded || !isLong
                      ? testimonial.content
                      : testimonial.content.slice(0, maxChars) + "...";

                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg"
                    >
                      {/* Star Rating */}
                      <div
                        className="text-yellow-400 flex mb-4"
                        aria-label="5 star rating"
                      >
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-600 italic dark:text-gray-300">
                        {displayText}
                        {isLong && (
                          <button
                            className="ml-2 text-blue-500 hover:underline"
                            onClick={() => toggleExpand(idx)}
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}
                      </p>

                      {/* Author Info */}
                      <div className="mt-6 flex items-center">
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

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
                  src={"/logo.png"}
                  alt={
                    partnerSections[0]?.partnerImage?.image?.data?.attributes
                      ?.alternativeText
                  }
                  className="w-40 object-cover rounded-lg"
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

            {/* Why Choose Us Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <motion.h2
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={titleSlide}
                      className="text-4xl font-bold text-gray-800 dark:text-white"
                    >
                      Why Choose Us{" "}
                      <span className="text-[#969963] font-bold">
                        Our Strengths
                      </span>
                    </motion.h2>

                    <p className="text-xl text-gray-600 mt-6 mb-8 dark:text-gray-300">
                      We provide exceptional real estate services backed by
                      experience, integrity, and a deep understanding of the
                      market.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-[#969963] bg-opacity-10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#137a70]"
                              viewBox="0 0 20 20"
                              fill="#969963"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Personalized Service
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Every client is unique and so are their needs. We
                            take the time to understand your preferences and
                            deliver tailor-made real estate solutions that fit
                            your lifestyle and goals.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-[#969963] bg-opacity-10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#137a70]"
                              viewBox="0 0 20 20"
                              fill="#969963"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Local Expertise, Global Reach
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            With a presence in all 13 districts of Addis Ababa
                            and access to premium listings in Dubai, we connect
                            you with the best properties both locally and
                            internationally.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-[#969963] bg-opacity-10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#137a70]"
                              viewBox="0 0 20 20"
                              fill="#969963"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Trusted by Clients, Backed by Experience
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            With over 6 years of industry experience, 50+
                            properties sold, and a growing list of satisfied
                            clients, we’re committed to transparency,
                            reliability, and results.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    // variants={imageSlideRight}
                    className="w-full h-full"
                  >
                    <div className="relative">
                      <div className="absolute -top-6 -right-6 w-full h-full bg-[#969963] bg-opacity-20 rounded-2xl"></div>
                      <img
                        src="/Property/PropertyLogo.jpeg"
                        alt="Why Choose Us"
                        className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
      <PropertyFooter />
    </>
  );
}

export default PropertyAbout;
