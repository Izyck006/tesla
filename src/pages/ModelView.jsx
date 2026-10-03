import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import './ModelView.css';

const colorOptions = [
  { id: 'white', name: 'Pearl White', hex: '#ffffff', filter: 'url(#white-car-filter)' },
  { id: 'grey', name: 'Stealth Grey', hex: '#555555', filter: 'grayscale(1) brightness(0.8) contrast(1.1)' },
  { id: 'blue', name: 'Deep Blue', hex: '#0033cc', filter: 'hue-rotate(220deg) brightness(0.9) contrast(1.1)' },
  { id: 'red', name: 'Ultra Red', hex: '#cc0000', filter: 'hue-rotate(0deg)' },
];

const viewLabels = [
  "FRONT - 1/8", "FRONT RIGHT - 2/8", "RIGHT - 3/8", "REAR RIGHT - 4/8",
  "REAR - 5/8", "REAR LEFT - 6/8", "LEFT - 7/8", "FRONT LEFT - 8/8"
];

// Mock CSS transforms to simulate different angles using the single image
const viewTransforms = [
  "scale(1)", "scale(1.05) rotateY(10deg)", "scaleX(-1)", "scaleX(-1) scale(1.05) rotateY(10deg)",
  "scale(0.9)", "scale(1.05) rotateY(-10deg)", "scaleX(-1) rotateY(5deg)", "rotateY(-5deg)"
];

const ModelView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { vehicles, loading } = useVehicles();
  
  const queryParams = new URLSearchParams(location.search);
  const initialColorName = queryParams.get('color') || 'Pearl White';
  const [selectedColor, setSelectedColor] = useState(colorOptions.find(c => c.name === initialColorName) || colorOptions[0]);
  
  const [activeSlide, setActiveSlide] = useState(3); // Default to 4th slide like in screenshot

  const vehicle = vehicles.find(v => v.name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '') === id) || vehicles[0];

  const handleNext = () => setActiveSlide((prev) => (prev + 1) % 8);
  const handlePrev = () => setActiveSlide((prev) => (prev - 1 + 8) % 8);

  const handleOrder = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/checkout/${id}?color=${encodeURIComponent(selectedColor.name)}`);
  };

  return (
    <div className="model-view-page">
      {/* SVG Filter for White Color */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="white-car-filter">
          <feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.5" />
            <feFuncG type="linear" slope="1.5" />
            <feFuncB type="linear" slope="1.5" />
          </feComponentTransfer>
        </filter>
      </svg>

      <header className="checkout-header dark-header">
        <div className="header-logo" onClick={() => navigate('/')}>TESLA</div>
        <div className="header-links">
          <span>Vehicles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem' }}>
          {user ? (
            <>
              <span>{user.name}</span>
              <span style={{ cursor: 'pointer', color: '#888' }} onClick={logout}>Sign Out</span>
            </>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/auth')}>Sign In</span>
          )}
        </div>
      </header>

      <div className="checkout-nav dark-nav" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> BACK TO LINEUP
      </div>

      <div className="model-view-container">
        
        {/* Left Side: Carousel */}
        <div className="model-gallery">
          <div className="main-stage">
            <button className="nav-arrow left" onClick={handlePrev}><ChevronLeft size={24} /></button>
            <div className="main-image-wrapper">
              <img 
                src={vehicle.image} 
                alt={`${vehicle.name} view`} 
                className="main-image"
                style={{ 
                  filter: selectedColor.filter,
                  transform: viewTransforms[activeSlide]
                }} 
              />
            </div>
            <button className="nav-arrow right" onClick={handleNext}><ChevronRight size={24} /></button>
            
            <div className="view-label">
              {viewLabels[activeSlide]}
            </div>
          </div>

          <div className="thumbnail-strip">
            {[0,1,2,3,4,5,6,7].map(index => (
              <div 
                key={index} 
                className={`thumbnail ${activeSlide === index ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              >
                <img 
                  src={vehicle.image} 
                  alt={`Thumb ${index}`} 
                  style={{ 
                    filter: selectedColor.filter,
                    transform: viewTransforms[index]
                  }} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="model-details">
          <div className="badges">
            <span className="badge-text">📅 SINCE {vehicle.year}</span>
            <span className="badge-text"> • {vehicle.status}</span>
          </div>

          <h1 className="model-title">{vehicle.name}</h1>
          <p className="model-subtitle">{vehicle.subtitle}</p>

          <div className="model-stats">
            <div className="m-stat">
              <span className="m-label">{vehicle.stat1Label}</span>
              <span className="m-value">{vehicle.stat1Value}</span>
            </div>
            <div className="m-stat">
              <span className="m-label">{vehicle.stat2Label}</span>
              <span className="m-value">{vehicle.stat2Value}</span>
            </div>
            <div className="m-stat">
              <span className="m-label">{vehicle.stat3Label}</span>
              <span className="m-value">{vehicle.stat3Value}</span>
            </div>
          </div>

          <div className="pricing-section">
            <div className="price-col">
              <span className="p-label">STARTING PRICE</span>
              <span className="p-val">{vehicle.price}</span>
            </div>
            <div className="price-col right">
              <span className="p-label">{vehicle.monthly}</span>
              <span className="p-sub">Deposit {vehicle.deposit}</span>
            </div>
          </div>

          <div className="color-section">
            <div className="c-header">
              <span className="c-label">COLOR</span>
              <span className="c-name">{selectedColor.name}</span>
            </div>
            <div className="c-options">
              {colorOptions.map(color => (
                <div 
                  key={color.id} 
                  className={`c-circle-wrapper ${selectedColor.id === color.id ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <div className="c-circle" style={{ backgroundColor: color.hex }}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-order" onClick={handleOrder}>ORDER NOW &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModelView;
