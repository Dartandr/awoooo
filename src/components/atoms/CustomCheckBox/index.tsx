import React from 'react';

interface IProps {
  label: string
  status?: 'included' | 'discluded'
}

const CustomCheckbox: React.FC<IProps> = ({label, status}) => {
  return (
    <div className={`custom-checkbox ${status ? status : '' }`}>
      <div className='custom-checkbox-dot'/>
      <div className='custom-checkbox-label'>{label}</div>
    </div>
  );
};

export default CustomCheckbox