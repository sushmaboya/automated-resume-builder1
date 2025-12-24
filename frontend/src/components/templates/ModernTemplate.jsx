import React from 'react';

const ModernTemplate = ({ data }) => {
    const renderBullets = (text) => {
        if (!text) return null;
        const items = text.split('\n').filter(item => item.trim() !== '');
        return (
            <ul className="list-disc ml-5 mt-1 space-y-1 text-gray-600">
                {items.map((item, idx) => (
                    <li key={idx} className="text-xs leading-relaxed">{item}</li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex w-full h-full font-sans bg-white text-gray-800">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-slate-900 text-white p-6 flex flex-col gap-6">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-2 text-blue-400">
                        {data.fullName || 'Your Name'}
                    </h1>
                    <p className="text-sm opacity-80 leading-relaxed italic">
                        {data.bio || 'Professional Summary goes here...'}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-xs opacity-90">
                    <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Contact</h3>
                    {data.email && <div className="break-words">📧 {data.email}</div>}
                    {data.phone && <div>📱 {data.phone}</div>}
                    {data.linkedin && <div className="break-words">🔗 {data.linkedin.replace(/^https?:\/\//, '')}</div>}
                    {data.github && <div className="break-words">💻 {data.github.replace(/^https?:\/\//, '')}</div>}
                </div>

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider border-b border-slate-700 pb-1 mb-3">Skills</h3>
                        <div className="space-y-3">
                            {data.skills.map((skill, index) => (
                                <div key={index}>
                                    <div className="text-xs font-bold text-blue-200 mb-1">{skill.category}</div>
                                    <div className="flex flex-wrap gap-1">
                                        {skill.items.split(',').map((item, i) => (
                                            <span key={i} className="bg-slate-800 px-2 py-0.5 rounded text-[10px] border border-slate-700">
                                                {item.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider border-b border-slate-700 pb-1 mb-3">Education</h3>
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="text-xs font-bold">{edu.institution}</div>
                                    <div className="text-[10px] opacity-80">{edu.degree}</div>
                                    <div className="text-[10px] text-blue-200">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Content */}
            <div className="w-2/3 p-8 bg-white">
                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-blue-500 pb-1 mb-4 inline-block">
                            Experience
                        </h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-md font-bold text-slate-900">{exp.role}</h3>
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{exp.period}</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600 mb-2">{exp.company}</div>
                                    {renderBullets(exp.description)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-blue-500 pb-1 mb-4 inline-block">
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                                        <a href={proj.link} className="text-[10px] text-blue-500 hover:scale-105 transition-transform" target="_blank" rel="noopener noreferrer">View Project ↗</a>
                                    </div>
                                    {renderBullets(proj.description)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements */}
                {data.achievements && data.achievements.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-blue-500 pb-1 mb-3 inline-block">
                            Achievements
                        </h2>
                        <ul className="list-disc ml-5 space-y-1 text-gray-600">
                            {data.achievements.map((ach, index) => (
                                <li key={index} className="text-xs">{ach}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;
