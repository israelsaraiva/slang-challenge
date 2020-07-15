import './App.scss';

import React from 'react';

import Footer from './sections/footer/footer';
import Header from './sections/header/header';
import MiddleSection from './sections/middle/middle';

function App() {
  return (
    <div className='app-container'>
      <Header />

      <div className='my-auto'>
        <MiddleSection />
      </div>

      <Footer />
    </div>
  );
}

export default App;
