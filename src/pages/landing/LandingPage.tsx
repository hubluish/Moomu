import React from 'react';
import './LandingPage.css';
import Header from '../../components/common/header/header';
import P1 from '../../components/landing/P1/P1';
import P2 from '../../components/landing/P2/P2';
import P3 from '../../components/landing/P3/P3';
import P4 from '../../components/landing/P4/P4';
import P5 from '../../components/landing/P5/P5';
import Footer from '../../components/common/footer/Footer';
import LoginModal from '../../components/common/Login/LoginModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="app">
      <Header />
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="app-content">
        <P1 openLoginModal={openModal} />
        <div className="line"></div>

        <P2 />
        <div className="line"></div>

        <P3 />
        <div className="line"></div>

        <P4 />
        <div className="line"></div>

        <P5 openLoginModal={openModal} />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
