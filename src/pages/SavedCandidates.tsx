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
    <>
      <h2>Saved Candidates</h2>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width="50" height="50" />
                </td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.login}</a>
                </td>
                {/* Display the optional values if they exist, otherwise display 'Not Provided' */}
                <td>{candidate.name ? candidate.name : 'Not Provided'}</td>
                <td>{candidate.location ? candidate.location : 'Not Provided'}</td>
                <td>{candidate.email ? candidate.email : 'Not Provided'}</td>
                <td>{candidate.company ? candidate.company : 'Not Provided'}</td>
                <td>{candidate.bio ? candidate.bio : 'Not Provided'}</td>
                <td>
                  <button className="button-deny" onClick={() => deleteCandidate(candidate.login)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Display a message if there are no saved candidates
        <p>No saved candidates</p>
      )}
    </>
  );
};

export default SavedCandidates;