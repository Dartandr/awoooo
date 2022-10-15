import React from 'react';

interface IProps {
  color: string;
}

const CrossIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 1L1 10M1 1L10 10" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default CrossIcon
