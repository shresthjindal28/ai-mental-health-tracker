import React, { useEffect } from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJs, FaCss3Alt, FaBolt, FaLock, FaRobot, FaServer, FaCode } from 'react-icons/fa';
import { SiExpress, SiTailwindcss, SiMongodb, SiVite, SiOpenai, SiAxios, SiReactrouter } from 'react-icons/si';
import AOS from 'aos';

const TechStack = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false
    });
  }, []);

  const techCategories = [
    {
      name: "Frontend",
      icon: <FaCode className="text-blue-400" size={28} />,
      technologies: [
        { name: 'React', desc: 'UI library', url: 'https://react.dev/', icon: <FaReact className="text-cyan-400" size={36} /> },
        { name: 'Vite', desc: 'Build tool', url: 'https://vitejs.dev/', icon: <SiVite className="text-yellow-400" size={36} /> },
        { name: 'Tailwind CSS', desc: 'CSS framework', url: 'https://tailwindcss.com/', icon: <SiTailwindcss className="text-sky-400" size={36} /> },
        { name: 'React Router', desc: 'Routing', url: 'https://reactrouter.com/', icon: <SiReactrouter className="text-pink-500" size={36} /> }
      ]
    },
    {
      name: "Backend",
      icon: <FaServer className="text-green-400" size={28} />,
      technologies: [
        { name: 'Node.js', desc: 'Runtime', url: 'https://nodejs.org/', icon: <FaNodeJs className="text-green-500" size={36} /> },
        { name: 'Express', desc: 'Web framework', url: 'https://expressjs.com/', icon: <SiExpress className="text-gray-200" size={36} /> },
        { name: 'MongoDB', desc: 'Database', url: 'https://www.mongodb.com/', icon: <SiMongodb className="text-green-400" size={36} /> },
        { name: 'JWT', desc: 'Authentication', url: 'https://jwt.io/', icon: <FaLock className="text-yellow-500" size={36} /> }
      ]
    },
    {
      name: "AI & Integration",
      icon: <FaRobot className="text-purple-400" size={28} />,
      technologies: [
        { name: 'OpenAI API', desc: 'AI services', url: 'https://platform.openai.com/', icon: <SiOpenai className="text-green-300" size={36} /> },
        { name: 'Axios', desc: 'HTTP client', url: 'https://axios-http.com/', icon: <SiAxios className="text-blue-400" size={36} /> }
      ]
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#0F172A]">
      <div className="container mx-auto max-w-screen-xl">
        {/* Hero Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">Our Tech Stack</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powered by Modern Technology
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            We leverage cutting-edge open-source technologies to create a seamless, secure, and responsive experience.
          </p>
        </div>

        {/* Intro Section */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-lg h-64 flex flex-wrap justify-center items-center gap-8 px-8">
                  {/* Fixed icon styling with explicit classes instead of template strings */}
                  <FaReact className="text-indigo-300 text-opacity-80 transform hover:scale-110 transition-transform duration-300" size={60} />
                  <SiTailwindcss className="text-purple-300 text-opacity-80 transform hover:scale-110 transition-transform duration-300" size={48} />
                  <FaNodeJs className="text-indigo-300 text-opacity-80 transform hover:scale-110 transition-transform duration-300" size={60} />
                  <SiMongodb className="text-purple-300 text-opacity-80 transform hover:scale-110 transition-transform duration-300" size={48} />
                  <SiOpenai className="text-indigo-300 text-opacity-80 transform hover:scale-110 transition-transform duration-300" size={60} />
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                alt="Code on computer screen"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          </div>
          
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Our Tech Choices Matter
            </h2>
            <p className="text-indigo-200 mb-6">
              We've carefully selected technologies that balance performance, developer experience, and user satisfaction. Our stack enables us to:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-indigo-900/50 rounded-full mt-1">
                  <FaBolt className="text-indigo-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Lightning Fast Experience</span>
                  <p className="text-indigo-200">Our modern frontend and backend ensure quick load times and responsive interactions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-indigo-900/50 rounded-full mt-1">
                  <FaLock className="text-indigo-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Secure Data Handling</span>
                  <p className="text-indigo-200">Your sensitive mental health data is protected by industry-standard security practices.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-indigo-900/50 rounded-full mt-1">
                  <FaRobot className="text-indigo-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">AI-Powered Insights</span>
                  <p className="text-indigo-200">State-of-the-art AI models analyze your journal entries and provide personalized insights.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Categories */}
        {techCategories.map((category, catIdx) => (
          <div key={category.name} className="mb-20" data-aos="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-900/50 rounded-full">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-white">{category.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.technologies.map((tech, techIdx) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-gray-900/70 to-indigo-900/50 backdrop-blur-sm p-6 rounded-2xl border border-indigo-800/50 shadow-lg hover:shadow-indigo-900/20 transition-all duration-300 hover:scale-105 hover:border-indigo-600/70 group"
                  data-aos="fade-up"
                  data-aos-delay={techIdx * 50}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-xl bg-indigo-900/30 mb-4 group-hover:bg-indigo-800/40 transition-colors duration-300">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{tech.name}</h3>
                    <p className="text-indigo-300 text-sm mb-3">{tech.desc}</p>
                    <span className="text-xs text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      Learn more →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Development Philosophy */}
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-indigo-800/50 shadow-xl text-center" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Our Development Philosophy
          </h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
            We believe great software comes from a balance of cutting-edge technology, thoughtful design, and continuous improvement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-indigo-900/50 rounded-full text-indigo-300 text-sm font-medium">
              Open Source First
            </span>
            <span className="px-4 py-2 bg-indigo-900/50 rounded-full text-indigo-300 text-sm font-medium">
              Accessibility
            </span>
            <span className="px-4 py-2 bg-indigo-900/50 rounded-full text-indigo-300 text-sm font-medium">
              Responsive Design
            </span>
            <span className="px-4 py-2 bg-indigo-900/50 rounded-full text-indigo-300 text-sm font-medium">
              Performance
            </span>
            <span className="px-4 py-2 bg-indigo-900/50 rounded-full text-indigo-300 text-sm font-medium">
              Security
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
