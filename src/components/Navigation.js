import React from 'react';

const Navigation = ({ onRouteChange, isSignIn }) => {
    if (isSignIn) {
    return (
    <nav className='tr'>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>
    </nav>)
    } else {
      return (
      <nav className='nav'>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
      </nav>
    )}
  }


export default Navigation; 