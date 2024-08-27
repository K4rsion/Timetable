//login

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  role: string;
}

export const ROLES = {
  ADMIN: 'admin',
  SCHEDULER: 'scheduler',
};
