import React from 'react';
import IconMaximize from '@/assets/icons/icon-maximize.svg';
import IconMinimize from '@/assets/icons/icon-minimize.svg';
import IconCross from '@/assets/icons/icon-cross.svg';
import windowManagment from "./electronControls";

const Main: React.FC = () => {
  return (
    <div className="wrapper">
      <header>
        <span>AWOOOO</span>
        <nav>
          <ul>
            <li>
              <div id="min-btn">
                <img src={IconMinimize} alt="minimize" />
              </div>
            </li>
            <li>
              <div id="max-btn">
                <img src={IconMaximize} alt="maximize" />
              </div>
            </li>
            <li>
              <div id="close-btn">
                <img src={IconCross} alt="close"  onLoad={windowManagment}/>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Main;
