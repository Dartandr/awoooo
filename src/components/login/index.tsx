import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './index.module.scss';
import loginIcon from '@/assets/icons/icon-login.svg';

const LoginPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.login}>
        <img src={loginIcon} alt="" />
        <div className={style.loginActions}>
          <div className={style.label}>Email or login</div>
          <input
            type="text"
            className={style.textInput}
            style={{ marginBottom: 17 }}
          />
          <div className={style.label}>Password</div>
          <input type="password" className={style.textInput} />
          <div className={style.links}>
            <div className={style.link}>Forgot your password?</div>
            <div className={style.link}>{`Don't have an account?`}</div>
          </div>
          <NavLink to="/profile">
            <div className={style.button}>Let me in!</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
