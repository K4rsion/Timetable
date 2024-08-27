import { axiosInstance } from '../instance';
import { Endpoints } from '../endpoints';
import { ILoginRequest, ILoginResponse } from './types';
import axios, { AxiosPromise } from 'axios';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const logout = (token: string): AxiosPromise => {
  return axios.get(Endpoints.AUTH.LOGOUT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
