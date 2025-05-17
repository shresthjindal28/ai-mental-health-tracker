import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBook, FaChartLine, FaRobot, FaSmile, FaBrain, FaArrowRight } from 'react-icons/fa';

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

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans">
			{/* Hero Section */}
			<section className="relative py-24 px-6 flex flex-col items-center justify-center overflow-hidden">
				<div className="absolute inset-0 pointer-events-none z-0">
					<div className="w-96 h-96 bg-indigo-700 opacity-30 rounded-full blur-3xl absolute -top-32 -left-32 animate-pulse" />
					<div className="w-96 h-96 bg-purple-700 opacity-20 rounded-full blur-3xl absolute -bottom-32 -right-32 animate-pulse" />
				</div>
				<div className="relative z-1 max-w-3xl text-center">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
						Nurture Your Mind, Track Your Journey
					</h1>
					<p className="text-xl md:text-2xl mb-10 text-gray-300">
						An AI-powered platform to journal your thoughts, track your moods, and gain insights into your mental well-being.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						{isAuthenticated ? (
							<Link
								to="/dashboard"
								className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
							>
								Go to Dashboard <FaArrowRight className="ml-2" />
							</Link>
						) : (
							<>
								<Link
									to="/login"
									className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
								>
									Login
								</Link>
								<Link
									to="/register"
									className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
								>
									Get Started for Free
								</Link>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-6 relative z-1">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white tracking-tight">
						How We Support Your Mental Health
					</h2>
					<div className="grid md:grid-cols-3 gap-10">
						{features.map((f, idx) => (
							<div
								key={f.title}
								className={`bg-gradient-to-br ${f.color} p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-200`}
								style={{ zIndex: 1 }}
							>
								<div className="bg-black bg-opacity-20 p-4 rounded-full mb-5 text-white shadow-lg">
									{f.icon}
								</div>
								<h3 className="text-xl font-semibold mb-2">{f.title}</h3>
								<p className="text-gray-200">{f.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900 relative z-1">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white tracking-tight">
						Take Control of Your Well-being
					</h2>
					<div className="grid md:grid-cols-2 gap-12">
						{benefits.map((b) => (
							<div
								key={b.title}
								className={`bg-gradient-to-br ${b.color} p-10 rounded-2xl shadow-xl flex items-start gap-6 hover:scale-105 transition-transform duration-200`}
								style={{ zIndex: 1 }}
							>
								<div className="bg-black bg-opacity-30 p-4 rounded-lg text-white shadow-lg">
									{b.icon}
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">{b.title}</h3>
									<p className="text-gray-100">{b.desc}</p>
								</div>
							</div>
						))}
					</div>
					<div className="text-center mt-14">
						{!isAuthenticated && (
							<Link
								to="/register"
								className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-10 py-4 rounded-lg font-semibold shadow-lg inline-flex items-center transition-all duration-200"
							>
								Start Your Journey <FaArrowRight className="ml-2" />
							</Link>
						)}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20 px-6 relative z-1">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white tracking-tight">
						What Our Users Say
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((t, idx) => (
							<div
								key={idx}
								className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-lg text-gray-200 hover:scale-105 transition-transform duration-200"
								style={{ zIndex: 1 }}
							>
								<p className="mb-5 italic text-lg">"{t.quote.replace(/"/g, '')}"</p>
								<p className="font-semibold text-indigo-300">{t.author}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;