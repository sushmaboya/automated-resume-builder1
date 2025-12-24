import React, { useMemo } from 'react';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const ATSScore = ({ data }) => {
    const scoreData = useMemo(() => {
        let score = 0;
        let tips = [];
        const maxScore = 100;

        // 1. Basic Info (20 pts)
        if (data.fullName) score += 5;
        else tips.push("Add your full name.");

        if (data.email) score += 5;
        else tips.push("Add a professional email address.");

        if (data.phone) score += 5;
        else tips.push("Add a contact number.");

        if (data.linkedin) score += 5;
        else tips.push("Add your LinkedIn profile.");

        // 2. Sections Presence (30 pts)
        if (data.experience && data.experience.length > 0) score += 10;
        else tips.push("Add internship or work experience.");

        if (data.projects && data.projects.length > 0) score += 10;
        else tips.push("Add personal or academic projects.");

        if (data.skills && data.skills.length > 0) score += 10;
        else tips.push("Add technical skills.");

        // 3. Content Quality (30 pts) - Simplified checks
        const skillCount = data.skills ? data.skills.reduce((acc, curr) => acc + (curr.items ? curr.items.split(',').length : 0), 0) : 0;
        if (skillCount >= 5) score += 10;
        else if (skillCount > 0) score += 5;
        else tips.push("List at least 5 key skills.");

        const descWords = data.experience ? data.experience.reduce((acc, curr) => acc + (curr.description ? curr.description.length : 0), 0) : 0;
        if (descWords > 100) score += 10;
        else tips.push("Expand your experience descriptions.");

        const projectCount = data.projects ? data.projects.length : 0;
        if (projectCount >= 2) score += 10;
        else tips.push("Add at least 2 projects.");

        // 4. Keywords (20 pts) - formatting checks
        // Check for specific action verbs or tech keywords could go here
        // For now, checks if we have Education
        if (data.education && data.education.length > 0) score += 20;
        else tips.push("Add your educational background.");

        return { score: Math.min(score, maxScore), tips };
    }, [data]);

    const getColor = (s) => {
        if (s >= 80) return 'text-green-600';
        if (s >= 50) return 'text-yellow-600';
        return 'text-red-500';
    };

    const getBgColor = (s) => {
        if (s >= 80) return 'bg-green-100';
        if (s >= 50) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-600" />
                    ATS Strength
                </h3>
                <span className={`text-xl font-black ${getColor(scoreData.score)}`}>
                    {scoreData.score}/100
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${scoreData.score >= 80 ? 'bg-green-600' : scoreData.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${scoreData.score}%` }}
                ></div>
            </div>

            {scoreData.tips.length > 0 ? (
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Improvement Tips</h4>
                    <ul className="space-y-1">
                        {scoreData.tips.slice(0, 3).map((tip, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex gap-2 items-start">
                                <AlertCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-sm text-green-700 font-medium flex gap-2">
                    <CheckCircle size={18} />
                    Great job! Your resume looks strong.
                </div>
            )}
        </div>
    );
};

export default ATSScore;
