import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-100 rounded-lg mb-10">
      <div className="mb-4 md:mb-0 md:w-1/2 pr-5">
        <h2 className="text-2xl font-bold">Let's Stay In Touch</h2>
        <p className="text-gray-600">
        Subscribe to receive the latest product releases, exclusive discounts, and our special offers.
        </p>
      </div>
      <div className="flex flex-col w-full md:flex-row items-center md:w-1/2">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-md w-full md:w-auto md:flex-grow mb-2 md:mb-0 md:mr-2"
        />
        <button className="p-2 bg-black text-white rounded-md w-full md:w-auto">
          SUBSCRIBE
        </button>
      </div>
    </div>
  )
}

export default Newsletter