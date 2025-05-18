import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaBook, FaChartLine, FaRobot, FaSmile, FaBrain, FaArrowRight, FaChevronDown, FaQuoteLeft } from 'react-icons/fa';
import About from './About';
import Contact from './Contact';
import TechStack from './TechStack';
import { Link as ScrollLink, Element } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
	{
		icon: <FaBook size={32} />,
		title: 'Journaling',
		desc: 'Record your thoughts, feelings, and experiences in a safe, private space.',
		color: 'from-blue-500 to-indigo-500'
	},
	{
		icon: <FaSmile size={32} />,
		title: 'Mood Tracking',
		desc: 'Monitor your emotions over time and identify patterns in your mental well-being.',
		color: 'from-pink-500 to-purple-500'
	},
	{
		icon: <FaBrain size={32} />,
		title: 'AI Insights',
		desc: 'Receive personalized insights and analysis to better understand your mental health.',
		color: 'from-green-500 to-teal-500'
	}
];

const benefits = [
	{
		icon: <FaChartLine size={28} />,
		title: 'Track Your Progress',
		desc: 'Set personal goals, track your improvement over time, and celebrate your achievements.',
		color: 'from-green-400 to-blue-400'
	},
	{
		icon: <FaRobot size={28} />,
		title: 'AI Chat Support',
		desc: 'Get support and guidance from our AI assistant whenever you need someone to talk to.',
		color: 'from-purple-400 to-indigo-400'
	}
];

const testimonials = [
	{
		quote: '"This app has been a game-changer for my mental health. Being able to track my moods and see patterns has helped me take control."',
		author: '- Sarah M.'
	},
	{
		quote: '"The AI insights provided a perspective I hadn\'t considered. It\'s like having a therapist in my pocket between actual sessions."',
		author: '- David K.'
	},
	{
		quote: '"I\'ve tried many journaling apps, but this one actually helps me understand my thoughts rather than just recording them."',
		author: '- Jennifer L.'
	}
];

