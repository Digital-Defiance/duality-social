// src/services/api.ts
import axios from 'axios';
import { environment } from '../environments/environment';

const api = axios.create({
  baseURL: environment.apiUrl,
});

export default api;