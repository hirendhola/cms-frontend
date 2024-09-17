import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">1. Our Mission</h2>
        <p>
          College Management System designed to streamline academic and administrative processes for educational institutions. Our mission is to provide a seamless platform for students, teachers, and administrators to manage academic records, schedules, and communications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">2. What We Offer</h2>
        <p>
          Our platform offers a variety of features, including:
        </p>
        <ul className="list-disc pl-6">
          <li>Student management: Manage student data, attendance, grades, and more.</li>
          <li>Teacher and staff management: Keep track of faculty profiles, schedules, and assignments.</li>
          <li>Course management: Create and update courses, subjects, and student enrollment.</li>
          <li>Reports: Generate academic reports and analytics for performance tracking.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">3. Our Technology</h2>
        <p>
          Built using modern technologies like the MERN stack (MongoDB, Express.js, React, and Node.js), our system ensures speed, reliability, and scalability to handle large amounts of data efficiently.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">4. Meet the Team</h2>
        <p>
          We are a group of dedicated developers passionate about making education management easier for everyone.
        </p>
        <ul className="list-disc pl-6">
          <li>Hiren Dhola</li>
          <li>Vrund Kukadiya</li>
          <li>Samarath Mistry</li>
          <li>Dev Shroff</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">5. Contact Us</h2>
        <p>
          For any inquiries or support, feel free to reach out to us at <a>hirendhola@example.com</a>. We're here to help!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
