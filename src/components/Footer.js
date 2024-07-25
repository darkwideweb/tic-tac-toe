import React from 'react';
import { FaGithub, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icons">
        <a href="https://github.com/darkwideweb" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://t.me/id01001110" target="_blank" rel="noopener noreferrer">
          <FaTelegram size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
