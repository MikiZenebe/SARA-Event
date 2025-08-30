"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Page = () => {
  const titleSlide = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageSlideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
    exit: { opacity: 0, x: 100 },
  };

  // Carousel setup
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const carouselImages = [
    "/home_slide1.jpg",
    "/home_slide2.jpg",
    "/home_slide3.jpg",
    "/aboutEvent/homeSlide1.jpg",
    "/aboutEvent/homeSlide2.jpg",
    // Add more image URLs here
  ];

  return (
    <>
      <head>
        <title>Sara Events and Marketing and SAM Property Listing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <div className="bg-[#187c74] min-h-screen px-0 pb-12 font-sans text-white">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-full mx-auto  overflow-hidden shadow-xl"
        >
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="flex ">
              <div className=" flex-[0_0_100%] min-w-0 relative rounded-none">
                <img
                  src="/landing_banner.jpg"
                  alt={`Carousel image `}
                  className="w-full h-screen  object-cover"
                />

                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

                <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2   text-white px-4 py-2 z-50">
                  <img
                    src="/logo.png"
                    alt={`Carousel image `}
                    className="w-full h-96"
                  />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded">
                  <p className="text-center text-sm sm:text-xl">
                    Just think it we will make it happen
                  </p>
                </div>

                <motion.div
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-4 right-5 mt-2 transform   p-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Straight down arrow */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m0 0l-6-6m6 6l6-6"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="my-8">
          {" "}
          <p className="max-w-4xl mx-auto text-lg  text-[#e1f5f3] leading-relaxed">
            At SARA, we bring your ideas to life — from unforgettable events and
            high-quality imports to bold marketing strategies and luxury real
            estate investments. With our dedicated team and eye for detail, we
            help you turn moments into milestones. Explore our world of
            excellence through SEM Properties and more.
          </p>
        </div>

        {/* Services Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageSlideRight}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Events Management */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl bg-white text-[#187c74] shadow-xl overflow-hidden group"
            >
              <CardHeader className="p-0">
                <img
                  src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732650082/3_W7_A9014_1_cb772560c0.jpg"
                  alt="Events"
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-8">
                <CardTitle className="text-2xl font-semibold mb-2">
                  Events Management
                </CardTitle>
                <CardDescription className="text-[#187c74] mb-4">
                  We design experiences that captivate — from intimate
                  celebrations to large-scale productions.
                </CardDescription>
                <ul className="list-disc list-inside space-y-1 text-[#187c74]">
                  <li>Upcoming Events</li>
                  <li>Event Management</li>
                  <li>Event Gallery</li>
                </ul>
                <a
                  target="_blank"
                  href="/event"
                  className="mt-6 inline-block bg-[#187c74] hover:bg-[#14625d] text-white font-bold py-2 px-6 rounded-full"
                >
                  See Our Events
                </a>
              </CardContent>
            </motion.div>

            {/* Property Management */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl bg-white text-[#959563] shadow-xl overflow-hidden group"
            >
              <CardHeader className="p-0">
                <img
                  src="https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732650749/photo_5800701578242541043_y_1_e6682c900f.jpg"
                  alt="Property"
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-8">
                <CardTitle className="text-2xl font-semibold mb-2">
                  Property Management
                </CardTitle>
                <CardDescription className="text-[#959563] mb-4">
                  Discover high-end real estate with SEM Properties — where
                  investment meets lifestyle.
                </CardDescription>
                <ul className="list-disc list-inside space-y-1 text-[#959563]">
                  <li>Available Properties</li>
                  <li>Property Management</li>
                  <li>Investment Opportunities</li>
                </ul>
                <a
                  target="_blank"
                  href="/property"
                  className="mt-6 inline-block bg-[#959563] hover:bg-[#7a7a4f] text-white font-bold py-2 px-6 rounded-full"
                >
                  Browse Properties
                </a>
              </CardContent>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to bring your vision to life?
          </h2>
          <p className="text-lg text-[#e1f5f3] mb-6">
            Let&#39;s build something unforgettable together.
          </p>
          <button className="bg-white text-[#187c74] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#f1f1f1] transition">
            <Link href={"/event/contact"}>Contact Us</Link>
          </button>
        </motion.section>
      </div>
    </>
  );
};

export default Page;

