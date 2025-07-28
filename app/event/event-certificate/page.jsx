"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for Portfolio
const mockPortfolioData = {
  hero: {
    backgroundImage:
      "https://res.cloudinary.com/dkqlrnz6r/image/upload/v1732695348/background_1_b4c6e3b4c8.jpg",
    title: "Our Portfolio",
  },
  categories: [
    "All",
    "Corporate Events",
    "Weddings",
    "Charity Events",
    "Product Launches",
  ],
  galleries: [
    {
      id: 1,
      attributes: {
        title: "Corporate Annual Gala",
        description:
          "A sophisticated corporate event featuring elegant decor and professional networking.",
        category: "Corporate Events",
        image: {
          data: {
            attributes: {
              url: "/certificate.png",
              alternativeText: "Corporate Annual Gala",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        title: "Summer Wedding Celebration",
        description:
          "A beautiful outdoor wedding ceremony with stunning floral arrangements.",
        category: "Weddings",
        image: {
          data: {
            attributes: {
              url: "/certificate.png",
              alternativeText: "Summer Wedding Celebration",
            },
          },
        },
      },
    },
    {
      id: 3,
      attributes: {
        title: "Charity Fundraiser",
        description:
          "An impactful charity event raising awareness and funds for a noble cause.",
        category: "Charity Events",
        image: {
          data: {
            attributes: {
              url: "/certificate.png",
              alternativeText: "Charity Fundraiser",
            },
          },
        },
      },
    },
    {
      id: 4,
      attributes: {
        title: "Tech Product Launch",
        description:
          "An innovative product launch event showcasing cutting-edge technology.",
        category: "Product Launches",
        image: {
          data: {
            attributes: {
              url: "/certificate.png",
              alternativeText: "Tech Product Launch",
            },
          },
        },
      },
    },
    {
      id: 5,
      attributes: {
        title: "Corporate Team Building",
        description:
          "An engaging team building event fostering collaboration and creativity.",
        category: "Corporate Events",
        image: {
          data: {
            attributes: {
              url: "/certificate.png",
              alternativeText: "Corporate Team Building",
            },
          },
        },
      },
    },
    {
      id: 6,
      attributes: {
        title: "Winter Wedding",
        description:
          "A magical winter wedding with elegant seasonal decorations.",
        category: "Weddings",
        image: {
          data: {
            attributes: {
              url: "/certificate.png",
              alternativeText: "Winter Wedding",
            },
          },
        },
      },
    },
  ],
};

function Certificate() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [filteredGalleries, setFilteredGalleries] = useState(
    mockPortfolioData.galleries
  );

  // Filter galleries based on active tab
  React.useEffect(() => {
    if (activeTab === "All") {
      setFilteredGalleries(mockPortfolioData.galleries);
    } else {
      const filtered = mockPortfolioData.galleries.filter((gallery) =>
        gallery.attributes.category
          .toLowerCase()
          .includes(activeTab.toLowerCase())
      );
      setFilteredGalleries(filtered);
    }
  }, [activeTab]);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const showNextImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 >= filteredGalleries.length ? 0 : prevIndex + 1
    );
  const showPrevImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex - 1 < 0 ? filteredGalleries.length - 1 : prevIndex - 1
    );

  return (
    <>
      <head>
        <title>Portfolio | Sara Events and Marketing</title>
        <meta
          name="description"
          content="Sara Events and Marketing is the best event organizer in Ethiopia."
        />
      </head>

      <Header />
      <section className="hero-section relative w-full h-[50vh] pt-20 ">
        <div className="relative w-full h-full">
          <img
            src="/bannerSara.png"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-8">
            <div className="text-white ">
              <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight ml-[410PX]">
                Certificates
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 dark:bg-[#1f2937] min-h-screen flex flex-col items-center py-10">
        <h1 className="text-3xl font-medium mb-8 dark:text-white">
          Our Certificates
        </h1>

        {/* Responsive tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {mockPortfolioData.categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-xl text-sm sm:text-base md:text-[16px] font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#137a70] text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[80%] mx-auto">
          {filteredGalleries.map((gallery, index) => {
            const { image, title, description } = gallery.attributes;
            const imageUrl = image?.data?.attributes?.url;

            return (
              <div
                key={gallery.id}
                className="relative bg-white dark:bg-gray-800 pb-10 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 h-[400px] flex flex-col"
                onClick={() => openLightbox(index)}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={image.data.attributes.alternativeText || title}
                    className="w-full h-3/4 object-cover rounded-t-lg"
                  />
                )}
                <main className="pt-1 pb-5 px-4">
                  <h1 className="text-xl mt-2 font-medium capitalize font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                </main>
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button
              className="absolute top-6 right-6 hover:cursor-pointer bg-white text-black font-bold text-3xl px-3 rounded-full"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
              onClick={showPrevImage}
            >
              &#10094;
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white text-black p-2 rounded-lg hover:cursor-pointer"
            >
              &#10095;
            </button>

            <div className="relative w-[85%] h-[85%] mx-auto">
              <div className="relative w-full h-full">
                <img
                  src={
                    filteredGalleries[selectedImageIndex]?.attributes?.image
                      ?.data?.attributes?.url
                  }
                  alt={
                    filteredGalleries[selectedImageIndex]?.attributes?.image
                      ?.data?.attributes?.alternativeText || "Selected"
                  }
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Certificate;
