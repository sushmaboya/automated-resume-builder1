import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ data, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({ ...data, [field]: value });
    };

    const handleArrayChange = (field, index, subfield, value) => {
        const newArray = [...(data[field] || [])];
        newArray[index] = { ...newArray[index], [subfield]: value };
        onUpdate({ ...data, [field]: newArray });
    };

    const handleSimpleArrayChange = (field, index, value) => {
        const newArray = [...(data[field] || [])];
        newArray[index] = value;
        onUpdate({ ...data, [field]: newArray });
    };

    const addItem = (field, emptyItem) => {
        onUpdate({ ...data, [field]: [...(data[field] || []), emptyItem] });
    };

    const removeItem = (field, index) => {
        const newArray = (data[field] || []).filter((_, i) => i !== index);
        onUpdate({ ...data, [field]: newArray });
    };

    return (
        <div className="space-y-8 font-sans">
            {/* Personal Info */}
            <section className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Personal Information</h3>
                <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className="input-field" value={data.fullName || ''} onChange={e => handleChange('fullName', e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="email" placeholder="Email" className="input-field" value={data.email || ''} onChange={e => handleChange('email', e.target.value)} />
                        <input type="text" placeholder="Phone" className="input-field" value={data.phone || ''} onChange={e => handleChange('phone', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="LinkedIn URL" className="input-field" value={data.linkedin || ''} onChange={e => handleChange('linkedin', e.target.value)} />
                        <input type="text" placeholder="GitHub URL" className="input-field" value={data.github || ''} onChange={e => handleChange('github', e.target.value)} />
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-700">Skills</h3>
                    <button onClick={() => addItem('skills', { category: '', items: '' })} className="btn-add"><Plus size={18} /></button>
                </div>
                {(data.skills || []).map((skill, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                        <input className="input-field w-1/3" placeholder="Category (e.g. Languages)" value={skill.category} onChange={e => handleArrayChange('skills', index, 'category', e.target.value)} />
                        <input className="input-field w-2/3" placeholder="Items (e.g. Python, Java)" value={skill.items} onChange={e => handleArrayChange('skills', index, 'items', e.target.value)} />
                        <button onClick={() => removeItem('skills', index)} className="btn-remove"><Trash2 size={16} /></button>
                    </div>
                ))}
            </section>

            {/* Experience / Internship */}
            <section className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-700">Internships / Experience</h3>
                    <button onClick={() => addItem('experience', { role: '', company: '', period: '', description: '' })} className="btn-add"><Plus size={18} /></button>
                </div>
                {(data.experience || []).map((exp, index) => (
                    <div key={index} className="mb-4 p-3 bg-white border rounded relative">
                        <button onClick={() => removeItem('experience', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <input className="input-field" placeholder="Role / Title" value={exp.role} onChange={e => handleArrayChange('experience', index, 'role', e.target.value)} />
                            <input className="input-field" placeholder="Company / Organization" value={exp.company} onChange={e => handleArrayChange('experience', index, 'company', e.target.value)} />
                        </div>
                        <input className="input-field mb-2" placeholder="Period (e.g. Jun 2025 - Jul 2025)" value={exp.period} onChange={e => handleArrayChange('experience', index, 'period', e.target.value)} />
                        <textarea className="input-field" rows="3" placeholder="Description (Bullet points)" value={exp.description} onChange={e => handleArrayChange('experience', index, 'description', e.target.value)} />
                    </div>
                ))}
            </section>

            {/* Projects */}
            <section className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-700">Projects</h3>
                    <button onClick={() => addItem('projects', { title: '', description: '', link: '' })} className="btn-add"><Plus size={18} /></button>
                </div>
                {(data.projects || []).map((proj, index) => (
                    <div key={index} className="mb-4 p-3 bg-white border rounded relative">
                        <button onClick={() => removeItem('projects', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <input className="input-field" placeholder="Project Title | Tech Stack" value={proj.title} onChange={e => handleArrayChange('projects', index, 'title', e.target.value)} />
                            <input className="input-field" placeholder="Header Date / Link" value={proj.link} onChange={e => handleArrayChange('projects', index, 'link', e.target.value)} />
                        </div>
                        <textarea className="input-field" rows="3" placeholder="Description (Bullet points)" value={proj.description} onChange={e => handleArrayChange('projects', index, 'description', e.target.value)} />
                    </div>
                ))}
            </section>

            {/* Education */}
            <section className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-700">Education</h3>
                    <button onClick={() => addItem('education', { degree: '', institution: '', year: '' })} className="btn-add"><Plus size={18} /></button>
                </div>
                {(data.education || []).map((edu, index) => (
                    <div key={index} className="mb-4 p-3 bg-white border rounded relative">
                        <button onClick={() => removeItem('education', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                        <input className="input-field mb-2" placeholder="Institution / Scool" value={edu.institution} onChange={e => handleArrayChange('education', index, 'institution', e.target.value)} />
                        <input className="input-field mb-2" placeholder="Degree / Class" value={edu.degree} onChange={e => handleArrayChange('education', index, 'degree', e.target.value)} />
                        <input className="input-field" placeholder="Year / Location" value={edu.year} onChange={e => handleArrayChange('education', index, 'year', e.target.value)} />
                    </div>
                ))}
            </section>

            {/* Achievements */}
            <section className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-700">Achievements</h3>
                    <button onClick={() => addItem('achievements', '')} className="btn-add"><Plus size={18} /></button>
                </div>
                {(data.achievements || []).map((ach, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                        <textarea className="input-field w-full" rows="1" placeholder="Achievement Detail" value={ach} onChange={e => handleSimpleArrayChange('achievements', index, e.target.value)} />
                        <button onClick={() => removeItem('achievements', index)} className="btn-remove"><Trash2 size={16} /></button>
                    </div>
                ))}
            </section>
        </div>
    );
};

// Simple Styles
const css = `
    .input - field { @apply border p - 2 rounded w - full border - gray - 300 focus: ring - 2 focus: ring - blue - 500 outline - none; }
 .btn - add { @apply text - blue - 600 hover: bg - blue - 100 p - 1 rounded transition; }
 .btn - remove { @apply text - red - 500 hover: bg - red - 100 p - 2 rounded transition; }
`;

export default ResumeForm;
