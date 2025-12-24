const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    period: String,
    description: String,
});

const EducationSchema = new mongoose.Schema({
    degree: String,
    institution: String,
    year: String,
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
});

const ResumeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: String,
    phone: String,
    linkedin: String, // New
    github: String, // New
    bio: String,
    skills: [{ category: String, items: String }], // Changed to array of objects
    experience: [ExperienceSchema], // Internships
    education: [EducationSchema],
    projects: [ProjectSchema],
    trainings: [ExperienceSchema], // New: Reusing ExperienceSchema for similar structure
    certificates: [{ title: String, date: String, issuer: String }], // New
    achievements: [String], // New
}, { timestamps: true });

// We'll mostly be working with a single resume for this demo, 
// so we might just fetch the first one or create one if not exists.
module.exports = mongoose.model('Resume', ResumeSchema);
