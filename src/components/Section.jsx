import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, description, backgroundImg, primaryButton, secondaryButton, textColor = 'dark' }) => {
  return (
    <section 
      className="section" 
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <motion.div 
        className={`section-content ${textColor}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
      </motion.div>

      <motion.div 
        className="section-buttons"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <button className="btn btn-primary">{primaryButton || 'Order Now'}</button>
        {secondaryButton && (
          <button className="btn btn-secondary">{secondaryButton}</button>
        )}
      </motion.div>
    </section>
  );
};

export default Section;
