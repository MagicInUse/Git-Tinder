import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State to hold the current candidate
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // Function to fetch a new candidate
  const fetchCandidate = async () => {
    // Fetch a list of candidates
    const candidates = await searchGithub();
    if (candidates.length > 0) {
      // Get the login of the first candidate
      const login = candidates[0].login;
      // Fetch detailed information about the candidate using the login
      const candidateData = await searchGithubUser(login);
      // Update the state with the fetched candidate data
      setCandidate(candidateData);
    }
  };

  // Function to save the current candidate to local storage
  const saveCandidate = () => {
    if (candidate) {
      // Get the saved candidates from local storage
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      // Add the current candidate to the saved candidates
      savedCandidates.push(candidate);
      // Save the updated list back to local storage
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      // Fetch a new candidate after saving
      fetchCandidate();
    }
  };

  // Fetch a candidate when the component mounts
  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <>
      {candidate ? (
        <>
          <div className="active-candidate">
            {/* Display the candidate's avatar */}
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
            {/* Display the candidate's login */}
            <p>Username: {candidate.login}</p>
            {/* Display the candidate's name */}
            <p>Name: {candidate.name ? candidate.name : 'Not Provided'}</p>
            {/* Display the candidate's location */}
            <p>Location: {candidate.location ? candidate.location : 'Not Provided'}</p>
            {/* Display the candidate's email */}
            <p>Email: {candidate.email ? candidate.email : 'Not Provided'}</p>
            {/* Display the candidate's company */}
            <p>Company: {candidate.company ? candidate.company : 'Not Provided'}</p>
            {/* Display the candidate's bio */}
            <p>Bio: {candidate.bio ? candidate.bio : 'Not Provided'}</p>
            {/* Link to the candidate's GitHub profile */}
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
          <div className="button-container">
            {/* Button to fetch a new candidate */}
            <button className="button-deny" onClick={fetchCandidate}>-</button>
            {/* Button to save the current candidate */}
            <button className="button-approve" onClick={saveCandidate}>+</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CandidateSearch;