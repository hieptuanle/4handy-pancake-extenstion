import React from 'react';

export const DateTime: React.FC<{ inpuDate: string }> = ({ inpuDate }) => {
  const date = new Date(inpuDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    <span>
      {day}/{month}/{year} {hours}:{minutes}:{seconds}
    </span>
  );
};
