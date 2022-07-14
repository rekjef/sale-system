import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../UserContext';

function Home() {
  const { user } = useGlobalContext();
  return (
    <div>
      {user.isLogged ? <Link to="/offer/1">asd</Link> : <div />}
    </div>
  );
}

export default Home;
