import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">CONTACT US!</h1>
      <p className="mb-4">
        Hey Guys,
      </p>
      <p className="mb-4">
        Please write to us for anything at all: <a href="mailto:info@lazuli.in" className="text-blue-500">info@lazuli.in</a>
      </p>
      <p className="mb-4">
        We promise to get in touch with you ASAP.
      </p>
      <p className="mb-4">
        You can also call us on 080-456-81713 between 10.00 am - 07.00 pm
      </p>
      <p className="mb-4">
        For PR and marketing-related inquiries only, please mail us at <a href="mailto:marketing@lazuli.in" className="text-blue-500">marketing@lazuli.in</a>
      </p>
      <p className="font-bold mb-2">Store Timings: Monday to Sunday (11:00 AM–10:00 PM)</p>
      <p className="font-bold mb-2">Store Address:</p>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Delhi</h2>
        <p>Pitampura,Delhi</p>
      </div>
    </div>
  );
};

export default ContactUs;