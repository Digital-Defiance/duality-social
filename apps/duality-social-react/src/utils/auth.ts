import { jwtDecode } from 'jwt-decode';
import { ITokenUser } from '@duality-social/duality-social-lib';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    // Add any additional verification logic if needed
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserDetails = (token: string): ITokenUser | null => {
  try {
    const decoded = jwtDecode<ITokenUser>(token);
    return decoded;
  } catch (error) {
    return null;
  }
};