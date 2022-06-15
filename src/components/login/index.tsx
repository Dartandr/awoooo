import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import style from './index.module.scss';
import loginIcon from '@/assets/icons/icon-login.svg';

const LoginPage: React.FC = () => {
  const userDispatch = useDispatch<Dispatch>().user;
  const navigate = useNavigate()
  const onLogin = ():void => {
    userDispatch.setUID(1);
    navigate('/profile')
  } 
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
          <div className={style.button} onClick={onLogin}>Let me in!</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
