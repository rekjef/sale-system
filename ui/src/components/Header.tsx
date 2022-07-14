import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../UserContext';

function Header() {
  const { user } = useGlobalContext();

  return (
    <div id="header">
      SaleDashboard
      {!user.isLogged ? (
        <Link to="/signin">Sign in</Link>
      ) : (
        <div>
          <Link to="/add-offer">Add offer</Link>
          Profile:
          {' '}
          {user.email}
          <Link to="/signout">Sign out</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
