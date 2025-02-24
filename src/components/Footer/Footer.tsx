import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-section">
            <img src="/icons/image 3.svg" alt="Safeer" className="footer-logo" />
            <p className="footer-description">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. 
              Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, 
              When An Unknown Printer Took A Galley Of Type And Scrambled It To.
            </p>
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <img src="/icons/facebook.svg" alt="" />
                </a>
                <a href="#" aria-label="Twitter">
                  <img src="/icons/twitter.svg" alt="" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <img src="/icons/linkedin.svg" alt="" />
                </a>
                <a href="#" aria-label="Instagram">
                  <img src="/icons/instagram.svg" alt="" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h2 className="section-title">WE'RE ALWAYS HERE TO HELP</h2>
            <div className="contact-items">
              <div className="contact-item">
                <img src="/icons/lifebuoy.svg" alt="" />
                <div className="contact-info">
                  <h3>Help Center</h3>
                  <p>Help.Safeer.Com</p>
                </div>
              </div>
              <div className="contact-item">
                <img src="/icons/sms.svg" alt="" />
                <div className="contact-info">
                  <h3>Support Email</h3>
                  <p>Care@Safeer.Com</p>
                </div>
              </div>
              <div className="contact-item">
                <img src="/icons/headphone.svg" alt="" />
                <div className="contact-info">
                  <h3>Call Center</h3>
                  <p>+962 70 010 010 (JO)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h2 className="section-title">Downloads Our App</h2>
            <div className="qr-section">
              <div className="qr-code-container">
                <img src="/icons/image 4.svg" alt="QR Code" className="qr-code" />
              </div>
              <div className="app-stores">
                <a href="#" className="app-store-link">
                  <img src="/icons/Apple logo.svg" alt="Apple logo" className="store-icon" />
                  <div className="store-text">
                    <span className="store-action">Download on the</span>
                    <span className="store-name">App Store</span>
                  </div>
                </a>
                <a href="#" className="app-store-link">
                  <img src="/icons/Google Play logo.svg" alt="Google Play logo" className="store-icon" />
                  <div className="store-text">
                    <span className="store-action">GET IT ON</span>
                    <span className="store-name">Google Play</span>
                  </div>
                </a>
                <a href="#" className="app-store-link">
                  <img src="/icons/Galaxy Store icon.svg" alt="Galaxy Store logo" className="store-icon" />
                  <div className="store-text">
                    <span className="store-action">Available on</span>
                    <span className="store-name">Galaxy Store</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="payment-methods">
              <h3>Payment Methods</h3>
              <div className="payment-icons">
                <img src="/icons/Visa.svg" alt="Visa" />
                <img src="/icons/Mastercard.svg" alt="Mastercard" />
                <img src="/icons/PayPal.svg" alt="PayPal" />
                <img src="/icons/Skrill.svg" alt="Skrill" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>© Safeer - All Rights Reserved</p>
          <div className="footer-links">
            <a href="#">About US</a>
            <a href="#">Warranty Policy</a>
            <a href="#">Sell With Us</a>
            <a href="#">Terms Of Sale</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 