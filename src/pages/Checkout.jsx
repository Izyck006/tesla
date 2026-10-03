import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import './Checkout.css';

const filterMapping = {
  'Pearl White': 'url(#white-car-filter)',
  'Stealth Grey': 'grayscale(1) brightness(0.8) contrast(1.1)',
  'Deep Blue': 'hue-rotate(220deg) brightness(0.9) contrast(1.1)',
  'Ultra Red': 'hue-rotate(0deg)'
};

const Checkout = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // URL slug for car, e.g. "tesla-model-3"
  const { user, logout } = useAuth();
  const { vehicles, loading } = useVehicles();
  
  // Parse URL query params for color
  const queryParams = new URLSearchParams(location.search);
  const color = queryParams.get('color') || 'Pearl White';
  
  if (loading) return <div style={{ color: '#fff', padding: '2rem' }}>Loading checkout data...</div>;

  const vehicle = vehicles.find(v => v.name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '') === id);
  if (!vehicle) return <div style={{ color: '#fff', padding: '2rem' }}>Vehicle not found for checkout.</div>;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'crypto', // crypto | bank
    cryptoType: 'BTC',
    agreed: false,
    signature: '',
    date: new Date().toLocaleDateString('en-US')
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const numericDeposit = parseInt(vehicle.deposit.replace(/[^0-9]/g, ''), 10);
  
  const paystackProps = {
    email: formData.email || 'customer@example.com',
    amount: numericDeposit * 100, // Paystack requires lowest denomination (cents/kobo)
    metadata: {
      name: formData.name,
      phone: formData.phone,
    },
    publicKey: 'pk_test_9780a01cb353221f5aff20d7b25983df9b7cfa0e',
    text: `PAY ${vehicle.deposit} SECURELY`,
    onSuccess: () => {
      setStep(3);
    },
    onClose: () => console.log("Payment closed"),
  };

  const renderStepIndicators = () => (
    <div className="checkout-steps">
      {[
        { num: 1, label: 'DETAILS' },
        { num: 2, label: 'PAYMENT' },
        { num: 3, label: 'AGREEMENT' },
        { num: 4, label: 'CONFIRMED' }
      ].map(s => (
        <React.Fragment key={s.num}>
          <div className={`step-indicator ${step >= s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
            <div className="step-circle">{step > s.num ? <Check size={14} /> : s.num}</div>
            <span>{s.label}</span>
          </div>
          {s.num < 4 && <div className={`step-line ${step > s.num ? 'active' : ''}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="checkout-page">
      <header className="checkout-header">
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

      <div className="checkout-nav" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> Back to lineup
      </div>

      <div className="checkout-container">
        <div className="checkout-main">
          {renderStepIndicators()}

          <div className="checkout-content">
            {step === 1 && (
              <div className="step-panel fade-in">
                <h2>Customer details</h2>
                <p className="subtitle">For delivery and order confirmation.</p>
                
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>EMAIL ADDRESS</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>PHONE NUMBER</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                  </div>
                </div>
                <div className="form-group">
                  <label>DELIVERY ADDRESS</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Tesla Ave, LA" />
                </div>
                
                <button className="btn-primary" onClick={() => setStep(2)}>CONTINUE TO PAYMENT</button>
              </div>
            )}

            {step === 2 && (
              <div className="step-panel fade-in">
                <h2>Payment method</h2>
                <p className="subtitle">Deposit due today: <strong>{vehicle.deposit}</strong></p>
                
                <div className="paystack-section" style={{ background: '#111', padding: '3rem 2rem', borderRadius: '4px', border: '1px solid #222', textAlign: 'center', margin: '2rem 0' }}>
                   <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Secure Checkout</h3>
                   <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '0.85rem' }}>Your payment is encrypted and securely processed by Paystack.</p>
                   
                   <PaystackButton 
                     className="btn-primary" 
                     style={{ width: '100%', padding: '1.2rem', fontSize: '1rem', display: 'block' }} 
                     {...paystackProps} 
                   />
                </div>
                
                <div className="form-actions">
                  <button className="btn-secondary" onClick={() => setStep(1)}>BACK</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-panel fade-in">
                <h2>Agreement & Signature</h2>
                
                <div className="agreement-box">
                  <ol>
                    <li>Customer agrees to payment terms.</li>
                    <li>Deposit becomes non-refundable after processing.</li>
                    <li>Delivery timeline depends on availability.</li>
                    <li>Valid identification is required.</li>
                    <li>Tesla manufacturer warranty applies.</li>
                    <li>Digital signature is legally accepted.</li>
                  </ol>
                </div>
                
                <label className="checkbox-label">
                  <input type="checkbox" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} />
                  I agree to the Terms & Conditions of this Tesla Car Delivery Agreement.
                </label>
                
                <div className="form-row signature-row">
                  <div className="form-group">
                    <label>SIGNATURE (TYPE FULL NAME)</label>
                    <input type="text" name="signature" value={formData.signature} onChange={handleChange} placeholder="Type your name" />
                  </div>
                  <div className="form-group">
                    <label>DATE</label>
                    <input type="text" name="date" value={formData.date} disabled />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="btn-secondary" onClick={() => setStep(2)}>BACK</button>
                  <button className="btn-primary" onClick={() => setStep(4)} disabled={!formData.agreed || !formData.signature}>SUBMIT AGREEMENT</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="step-panel fade-in confirmed-panel">
                <div className="success-icon">
                  <Check size={48} color="#fff" />
                </div>
                <h2>Order Confirmed</h2>
                <p>Thank you, {formData.name || 'Customer'}. Your order for the {vehicle.name} has been received.</p>
                <p className="subtitle">Order Reference: #TSL-{Math.floor(Math.random()*1000000)}</p>
                <div style={{ marginTop: '2rem' }}>
                  <button className="btn-primary" onClick={() => navigate('/')}>RETURN TO GARAGE</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary-box">
            <h4 className="summary-title">YOUR ORDER</h4>
            <div className="summary-image-container">
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
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                style={{ filter: filterMapping[color] }}
                className="summary-image" 
              />
            </div>
            <h3>{vehicle.name}</h3>
            <p className="subtitle">Premium electric vehicle.</p>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Color</span>
                <span>{color}</span>
              </div>
              <div className="summary-row">
                <span>Vehicle price</span>
                <span>{vehicle.price}0</span> {/* Re-add the 0 since user requested 3499 previously, but screenshot shows 32000 */}
              </div>
              <div className="summary-row highlight">
                <span>Deposit today</span>
                <span>{vehicle.deposit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
