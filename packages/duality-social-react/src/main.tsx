import React from 'react';
import * as ReactDOM from 'react-dom/client';
import axios from "axios";

import App from './app/app';
import UserService from './services/user.service';

// HTTP
const _axios = axios.create();
_axios.interceptors.request.use(async (config) => {
  if (UserService.isLoggedIn()) {
    try {
      await UserService.updateToken(() => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return Promise.resolve(config);
      });
    } catch (e) {
      console.error(e);
      UserService.doLogin();
    }
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const renderApp = () => root.render(<App />);

UserService.initKeycloak(renderApp);