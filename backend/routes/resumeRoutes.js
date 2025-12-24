const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { commitChanges } = require('../services/gitService');

// GET Resume
router.get('/', async (req, res) => {
    try {
        // For simplicity, return the last updated resume or create a blank one
        let resume = await Resume.findOne().sort({ updatedAt: -1 });
        if (!resume) {
            // Return empty structure if none exists
            return res.json({
                fullName: '',
                email: '',
                phone: '',
                bio: '',
                skills: [],
                experience: [],
                education: [],
                projects: []
            });
        }
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE / UPDATE Resume
router.post('/', async (req, res) => {
    try {
        const { fullName, email, phone, bio, skills, experience, education, projects } = req.body;

        // Simplified: Always upsert the "primary" resume
        let resume = await Resume.findOne().sort({ updatedAt: -1 });

        if (resume) {
            resume.fullName = fullName;
            resume.email = email;
            resume.phone = phone;
            resume.bio = bio;
            resume.skills = skills;
            resume.experience = experience;
            resume.education = education;
            resume.projects = projects;
            await resume.save();
        } else {
            resume = new Resume({
                fullName, email, phone, bio, skills, experience, education, projects
            });
            await resume.save();
        }

        // Trigger Git Automation
        // We run this asynchronously so we don't block the response
        commitChanges(resume).then(() => console.log('Auto-committed changes'));

        res.json(resume);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
