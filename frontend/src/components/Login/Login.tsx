import React, { FormEvent, useState } from 'react';
import { loginUser } from '../../store/auth/actionCreators';
import { useAppDispatch } from '../../store';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginUser({ username: login, password }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            name="login"
            type="text"
            className="border-black border-2 ml-2"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
        </div>
        <div className="pt-2">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            className="border-black border-2 ml-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
