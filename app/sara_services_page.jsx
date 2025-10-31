import React from "react";
import { motion } from "framer-motion";

const ServicesPage = () => {
  return (
    <div className="bg-[#187c74] min-h-screen px-6 py-12 font-sans text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
          Sara Event & Marketing
        </h1>
        <p className="max-w-4xl mx-auto text-xl text-[#e1f5f3] leading-relaxed">
          At SARA, we bring your ideas to life — from unforgettable events and
          high-quality imports to bold marketing strategies and luxury real
          estate investments. With our dedicated team and eye for detail, we
          help you turn moments into milestones. Explore our world of excellence
          through SEM Properties and more.
        </p>
      </motion.section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Events Management */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl bg-white text-[#187c74] shadow-xl overflow-hidden group"
          >
            <img
              src="/images/events.jpg"
              alt="Events"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-2">Events Management</h3>
              <p className="mb-4">
                We design experiences that captivate — from intimate
                celebrations to large-scale productions.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Custom Event Planning</li>
                <li>Corporate & Private Events</li>
                <li>Creative Direction</li>
              </ul>
              <button className="mt-6 bg-[#187c74] hover:bg-[#14625d] text-white font-bold py-2 px-6 rounded-full">
                See Our Events
              </button>
            </div>
          </motion.div>

          {/* Property Management */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl bg-white text-[#959563] shadow-xl overflow-hidden group"
          >
            <img
              src="/images/propManag.jpg"
              alt="Property"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-2">
                Property Management
              </h3>
              <p className="mb-4">
                Discover high-end real estate with SEM Properties — where
                investment meets lifestyle.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Luxury Apartments & Villas</li>
                <li>Property Management Services</li>
                <li>Investment Guidance</li>
              </ul>
              <button className="mt-6 bg-[#959563] hover:bg-[#7a7a4f] text-white font-bold py-2 px-6 rounded-full">
                Browse Properties
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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
          Let’s build something unforgettable together.
        </p>
        <button className="bg-white text-[#187c74] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#f1f1f1] transition">
          Contact Us
        </button>
      </motion.section>
    </div>
  );
};

export default ServicesPage;
