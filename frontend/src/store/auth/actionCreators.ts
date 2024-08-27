import { ILoginRequest } from '../../api/auth/types';
import { Dispatch } from 'react';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  LoginSuccessPayload,
  logoutSuccess,
  RootState,
} from './authReducer';
import { api } from '../../api';
import customHistory from '../../utils/history';
import { Action, createSelector } from '@reduxjs/toolkit';

export const selectAccessToken = createSelector(
  (state: RootState) => state.authData.accessToken,
  (accessToken) => accessToken
);

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      const payload: LoginSuccessPayload = {
        token: res.data.token,
        role: res.data.role,
      };

      dispatch(loginSuccess(payload));
      // dispatch(getProfile())
    } catch (e: any) {
      console.error(e);

      dispatch(loginFailure(e.message));
    }
  };

export const logoutUser =
  (token: string) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      await api.auth.logout(token);

      dispatch(logoutSuccess());

      customHistory.push('/');
    } catch (e) {
      console.error(e);
    }
  };
