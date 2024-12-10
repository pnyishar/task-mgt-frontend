import React from 'react';

function CustomIcon({ icon, title, className, onClick }) {
  return (
    <img src={icon} alt={title} className={`${className}`} onClick={onClick} />
  );
}

export default CustomIcon;
