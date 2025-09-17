import React from 'react';
import './App.css';
import './styles/GlobalStyles.css';

// Components import
import Header from './components/Header/Header';
import P1 from './components/P1/P1';
import P2 from './components/P2/P2';
import P3 from './components/P3/P3';
import P4 from './components/P4/P4';
import P5 from './components/P5/P5';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <P1 />
        <div className ="line"></div>

        <P2 />
        <div className ="line"></div>

        <P3 />
        <div className ="line"></div>

        <P4 />
        <div className ="line"></div>

        <P5 />
        <Footer />
      </div>
    </div>
  );
}

export default App;