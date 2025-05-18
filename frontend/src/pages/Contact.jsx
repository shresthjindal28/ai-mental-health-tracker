import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPaperPlane, FaCheck, FaSpinner } from 'react-icons/fa';
import AOS from 'aos';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false
    });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#0F172A]">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Have questions or feedback? We're here to help you on your mental health journey.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-stretch">
          <div className="md:w-1/2" data-aos="fade-right">
            <div className="h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl p-8 backdrop-blur-sm border border-indigo-800/50 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 mr-4">
                  <FaEnvelope className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              </div>
              
              <div className="space-y-8 mt-8">
                <div>
                  <h4 className="text-lg font-semibold text-indigo-300 mb-2">Our Mission</h4>
                  <p className="text-indigo-100">
                    To provide a safe, insightful, and motivating space for everyone to reflect, grow, and thrive on their mental health journey.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-indigo-300 mb-2">Email Us</h4>
                  <a href="mailto:support@mentalhealthjourney.com" className="text-indigo-100 hover:text-white transition-colors">
                    support@mentalhealthjourney.com
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-indigo-300 mb-2">Office Hours</h4>
                  <p className="text-indigo-100">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-indigo-800/30">
                <p className="text-indigo-200 italic">
                  "Mental health is not a destination, but a journey. It's about how you drive, not where you're going."
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2" data-aos="fade-left">
            <div className="bg-gradient-to-br from-gray-900/80 to-indigo-900/80 rounded-2xl p-8 backdrop-blur-sm border border-indigo-800/50 shadow-xl">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <FaCheck className="text-green-400 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                  <p className="text-indigo-200 max-w-md">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', message: '' });
                    }}
                    className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                  
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-indigo-200 mb-2 font-medium">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full p-3 rounded-xl bg-gray-900/50 text-white border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-indigo-200 mb-2 font-medium">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full p-3 rounded-xl bg-gray-900/50 text-white border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-indigo-200 mb-2 font-medium">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className="w-full p-3 rounded-xl bg-gray-900/50 text-white border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
