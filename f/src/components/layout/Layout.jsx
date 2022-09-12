import * as React from 'react';

import Nav from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <nav className='fixed top-0 z-50 w-full'>
        <Nav />
      </nav>
      <div className='layout mx-auto mt-10 flex flex-col min-h-screen'>
      {children}
      </div>
    </>
  );
}
