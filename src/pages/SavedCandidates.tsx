import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  // State to hold the list of saved candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  // State to hold the selected sort option
  const [sortOption, setSortOption] = useState<string>('login');
  // State to hold the filter option for excluding candidates with null fields
  const [filterNotProvided, setFilterNotProvided] = useState<boolean>(false);

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

  // Function to handle sorting option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Function to handle filter option change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterNotProvided(e.target.checked);
  };

  // Sort and filter candidates based on selected options
  const sortedAndFilteredCandidates = savedCandidates
    .filter(candidate => {
      // If filter option is selected, exclude candidates with any null or undefined fields
      if (filterNotProvided) {
        return candidate.name && candidate.location && candidate.email && candidate.company && candidate.bio;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort candidates based on the selected sort option
      if (sortOption === 'login') {
        return a.login.localeCompare(b.login);
      } else if (sortOption === 'location') {
        return (a.location || '').localeCompare(b.location || '');
      }
      return 0;
    });

  return (
    <>
      <h2>Saved Candidates</h2>
      <div className="controls">
        {/* Dropdown to select sorting option */}
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="login">Login</option>
            <option value="location">Location</option>
          </select>
        </label>
        {/* Checkbox to filter out candidates with null fields */}
        <label>
          <input
            type="checkbox"
            checked={filterNotProvided}
            onChange={handleFilterChange}
          />
          Exclude Candidates with Null Fields
        </label>
      </div>
      {sortedAndFilteredCandidates.length > 0 ? (
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
            {sortedAndFilteredCandidates.map((candidate, index) => (
              <tr key={index}>
                <td className="avatar">
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
                <td className="actions">
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