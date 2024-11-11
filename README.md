# Git-Tinder
A React & NodeJS application that shows GitHub profiles for 'candidate search' using the GitHub API. Hosted live on [Render](https://git-tinder.onrender.com/)!

# Features
- Random Profile Search: Fetch random GitHub profiles using the GitHub API.
- Profile Details: View detailed information about each profile, including username, avatar, name, location, email, company, and bio.
- Save Profiles: Save profiles to local storage for later reference.
- View Saved Profiles: View a list of saved profiles with options to sort and filter.
- Sort and Filter: Sort saved profiles by username or location and filter out profiles with any empty optional fields.

# Installation
1. Clone the repository: `git clone https://github.com/magicinuse/git-tinder.git` and change directory to the new clone `cd git-tinder`
2. Install dependencies: `npm install`
3. Create a .env file in the root directory and add your GitHub token: `VITE_GITHUB_TOKEN=your_github_token_here`
4. Start the development server: `npm run dev`

# Usage
### Candidate Search
- The home page displays a random GitHub profile.
- Click the - button to fetch a new random profile.
- Click the + button to save the current profile to local storage.
### Saved Candidates
- Navigate to the "Saved Candidates" page to view saved profiles.
- Use the dropdown to sort profiles by username or location.
- Use the checkbox to filter out profiles with any empty optional fields.
- Click the "Remove" button to delete a profile from the saved list.