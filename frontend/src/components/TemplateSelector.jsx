import React from 'react';
import { Layout, Codepen, Type } from 'lucide-react';

const TemplateSelector = ({ current, onSelect }) => {
    const templates = [
        { id: 'standard', name: 'Standard', icon: <Type size={16} /> },
    ];

    return (
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-lg border border-gray-200">
            {templates.map(t => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${current === t.id
                        ? 'bg-white text-blue-700 shadow-sm ring-1 ring-gray-200'
                        : 'text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {t.icon}
                    {t.name}
                </button>
            ))}
        </div>
    );
};

export default TemplateSelector;
