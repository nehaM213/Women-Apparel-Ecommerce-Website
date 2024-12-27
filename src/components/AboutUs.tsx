import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-medium mb-12">Lazuli By Neha</h1>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">ABOUT LAZULI</h2>
          <p className="text-gray-600">
            Meet <span className="font-medium">Neha Maurya</span>, a dedicated software engineer with a unique blend of technical expertise and creative flair. Neha's passion for sarees transcends beyond just wearing them—she revels in designing and curating sarees that reflect elegance, tradition, and modernity.
          </p>
          
          <p className="text-gray-600">
            In her world, sarees are not merely attire but an expression of art, culture, and personal style. With a keen eye for detail and a deep-rooted love for heritage, Neha aspires to bring innovative designs to life, celebrating the timeless beauty of this six-yard wonder.
          </p>

          <p className="text-gray-600">
            Through her journey, she intertwines the precision of software engineering with the grace and creativity of saree artistry, proving that passions from seemingly different worlds can harmoniously coexist. Neha invites you to join her on this vibrant journey where technology meets tradition, creating a legacy of innovation and beauty.
          </p>
        </div>
        <div className="relative h-[600px] w-full">
          <Image
            src="/about-us.jpg"
            alt="Lazuli By Neha"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Our Philosophy Section */}
      <div className="space-y-8 mb-16">
        <h2 className="text-xl font-medium">OUR PHILOSOPHY</h2>
        <p className="text-gray-600">
          At <span className="font-medium">Lazuli</span>, we believe in the perfect blend of tradition and innovation. Each saree in our collection tells a unique story, carefully crafted to embrace both heritage and contemporary design sensibilities.
        </p>

        <p className="text-gray-600">
          Our commitment to quality and attention to detail reflects the same precision and excellence that guides software engineering. We strive to create pieces that are not just garments, but works of art that celebrate the beauty of Indian craftsmanship.
        </p>

        <p className="text-gray-600">
          Every design is thoughtfully curated to empower women to express their individuality while honoring the timeless elegance of traditional Indian wear. We invite you to explore our collection and be part of this beautiful journey where each saree tells a story of artistry, innovation, and grace.
        </p>
      </div>

      {/* Quotes Section */}
      <div className="space-y-4 italic text-gray-700 mb-16">
        <p className="font-medium">"Where tradition meets innovation, beauty finds its true expression"</p>
        <p className="font-medium">"Every saree tells a story, every drape creates a memory"</p>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-medium mb-4">Let's Stay In Touch</h2>
          <p className="text-gray-600 mb-6">
            Stay in the loop with the latest product releases, exclusive discounts, and our special offers.
          </p>
          
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              SUBSCRIBE
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe anytime!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
