import React, { useState, useEffect } from 'react';
import ResumeForm from './ResumeForm';
import LivePreview from './LivePreview';
import TemplateSelector from './TemplateSelector';
import ATSScore from './ATSScore';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Download, Save, Edit, Eye } from 'lucide-react';

function ResumeBuilder() {
    const [resumeData, setResumeData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        bio: '',
        skills: [],
        experience: [],
        education: [],
        projects: [],
        trainings: [],
        certificates: [],
        achievements: []
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState('standard');

    // Fetch initial data
    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/resume');
            if (res.data) {
                setResumeData(res.data);
            }
        } catch (error) {
            console.error('Error fetching resume (Backend likely down):', error);
        }
    };

    const handleUpdate = (updatedData) => {
        setResumeData(updatedData);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/resume', resumeData);
            alert('Resume saved successfully!');
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Failed to save. Is the Backend Server (port 5000) running?');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const element = document.getElementById('resume-preview');
        if (!element) {
            alert('Preview element not found!');
            return;
        }

        // Clone the element to avoid interfering with the live view
        const clone = element.cloneNode(true);

        // Reset styles for PDF generation
        clone.style.transform = 'none';
        clone.style.margin = '0';
        clone.style.width = '210mm'; // Force A4 width
        clone.style.minHeight = '297mm';
        clone.style.position = 'absolute';
        clone.style.left = '-9999px'; // Move off-screen
        clone.style.top = '0';

        document.body.appendChild(clone);

        const opt = {
            margin: 0,
            filename: `${resumeData.fullName.replace(/\s+/g, '_') || 'resume'}_${selectedTemplate}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(clone).save().then(() => {
            document.body.removeChild(clone);
            console.log('PDF downloaded successfully');
        }).catch(err => {
            console.error('PDF generation error:', err);
            if (document.body.contains(clone)) {
                document.body.removeChild(clone);
            }
            alert('Error generating PDF: ' + (err.message || 'Unknown error'));
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b shadow-sm z-10 sticky top-0 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        RB
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                        Resume Builder
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <TemplateSelector current={selectedTemplate} onSelect={setSelectedTemplate} />

                    <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2"
                        >
                            {isEditing ? <Eye size={16} /> : <Edit size={16} />}
                            {isEditing ? 'Preview Mode' : 'Editor Mode'}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2"
                        >
                            <Save size={16} /> {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 shadow-sm"
                        >
                            <Download size={16} /> PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex flex-1 overflow-hidden">

                {/* Editor Section */}
                {isEditing && (
                    <div className="w-full lg:w-5/12 xl:w-4/12 flex flex-col border-r bg-white h-full relative z-0">
                        {/* ATS Score Sticky Header */}
                        <div className="p-4 border-b bg-gray-50/50 backdrop-blur-sm sticky top-0 z-10">
                            <ATSScore data={resumeData} />
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                            <ResumeForm data={resumeData} onUpdate={handleUpdate} />
                        </div>
                    </div>
                )}

                {/* Preview Section */}
                <div className={`w-full ${isEditing ? 'lg:w-7/12 xl:w-8/12' : 'lg:w-full'} bg-gray-200/50 relative overflow-hidden flex flex-col`}>
                    <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start">
                        <div className="transform origin-top scale-90 lg:scale-100 transition-transform duration-300">
                            <LivePreview data={resumeData} template={selectedTemplate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeBuilder;
