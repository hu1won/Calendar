import React from "react";

// Header
const Header = ({ category, title }) => {
  return (
    <div style={{ marginBottom: '0' }}>
      {/* Category */}
      <p style={{ 
        color: '#6366f1', 
        fontSize: '11px', 
        margin: 0, 
        marginBottom: '8px', 
        fontWeight: '700', 
        letterSpacing: '0.1em', 
        textTransform: 'uppercase' 
      }}>
        {category}
      </p>
      {/* Title */}
      <p style={{ 
        fontSize: '36px', 
        fontWeight: '800', 
        letterSpacing: '-0.04em', 
        color: '#111827', 
        margin: 0, 
        lineHeight: '1.1',
        background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {title}
      </p>
    </div>
  );
};

export default Header;
