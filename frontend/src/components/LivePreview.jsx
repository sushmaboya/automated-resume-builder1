import React from 'react';

// Design matching the "Sai Vipul" resume image
// Font: Serif, Blue Headers, Dense layout
const LivePreview = ({ data }) => {
    if (!data) return <div className="text-gray-400 text-center mt-10">No data available</div>;

    const renderBullets = (text) => {
        if (!text) return null;
        const items = text.split('\n').filter(item => item.trim() !== '');
        return (
            <ul className="list-disc ml-5 mt-1 space-y-0.5">
                {items.map((item, idx) => (
                    <li key={idx} className="text-gray-800 text-[11px] leading-tight text-justify">{item}</li>
                ))}
            </ul>
        );
    };

    return (
        <div id="resume-preview" className="bg-white mx-auto shadow-2xl border border-gray-100 w-[210mm] min-h-[297mm] p-8 font-serif">

            {/* HEADER */}
            <div className="mb-4">
                <h1 className="text-4xl font-bold text-blue-900 mb-2 border-l-4 border-black pl-2 leading-none">
                    {data.fullName || 'YOUR NAME'}
                </h1>
                <div className="flex justify-between text-xs text-blue-800">
                    <div className="space-y-0.5">
                        {data.linkedin && <div><span className="text-black font-semibold">LinkedIn:</span> <a href={data.linkedin} className="underline decoration-blue-800">{data.linkedin}</a></div>}
                        {data.github && <div><span className="text-black font-semibold">GitHub:</span> <a href={data.github} className="underline decoration-blue-800">{data.github}</a></div>}
                    </div>
                    <div className="text-right space-y-0.5">
                        {data.email && <div><span className="text-black font-semibold">Email:</span> <a href={`mailto:${data.email}`} className="underline decoration-blue-800">{data.email}</a></div>}
                        {data.phone && <div><span className="text-black font-semibold">Mobile:</span> {data.phone}</div>}
                    </div>
                </div>
            </div>

            {/* SKILLS */}
            {data.skills && data.skills.length > 0 && (
                <div>
                    <h2 className="text-[13px] font-bold text-blue-900 uppercase tracking-widest border-b border-black mb-1.5 pb-0.5">
                        Skills
                    </h2>
                    <div className="space-y-1 text-xs">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex">
                                <span className="font-bold w-32 text-blue-900 shrink-0">{skill.category}:</span>
                                <span className="text-gray-800">{skill.items}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* INTERNSHIP / EXPERIENCE */}
            {data.experience && data.experience.length > 0 && (
                <div>
                    <h2 className="text-[13px] font-bold text-blue-900 uppercase tracking-widest border-b border-black mb-2 mt-3 pb-0.5">
                        Internship
                    </h2>
                    <div className="space-y-3">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[13px] font-bold text-blue-900">{exp.company}</h3>
                                    <span className="text-xs font-semibold text-black">{exp.period}</span>
                                </div>
                                <div className="text-[12px] font-bold text-blue-800 italic mb-0.5">{exp.role}</div>
                                {renderBullets(exp.description)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PROJECTS */}
            {data.projects && data.projects.length > 0 && (
                <div>
                    <h2 className="text-[13px] font-bold text-blue-900 uppercase tracking-widest border-b border-black mb-2 mt-3 pb-0.5">
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {data.projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <div className="text-[13px] font-bold text-blue-900">
                                        {proj.title} <span className="text-black font-normal"></span>
                                    </div>
                                    <span className="text-xs font-semibold text-black">{proj.link}</span>
                                </div>
                                {renderBullets(proj.description)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ACHIEVEMENTS */}
            {data.achievements && data.achievements.length > 0 && (
                <div>
                    <h2 className="text-[13px] font-bold text-blue-900 uppercase tracking-widest border-b border-black mb-2 mt-3 pb-0.5">
                        Achievement
                    </h2>
                    <ul className="list-disc ml-5 space-y-1">
                        {data.achievements.map((ach, index) => (
                            <li key={index} className="text-[11px] text-gray-800 leading-tight">
                                {ach}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* EDUCATION */}
            {data.education && data.education.length > 0 && (
                <div>
                    <h2 className="text-[13px] font-bold text-blue-900 uppercase tracking-widest border-b border-black mb-2 mt-3 pb-0.5">
                        Education
                    </h2>
                    <div className="space-y-1.5">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-end border-b border-dotted border-gray-300 pb-1 last:border-0">
                                <div>
                                    <div className="text-[12px] font-bold text-blue-900">{edu.institution}</div>
                                    <div className="text-xs text-black">{edu.degree}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[11px] text-black">{edu.year}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default LivePreview;
