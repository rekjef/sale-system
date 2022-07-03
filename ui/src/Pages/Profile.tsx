import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { username } = useParams<string>();
  return (
    <div>
      {username}
    </div>
  );
}

export default Profile;
