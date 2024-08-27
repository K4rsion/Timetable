import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  authData: {
    accessToken: string | null;
    role: string | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    role: null,
    isLoading: false,
    error: null,
  },
};

export interface LoginSuccessPayload {
  token: string;
  role: string;
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    loginSuccess: (
      state,
      action: PayloadAction<LoginSuccessPayload>
    ): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload.token,
        role: action.payload.role,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload,
      },
    }),
    logoutSuccess: (): AuthState => initialState,
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  authReducer.actions;

export default authReducer.reducer;

export type RootState = ReturnType<typeof authReducer.reducer>;
