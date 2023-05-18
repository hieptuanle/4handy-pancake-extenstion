import React from 'react';

export const Price: React.FC<{ value: number }> = ({ value }) => {
  return (
    <span>
      {value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })}
    </span>
  );
};
