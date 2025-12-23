import React from "react";

// Header
const Header = ({ category, title }) => {
  return (
    <div style={{ marginBottom: '0' }}>
      {/* Category */}
      <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0, marginBottom: '6px', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{category}</p>
      {/* Title */}
      <p style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.03em', color: '#111827', margin: 0, lineHeight: '1.2' }}>
        {title}
      </p>
    </div>
  );
};

export default Header;
