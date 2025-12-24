import React from 'react';
import StandardTemplate from './templates/StandardTemplate';
import ModernTemplate from './templates/ModernTemplate';
import TechTemplate from './templates/TechTemplate';

const LivePreview = ({ data, template }) => {
    if (!data) return <div className="text-gray-400 text-center mt-10">No data available</div>;

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} />;
            case 'tech':
                return <TechTemplate data={data} />;
            case 'standard':
            default:
                return <StandardTemplate data={data} />;
        }
    };

    return (
        <div
            id="resume-preview"
            className={`mx-auto shadow-2xl border border-gray-100 w-[210mm] min-h-[297mm] overflow-hidden bg-white ${template === 'tech' ? 'bg-[#1e1e1e]' : ''}`}
        >
            {renderTemplate()}
        </div>
    );
};

export default LivePreview;
