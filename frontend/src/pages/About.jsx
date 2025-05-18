import React, { useEffect } from 'react';
import { FaBrain, FaLock, FaRegLightbulb, FaRegSmile } from 'react-icons/fa';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false
    });
  }, []);

  const values = [
    {
      icon: <FaRegSmile className="text-3xl text-indigo-400" />,
      title: "User-Centered",
      description: "Everything we build is designed with your needs, comfort, and growth in mind."
    },
    {
      icon: <FaLock className="text-3xl text-indigo-400" />,
      title: "Privacy-First",
      description: "Your data is yours. We implement the highest standards of security and privacy."
    },
    {
      icon: <FaRegLightbulb className="text-3xl text-indigo-400" />,
      title: "Evidence-Based",
      description: "Our approach is grounded in psychological research and proven mental health practices."
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#0F172A]">
      <div className="container mx-auto max-w-screen-xl">
        {/* Hero Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="mb-6 inline-block">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 inline-block">
              <FaBrain className="text-5xl md:text-6xl text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Our Journey
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            We're building a future where mental health support is personalized, accessible, and empowering.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="fade-right">
            <div className="relative">
              <div className="absolute -top-6 -left-6 right-6 bottom-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-50 blur-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Team working together"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
          
          <div data-aos="fade-left">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">Our Story</span>
            <h2 className="text-3xl font-bold text-white mb-6">
              Transforming Mental Health with Technology
            </h2>
            <p className="text-indigo-200 mb-6">
              Mental Health Journey began with a simple idea: what if technology could make mental wellness more accessible, personal, and effective?
            </p>
            <p className="text-indigo-200 mb-6">
              Our team of psychologists, developers, and designers came together to create a platform that combines the latest in AI technology with evidence-based mental health practices.
            </p>
            <p className="text-indigo-200">
              Today, we're proud to offer tools that help thousands of people understand their emotions, track their progress, and take control of their mental well-being.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">Our Values</span>
            <h2 className="text-3xl font-bold text-white mb-4">
              What Guides Us
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              These core principles drive everything we do, from product design to customer support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div 
                key={value.title}
                className="bg-gradient-to-br from-gray-900/50 to-indigo-900/30 p-8 rounded-2xl border border-indigo-800/50 shadow-xl"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="p-4 rounded-full bg-indigo-900/50 inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-indigo-200">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
