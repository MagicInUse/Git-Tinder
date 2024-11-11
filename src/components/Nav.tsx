import { NavLink } from 'react-router-dom';

// The Nav component renders a navigation bar with links to different routes
const Nav = () => {
  return (
    <nav className="nav">
      {/* The unordered list that contains the navigation items */}
      <ul className="nav-list">
        {/* Navigation item for the Home page */}
        <li className="nav-item">
          {/* NavLink is used to create a link that can be styled based on the active route */}
          <NavLink 
            to="/" 
            // The className prop is a function that returns different class names based on whether the link is active
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Home
          </NavLink>
        </li>
        {/* Navigation item for the Saved Candidates page following the same structure */}
        <li className="nav-item">
          <NavLink 
            to="/SavedCandidates" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
