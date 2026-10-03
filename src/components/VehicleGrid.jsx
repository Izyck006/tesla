import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import { useVehicles } from '../context/VehicleContext';
import './VehicleGrid.css';


const VehicleGrid = () => {
  const { vehicles, loading } = useVehicles();
  const [selectedColor, setSelectedColor] = useState({ name: 'Pearl White' });

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Loading live inventory...</div>;
  }

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="white-car-filter">
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            1 0 0 0 0
            1 0 0 0 0
            0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.5" />
            <feFuncG type="linear" slope="1.5" />
            <feFuncB type="linear" slope="1.5" />
          </feComponentTransfer>
        </filter>
      </svg>
      <section className="vehicle-section" id="vehicles">
      <div className="vehicle-section-header">
        <h2>Every Tesla. One platform.</h2>
        <p>Premium electric vehicles available for instant order with flexible payment options.</p>
      </div>
      <div className="vehicle-grid">
        {vehicles.map((v, i) => (
          <VehicleCard key={i} vehicle={v} />
        ))}
      </div>
    </section>
    </>
  );
};

export default VehicleGrid;
