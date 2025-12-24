import React from 'react';

const TechTemplate = ({ data }) => {
    const renderBullets = (text) => {
        if (!text) return null;
        const items = text.split('\n').filter(item => item.trim() !== '');
        return (
            <ul className="list-none ml-0 mt-2 space-y-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-xs font-mono text-gray-300">
                        <span className="text-green-400 select-none">{'>'}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="w-full h-full bg-[#1e1e1e] text-gray-200 font-mono p-8 selection:bg-green-900 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl select-none pointer-events-none text-white">
                {'{src}'}
            </div>

            {/* Header */}
            <div className="border-b border-gray-700 pb-6 mb-6">
                <h1 className="text-4xl font-bold text-green-400 mb-2">
                    <span className="text-white">const</span> {data.fullName ? data.fullName.replace(/\s/g, '_') : 'dev_name'} <span className="text-white">=</span>
                </h1>
                <div className="flex flex-wrap gap-4 text-xs text-blue-300">
                    {data.email && <div><span className="text-gray-500">email:</span> "{data.email}"</div>}
                    {data.phone && <div><span className="text-gray-500">phone:</span> "{data.phone}"</div>}
                    {data.linkedin && <div><span className="text-gray-500">linkedin:</span> "{data.linkedin}"</div>}
                    {data.github && <div><span className="text-gray-500">github:</span> "{data.github}"</div>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="col-span-8 space-y-8">

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <div>
                            <h2 className="text-green-400 text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="text-gray-600">01.</span> Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-4 border-l border-gray-700 hover:border-green-500 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-white font-bold">{exp.role}</h3>
                                                <div className="text-green-500 text-sm">@ {exp.company}</div>
                                            </div>
                                            <div className="text-xs text-gray-500 font-mono bg-gray-900 px-2 py-1 rounded">
                                                {exp.period}
                                            </div>
                                        </div>
                                        {renderBullets(exp.description)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <div>
                            <h2 className="text-green-400 text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="text-gray-600">02.</span> Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {data.projects.map((proj, index) => (
                                    <div key={index} className="bg-[#252526] p-4 rounded border border-gray-700 hover:border-blue-500 transition-all group">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-blue-300 font-bold group-hover:text-blue-200">{proj.title}</h3>
                                            <span className="text-[10px] text-gray-500">{proj.link}</span>
                                        </div>
                                        {renderBullets(proj.description)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-8">

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <div>
                            <h2 className="text-green-400 text-sm font-bold mb-3">
                                // Skills
                            </h2>
                            <div className="space-y-3">
                                {data.skills.map((skill, index) => (
                                    <div key={index}>
                                        <div className="text-xs text-gray-400 mb-1">_{skill.category}</div>
                                        <div className="flex flex-wrap gap-1">
                                            {skill.items.split(',').map((item, i) => (
                                                <span key={i} className="text-[10px] text-blue-200 bg-[#0e3b56] px-1.5 py-0.5 rounded">
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
                            <h2 className="text-green-400 text-sm font-bold mb-3">
                                // Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="text-xs">
                                        <div className="text-white font-bold">{edu.institution}</div>
                                        <div className="text-gray-400">{edu.degree}</div>
                                        <div className="text-gray-600 mt-1">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements */}
                    {data.achievements && data.achievements.length > 0 && (
                        <div>
                            <h2 className="text-green-400 text-sm font-bold mb-3">
                                // Achievements
                            </h2>
                            <ul className="space-y-2">
                                {data.achievements.map((ach, index) => (
                                    <li key={index} className="text-[10px] text-gray-400 border-l-2 border-green-900 pl-2">
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechTemplate;
