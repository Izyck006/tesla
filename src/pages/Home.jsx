import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import VehicleGrid from '../components/VehicleGrid';

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="snap-container">
        <Section 
          title="Driving the Future at Affordable Prices" 
          description="Reserve any Tesla in minutes. Pay securely via Paystack."
          backgroundImg="/hero_car.png"
          primaryButton="Order Now"
          textColor="light"
        />
        
        <VehicleGrid />
        
        <section className="section" style={{ height: '10vh', minHeight: '150px', backgroundColor: '#fff', scrollSnapAlign: 'end', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <footer className="footer">
            <p>Tesla Headquarters | 1 Tesla Road | Austin, Texas 78725 | USA</p>
            <ul className="footer-links">
              <li><span>Tesla © 2026</span></li>
              <li><Link to="/privacy">Privacy & Legal</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><a href="https://www.tesla.com/contact" target="_blank" rel="noopener noreferrer">Contact</a></li>
              <li><a href="https://www.tesla.com/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><a href="https://www.tesla.com/blog" target="_blank" rel="noopener noreferrer">News</a></li>
              <li><a href="https://engage.tesla.com/" target="_blank" rel="noopener noreferrer">Engage</a></li>
              <li><a href="https://www.tesla.com/findus" target="_blank" rel="noopener noreferrer">Locations</a></li>
            </ul>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Home;
