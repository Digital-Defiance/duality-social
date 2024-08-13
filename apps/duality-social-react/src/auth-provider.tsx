import {
    ReactNode,
    useCallback,
    createContext,
    useContext,
    useEffect,
    useState,
  } from 'react';
  import { useNavigate } from 'react-router-dom';
  import authService from './services/auth-service';
  import { isAxiosError } from 'axios';
  import { IRequestUser } from '@duality-social/duality-social-lib';
  
  export interface AuthContextData {
    user: IRequestUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (
      identifier: string,
      password: string,
      isEmail: boolean
    ) => Promise<void>;
    logout: () => void;
    changePassword: (
      currentPassword: string,
      newPassword: string
    ) => Promise<{ success: boolean, message: string }>;
    verifyToken: (token: string) => Promise<void>;
    checkAuth: () => void;
    authState: number;
  }
  
  export type AuthProviderProps = {
    children: ReactNode;
  };
  
  export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
  );
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authState, setAuthState] = useState(0);
    const navigate = useNavigate();
  
    const checkAuth = useCallback(async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
  
      try {
        const userData: IRequestUser = await authService.verifyToken(token);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token verification failed:', error);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        checkAuth();
      } else {
        setLoading(false);
      }
    }, [checkAuth, authState]);
  
    const login = async (
      identifier: string,
      password: string,
      isEmail: boolean
    ) => {
      try {
        setLoading(true);
        const { token } = await authService.login(identifier, password, isEmail);
        localStorage.setItem('authToken', token);
        setAuthState((prev) => prev + 1);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };
  
    const logout = useCallback(() => {
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setAuthState((prev) => prev + 1);
      navigate('/');
    }, [navigate]);
  
    const verifyToken = async (token: string) => {
      try {
        await authService.verifyToken(token);
      } catch (error) {
        console.error('Token verification failed:', error);
        setError('Invalid token');
      }
    };
  
    const changePassword = async (
      currentPassword: string,
      newPassword: string
    ): Promise<{success: boolean, message: string }> => {
      try {
        await authService.changePassword(currentPassword, newPassword);
        // Handle success (e.g., show a message)
        return { success: true, message: 'Password changed successfully' };
      } catch (error) {
        // Handle error (e.g., set error state)
        if (isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message ||
              'An error occurred while changing the password'
          );
        } else if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(
            'An unexpected error occurred while changing the password'
          );
        }
      }
    };
  
    return (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            loading,
            error,
            changePassword,
            login,
            logout,
            verifyToken,
            checkAuth,
            authState,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  