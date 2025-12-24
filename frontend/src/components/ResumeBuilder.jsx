import React, { useState, useEffect } from 'react';
import ResumeForm from './ResumeForm';
import LivePreview from './LivePreview';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Download, Save, Edit } from 'lucide-react';

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
    const [isEditing, setIsEditing] = useState(true); // Toggle for mobile or clarity

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

    const handleUpdate = async (updatedData) => {
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

        // Clone the element to avoid interfering with the live view and remove scaling/transforms
        const clone = element.cloneNode(true);

        // Reset styles on the clone to ensure A4 compatibility
        clone.style.transform = 'none';
        clone.style.margin = '0';
        clone.style.width = '210mm'; // Force A4 width
        clone.style.height = 'auto';
        clone.style.position = 'absolute';
        clone.style.left = '-9999px'; // Move off-screen
        clone.style.top = '0';

        document.body.appendChild(clone);

        const opt = {
            margin: 0,
            filename: `${resumeData.fullName.replace(/\s+/g, '_') || 'resume'}.pdf`,
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
        <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                    📄 Automated Resume Builder
                </h1>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 text-gray-700"
                    >
                        <Edit size={18} /> {isEditing ? 'Hide Editor' : 'Edit Resume'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
                    >
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Data'}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
                    >
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

                {/* Editor Section */}
                {isEditing && (
                    <div className="w-full lg:w-5/12 bg-white rounded-lg shadow-sm p-6 overflow-y-auto h-[calc(100vh-140px)] scrollbar-thin">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Editor</h2>
                        <ResumeForm data={resumeData} onUpdate={handleUpdate} />
                    </div>
                )}

                {/* Preview Section */}
                <div className={`w-full ${isEditing ? 'lg:w-7/12' : 'lg:w-full'} flex justify-center bg-gray-200/50 rounded-lg p-4 overflow-y-auto h-[calc(100vh-140px)]`}>
                    <div className="scale-90 origin-top">
                        <LivePreview data={resumeData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeBuilder;
