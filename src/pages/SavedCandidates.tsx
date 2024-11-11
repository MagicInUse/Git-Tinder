import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  // State to hold the list of saved candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Effect to load saved candidates from local storage when the component mounts
  useEffect(() => {
    // Get the saved candidates from local storage
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    // Update the state with the saved candidates
    setSavedCandidates(candidates);
  }, []);

  // Function to delete a candidate from the saved candidates list
  const deleteCandidate = (login: string) => {
    // Filter out the candidate to be deleted
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    // Update the state with the new list of candidates
    setSavedCandidates(updatedCandidates);
    // Save the updated list back to local storage
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h2>Saved Candidates</h2>
      {savedCandidates.length > 0 ? (
        // Map through the saved candidates and display their information
        savedCandidates.map((candidate, index) => (
          <div key={index}>
            {/* Display the candidate's avatar */}
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
            {/* Display the candidate's login */}
            <p>Login: {candidate.login}</p>
            {/* Display the candidate's name */}
            <p>Name: {candidate.name}</p>
            {/* Display the candidate's location */}
            <p>Location: {candidate.location}</p>
            {/* Display the candidate's email */}
            <p>Email: {candidate.email}</p>
            {/* Display the candidate's company */}
            <p>Company: {candidate.company}</p>
            {/* Display the candidate's bio */}
            <p>Bio: {candidate.bio}</p>
            {/* Link to the candidate's GitHub profile */}
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            {/* Button to delete the candidate */}
            <button onClick={() => deleteCandidate(candidate.login)}>Delete</button>
          </div>
        ))
      ) : (
        // Display a message if there are no saved candidates
        <p>No saved candidates</p>
      )}
    </div>
  );
};

export default SavedCandidates;