import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './VehicleCard.css';

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

const viewTransforms = [
  "scale(1)", "scale(1.05) rotateY(10deg)", "scaleX(-1)", "scaleX(-1) scale(1.05) rotateY(10deg)",
  "scale(0.9)", "scale(1.05) rotateY(-10deg)", "scaleX(-1) rotateY(5deg)", "rotateY(-5deg)"
];

const VehicleCard = ({ vehicle }) => {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOrder = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    const slug = vehicle.name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
    navigate(`/checkout/${slug}?color=${encodeURIComponent(selectedColor.name)}`);
  };

  const handleViewModel = () => {
    const slug = vehicle.name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
    navigate(`/models/${slug}?color=${encodeURIComponent(selectedColor.name)}`);
  };

  const getBadgeClass = (status) => {
    switch(status) {
      case 'AVAILABLE': return 'available';
      case 'LIMITED STOCK': return 'limited-stock';
      case 'PRE-ORDER': return 'pre-order';
      case 'PREOWNED': return 'preowned';
      default: return 'available';
    }
  };

  return (
    <div className="vehicle-card">
      <div className="card-badges">
        <span className={`badge ${getBadgeClass(vehicle.status)}`}>
          <span className="dot"></span> {vehicle.status}
        </span>
        <span className="badge year">SINCE {vehicle.year}</span>
      </div>
      
      <div className="card-image-container">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="card-image"
          style={{ filter: selectedColor.filter }}
        />
      </div>

      <div className="card-header">
        <h3>{vehicle.name}</h3>
        <span className="price">{vehicle.price}</span>
      </div>
      <p className="card-subtitle">{vehicle.subtitle}</p>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-label">{vehicle.stat1Label}</span>
          <span className="stat-value">{vehicle.stat1Value}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{vehicle.stat2Label}</span>
          <span className="stat-value">{vehicle.stat2Value}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{vehicle.stat3Label}</span>
          <span className="stat-value">{vehicle.stat3Value}</span>
        </div>
      </div>

      <div className="card-colors">
        <div className="color-header">
          <span className="color-label">COLOR</span>
          <span className="color-name">{selectedColor.name}</span>
        </div>
        <div className="color-options">
          {colorOptions.map(color => (
            <div 
              key={color.id} 
              className={`color-circle-wrapper ${selectedColor.id === color.id ? 'active' : ''}`}
              onClick={() => setSelectedColor(color)}
            >
              <div className="color-circle" style={{ backgroundColor: color.hex }}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-pricing">
        <div className="pricing-col">
          <span className="pricing-label">From</span>
          <span className="pricing-value">{vehicle.monthly}</span>
        </div>
        <div className="pricing-col align-right">
          <span className="pricing-label">Deposit</span>
          <span className="pricing-value">{vehicle.deposit}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-card" onClick={() => setIsGalleryOpen(true)}><Image size={16} /> GALLERY</button>
        <button className="btn-card" onClick={handleViewModel}><Eye size={16} /> VIEW MODEL</button>
      </div>
      
      <button 
        className="btn-card" 
        style={{ backgroundColor: '#e31937', color: '#fff', borderColor: '#e31937', marginTop: '0.5rem', width: '100%' }}
        onClick={handleOrder}
      >
        ORDER &rarr;
      </button>

      {isGalleryOpen && (
        <div className="gallery-modal-overlay">
          <div className="gallery-modal">
            <button className="gallery-close" onClick={() => setIsGalleryOpen(false)}><X size={20} /></button>
            
            <div className="gallery-main">
              <button className="g-arrow left" onClick={() => setGallerySlide((prev) => (prev - 1 + 8) % 8)}><ChevronLeft size={24} /></button>
              <img 
                src={vehicle.image} 
                className="g-image" 
                style={{ filter: selectedColor.filter, transform: viewTransforms[gallerySlide] }} 
                alt="View" 
              />
              <button className="g-arrow right" onClick={() => setGallerySlide((prev) => (prev + 1) % 8)}><ChevronRight size={24} /></button>
              <div className="g-view-label">{viewLabels[gallerySlide]}</div>
            </div>

            <div className="gallery-footer">
              <div className="g-footer-top">
                <div className="g-titles">
                  <h2>{vehicle.name}</h2>
                  <p>{vehicle.subtitle}</p>
                </div>
                <div className="g-year">Since {vehicle.year}</div>
              </div>

              <div className="g-thumbnails">
                {[0,1,2,3,4,5,6,7].map(index => (
                  <div 
                    key={index} 
                    className={`g-thumb ${gallerySlide === index ? 'active' : ''}`} 
                    onClick={() => setGallerySlide(index)}
                  >
                    <img src={vehicle.image} style={{ filter: selectedColor.filter, transform: viewTransforms[index] }} alt="Thumb" />
                  </div>
                ))}
              </div>

              <div className="g-color-section">
                <div className="g-color-left">
                  <span className="c-label">COLOR</span>
                  <div className="c-options" style={{ marginTop: '0.5rem' }}>
                    {colorOptions.map(color => (
                      <div 
                        key={color.id} 
                        className={`color-circle-wrapper ${selectedColor.id === color.id ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div className="color-circle" style={{ backgroundColor: color.hex }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                <span className="c-name">{selectedColor.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
