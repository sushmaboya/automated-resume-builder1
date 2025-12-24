import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, CheckCircle, ArrowRight, Zap, Award } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">

            {/* Navigation */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
                <div className="text-2xl font-extrabold flex items-center gap-2 text-blue-700">
                    <FileText size={32} />
                    <span>ResumeAI</span>
                </div>
                <Link to="/build">
                    <button className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Launch Builder
                    </button>
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="flex-grow flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-4 border border-blue-100 shadow-sm">
                        🚀 The Ultimate Resume Builder for 2025
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dream Career</span> <br /> One Resume at a Time.
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Create professional, ATS-friendly resumes in minutes. Our automated tool ensures you stand out to recruiters with premium templates and instant PDF downloads.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                        <Link to="/build">
                            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-3">
                                Get Started Now <ArrowRight size={20} />
                            </button>
                        </Link>
                        <a href="#features" className="px-8 py-4 rounded-xl bg-white text-gray-700 font-bold text-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition">
                            Learn More
                        </a>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                        <p className="text-gray-500">Everything you need to land your next job.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { icon: <Zap className="text-yellow-500" size={40} />, title: "Instant Generation", desc: "Fill in your details and watch your resume come to life instantly with our live preview." },
                            { icon: <CheckCircle className="text-green-500" size={40} />, title: "ATS Friendly", desc: "Our templates are designed to pass through Applicant Tracking Systems with ease." },
                            { icon: <Download className="text-blue-500" size={40} />, title: "One-Click PDF", desc: "Download your polished resume as a high-quality PDF ready for application." },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition duration-300">
                                <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <div className="text-2xl font-bold text-white flex items-center gap-2 justify-center md:justify-start mb-2">
                            <FileText /> ResumeAI
                        </div>
                        <p className="text-sm opacity-60">© 2025 Automated Resume Builder. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
