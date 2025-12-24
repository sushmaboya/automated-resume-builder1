const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

// In a real scenario, this would likely point to a repo mapped in a volume or a cloned repo.
// For this demo, we'll assume the root of the project is the git repo or we create a dummy one.
// We'll write the resume to a JSON file to simulate "website content" updates.

const REPO_PATH = path.join(__dirname, '../../'); // Go up to project root
const DATA_FILE = path.join(REPO_PATH, 'resume-data.json');

const git = simpleGit(REPO_PATH);

const commitChanges = async (resumeData) => {
    try {
        // 1. Write data to a file (simulating static site content gen)
        fs.writeFileSync(DATA_FILE, JSON.stringify(resumeData, null, 2));

        // 2. Git operations
        // Check if it's a git repo, if not init (just for safety in this demo env)
        const isRepo = await git.checkIsRepo();
        if (!isRepo) {
            await git.init();
        }

        await git.add(DATA_FILE);
        const status = await git.status();

        if (status.staged.length > 0) {
            await git.commit('Update resume data via Automated Builder');
            console.log('Git commit successful');
            // await git.push(); // Uncomment if remote is configured
        } else {
            console.log('No changes to commit');
        }

    } catch (error) {
        console.error('Git automation error:', error);
        // Don't crash the api if git fails
    }
};

module.exports = { commitChanges };