const Home = () => {
	const { isAuthenticated } = useContext(AuthContext);

	// Initialize AOS animation library
	useEffect(() => {
		AOS.init({
			duration: 800,
			once: false,
			mirror: true
		});
	}, []);

	return (
		<div className="bg-[#0F172A] text-gray-100 font-sans overflow-x-hidden">
			{/* Hero Section - Full screen with animated gradient */}
			<Element name="home" id="home">
				<section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
					{/* Animated background - constrained to stay within bounds */}
					<div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E1B4B] z-0"></div>
					<div className="absolute inset-0 z-0 overflow-hidden">
						{/* Animated circles - adjusted for better positioning */}
						<div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
						<div className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
						<div className="absolute bottom-1/4 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
					</div>

					<div className="container mx-auto px-4 py-16 z-10 relative max-w-screen-xl">
						<div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
							<div className="mb-6 inline-block">
								<div className="p-3 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 inline-block">
									<FaBrain className="text-5xl md:text-6xl text-indigo-400" />
								</div>
							</div>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight px-2">
								Your Mental Health Journey Starts Here
							</h1>
							<p className="text-xl mb-10 text-indigo-200 max-w-3xl mx-auto leading-relaxed px-2">
								Track your moods, journal your thoughts, and gain AI-powered insights to improve your mental well-being.
							</p>
							<div className="flex flex-col sm:flex-row gap-6 justify-center px-2">
								{!isAuthenticated ? (
									<>
										<ScrollLink
											to="about"
											smooth={true}
											duration={800}
											offset={-64}
											className="btn-primary bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center transition-all duration-300 text-lg group"
										>
											Discover More
											<FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
										</ScrollLink>
										<ScrollLink
											to="contact"
											smooth={true}
											duration={800}
											offset={-64}
											className="btn-secondary border-2 border-indigo-500 text-indigo-300 hover:bg-indigo-500/10 px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 text-lg"
										>
											Contact Us
										</ScrollLink>
									</>
								) : (
									<ScrollLink
										to="features"
										smooth={true}
										duration={800}
										offset={-64}
										className="btn-primary bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center transition-all duration-300 text-lg"
									>
										Explore Features
									</ScrollLink>
								)}
							</div>
						</div>

						{/* Scroll down indicator - adjusted positioning */}
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
							<ScrollLink
								to="features"
								smooth={true}
								duration={800}
								offset={-64}
								className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer inline-block"
							>
								<p className="text-sm font-medium mb-2">Scroll to explore</p>
								<FaChevronDown className="mx-auto text-2xl animate-bounce" />
							</ScrollLink>
						</div>
					</div>
				</section>
			</Element>

			{/* Features Section - Fixed padding and container */}
			<Element name="features" id="features">
				<section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 relative">
					<div className="container mx-auto max-w-screen-xl">
						<div className="text-center mb-16" data-aos="fade-up">
							<span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">Core Features</span>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-4xl mx-auto leading-tight px-2">
								Comprehensive Tools for Your Mental Wellness
							</h2>
							<p className="text-lg text-indigo-200 max-w-2xl mx-auto px-2">
								Our platform provides everything you need to understand and improve your mental health.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
							{features.map((feature, idx) => (
								<div
									key={feature.title}
									className="relative rounded-2xl overflow-hidden group" 
									data-aos="fade-up" 
									data-aos-delay={idx * 100}
								>
									<div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
									<div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:opacity-0 transition-opacity duration-300"></div>
									<div className="relative z-10 p-8 h-full flex flex-col">
										<div className="p-4 rounded-2xl bg-gradient-to-br from-gray-700/50 to-gray-900/50 backdrop-blur-sm mb-6 inline-block">
											{feature.icon}
										</div>
										<h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
										<p className="text-indigo-200 mb-6 flex-grow">{feature.desc}</p>
										<div className="mt-auto">
											<ScrollLink
												to="contact"
												smooth={true}
												duration={800}
												className="inline-flex items-center text-indigo-300 hover:text-indigo-100 group-hover:text-white font-medium cursor-pointer"
											>
												Learn more <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
											</ScrollLink>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</Element>

			{/* Benefits Section - Fixed padding and container */}
			<section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#111827]">
				<div className="container mx-auto max-w-screen-xl">
					<div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
						{/* Left side - Image - adjusted for responsiveness */}
						<div className="lg:w-1/2" data-aos="fade-right">
							<div className="relative px-2">
								<div className="absolute -top-6 -left-6 right-6 bottom-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-50 blur-lg"></div>
								<img
									src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80"
									alt="Person journaling"
									className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
								/>
							</div>
						</div>

						{/* Right side - Content - added padding */}
						<div className="lg:w-1/2 px-2" data-aos="fade-left">
							<span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">Key Benefits</span>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
								Transform Your Mental Health Journey
							</h2>
							<p className="text-lg text-indigo-200 mb-8">
								Our platform goes beyond simple tracking to provide you with deep insights and actionable advice.
							</p>

							<div className="space-y-6">
								{benefits.map((benefit, idx) => (
									<div key={benefit.title} className="flex items-start gap-4" data-aos="fade-up" data-aos-delay={idx * 100}>
										<div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${benefit.color}`}>
											{benefit.icon}
										</div>
										<div>
											<h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
											<p className="text-indigo-200">{benefit.desc}</p>
										</div>
									</div>
								))}
							</div>

							<div className="mt-10">
								<ScrollLink
									to="contact"
									smooth={true}
									duration={800}
									offset={-64}
									className="btn-primary inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
								>
									Get Started Today <FaArrowRight className="ml-2" />
								</ScrollLink>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section - Fixed padding and container */}
			<section className="py-16 md:py-20 px-4 sm:px-6 md:px-8">
				<div className="container mx-auto max-w-screen-xl">
					<div className="text-center mb-16" data-aos="fade-up">
						<span className="inline-block py-1 px-3 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4">Testimonials</span>
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
							What Our Users Say
						</h2>
						<p className="text-lg text-indigo-200 max-w-2xl mx-auto">
							Read how our platform has helped people transform their mental health journey.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						{testimonials.map((testimonial, idx) => (
							<div 
								key={idx} 
								className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300 flex flex-col h-full"
								data-aos="fade-up"
								data-aos-delay={idx * 100}
							>
								<FaQuoteLeft className="text-4xl text-indigo-400 mb-6 opacity-50" />
								<p className="text-base md:text-lg text-indigo-100 mb-6 flex-grow italic">
									{testimonial.quote.replace(/"/g, '')}
								</p>
								<p className="text-indigo-300 font-semibold text-right">{testimonial.author}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section - Fixed padding and container */}
			<section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-indigo-900 to-purple-900" data-aos="fade-up">
				<div className="container mx-auto max-w-screen-xl">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
							Ready to Transform Your Mental Health Journey?
						</h2>
						<p className="text-lg md:text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
							Join thousands of users who have improved their mental well-being with our platform.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<ScrollLink
								to="contact"
								smooth={true}
								duration={800}
								offset={-64}
								className="btn-primary bg-white hover:bg-gray-100 text-indigo-900 px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center transition-all duration-300 text-lg"
							>
								Get Started Today
							</ScrollLink>
							<ScrollLink
								to="features"
								smooth={true}
								duration={800}
								offset={-64}
								className="btn-secondary border-2 border-white text-indigo-900 hover:bg-white/10 px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 text-lg"
							>
								Learn More
							</ScrollLink>
						</div>
					</div>
				</div>
			</section>

			{/* About Section - Add a wrapper with proper padding */}
			<Element name="about" id="about" className="overflow-x-hidden">
				<div className="px-4 sm:px-6 md:px-8">
					<About />
				</div>
			</Element>

			{/* Tech Stack Section - Add a wrapper with proper padding */}
			<Element name="tech-stack" id="tech-stack" className="overflow-x-hidden">
				<div className="px-4 sm:px-6 md:px-8">
					<TechStack />
				</div>
			</Element>

			{/* Contact Section - Add a wrapper with proper padding */}
			<Element name="contact" id="contact" className="overflow-x-hidden">
				<div className="px-4 sm:px-6 md:px-8">
					<Contact />
				</div>
			</Element>

			
			
		</div>
	);
};

export default Home;