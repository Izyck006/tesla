require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

const vehiclesData = [
  { name: 'Tesla Model 3', price: '$34,990', image: '/model3.png', deposit: '$3,500', monthly: '$499/mo', year: '2017', status: 'AVAILABLE', stat1Label: 'RANGE', stat1Value: '363 mi', stat2Label: 'TOP SPEED', stat2Value: '125 mph', stat3Label: 'BATTERY', stat3Value: 'Long Range AWD', subtitle: 'The future of driving, refined.' },
  { name: 'Tesla Model Y', price: '$44,990', image: '/modely.png', deposit: '$4,500', monthly: '$599/mo', year: '2020', status: 'AVAILABLE', stat1Label: 'RANGE', stat1Value: '330 mi', stat2Label: 'TOP SPEED', stat2Value: '135 mph', stat3Label: 'SEATING', stat3Value: '5-7 Seats', subtitle: 'Versatile performance for every journey.' },
  { name: 'Tesla Semi', price: '$150,000', image: '/semi.png', deposit: '$20,000', monthly: '$2,200/mo', year: '2022', status: 'PRE-ORDER', stat1Label: 'RANGE', stat1Value: '500 mi', stat2Label: 'PAYLOAD', stat2Value: '82,000 lbs', stat3Label: '0-60 MPH', stat3Value: '20 s loaded', subtitle: 'Electric trucking. Without compromise.' },
  { name: 'Tesla Cybertruck', price: '$60,990', image: '/cybertruck.png', deposit: '$6,000', monthly: '$899/mo', year: '2023', status: 'LIMITED STOCK', stat1Label: 'RANGE', stat1Value: '340 mi', stat2Label: 'TOWING', stat2Value: '11,000 lbs', stat3Label: 'DRIVE', stat3Value: 'AWD', subtitle: 'Built for any planet.' },
  { name: 'Tesla Roadster (Next Gen)', price: '$200,000', image: '/roadster.png', deposit: '$20,000', monthly: '$2,999/mo', year: '2025', status: 'PRE-ORDER', stat1Label: 'RANGE', stat1Value: '620 mi', stat2Label: 'TOP SPEED', stat2Value: '250+ mph', stat3Label: '0-60 MPH', stat3Value: '1.9 s', subtitle: 'The quickest car in the world.' },
  { name: 'Tesla Model 3 (Preowned)', price: '$14,000', image: '/model3.png', deposit: '$1,400', monthly: '$229/mo', year: '2020', status: 'PREOWNED', stat1Label: 'RANGE', stat1Value: '310 mi', stat2Label: 'MILEAGE', stat2Value: '42,000 mi', stat3Label: 'YEAR', stat3Value: '2020', subtitle: 'Certified preowned. Same thrill, better value.' },
  { name: 'Tesla Model Y (Preowned)', price: '$18,500', image: '/modely.png', deposit: '$1,850', monthly: '$289/mo', year: '2021', status: 'PREOWNED', stat1Label: 'RANGE', stat1Value: '315 mi', stat2Label: 'MILEAGE', stat2Value: '31,000 mi', stat3Label: 'YEAR', stat3Value: '2021', subtitle: 'Family-ready SUV at a preowned price.' },
  { name: 'Tesla Model S (Preowned)', price: '$32,000', image: '/models.png', deposit: '$3,200', monthly: '$459/mo', year: '2019', status: 'PREOWNED', stat1Label: 'RANGE', stat1Value: '370 mi', stat2Label: 'MILEAGE', stat2Value: '55,000 mi', stat3Label: 'YEAR', stat3Value: '2019', subtitle: 'Flagship luxury, preowned pricing.' },
  { name: 'Tesla Model X (Preowned)', price: '$36,000', image: '/modelx.png', deposit: '$3,600', monthly: '$519/mo', year: '2019', status: 'PREOWNED', stat1Label: 'RANGE', stat1Value: '320 mi', stat2Label: 'MILEAGE', stat2Value: '48,000 mi', stat3Label: 'YEAR', stat3Value: '2019', subtitle: 'Falcon wings. Preowned value.' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Vehicle.deleteMany(); // Clear existing inventory
    console.log('Cleared existing inventory');

    await Vehicle.insertMany(vehiclesData);
    console.log('Successfully seeded vehicle inventory!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
