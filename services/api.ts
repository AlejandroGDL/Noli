import axios from 'axios';
import { TriggerConfig, ActionConfig } from '../stores/ruleStore';

const BASE_URL = 'https://api.ejemplo.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // Aquí se puede agregar token de autenticación
    // const token = await getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface RulePayload {
  nombre: string;
  trigger: TriggerConfig;
  accion: ActionConfig;
}

export async function saveRule(rule: RulePayload): Promise<void> {
  const response = await api.post('/rules', rule);
  return response.data;
}

export default api;
