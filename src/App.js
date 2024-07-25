import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Game from './components/Game';
import InfoButton from './components/InfoButton';
import Modal from './components/Modal';
import Features from './components/Features';
import './styles/App.css';

const App = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="App">
      <Header />
      <InfoButton onClick={() => setShowInfoModal(true)} />
      <Game />
      <Footer />
      <Modal show={showInfoModal} handleClose={() => setShowInfoModal(false)}>
        <Features />
      </Modal>
    </div>
  );
};

export default App;
