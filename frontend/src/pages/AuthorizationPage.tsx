import React from 'react';

import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../store';
import { logoutUser } from '../store/auth/actionCreators';
import { Login } from '../components/Login/Login';

export const AuthorizationPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useSelector(
    (state: IRootState) => state.auth.authData.accessToken
  );

  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const renderProfile = () => (
    <div>
      <div>Вы успушно авторизовались</div>
      <button onClick={() => token !== null && dispatch(logoutUser(token))}>
        Logout
      </button>
    </div>
  );

  return (
    <div>
      Main
      {isLoggedIn ? renderProfile() : <Login />}
    </div>
  );
};
