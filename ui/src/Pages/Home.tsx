import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../UserContext';

function Home() {
  const { user } = useGlobalContext();
  return (
    <div>
      {!user.isLogged ? (
        <Link to="/signin">Sign in</Link>
      ) : (
        <div>
          <Link to="/signout">Sign out</Link>
          <br />
          User:
          {' '}
          {user.email}
          User id:
          {' '}
          {user.id}
        </div>
      )}

    </div>
  );
}

export default Home;
