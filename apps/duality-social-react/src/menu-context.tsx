import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-provider';

export type CommentMenuOption = {
  label: string;
  action: () => void;
  isGlobal?: boolean;
};

interface MenuProviderProps {
  children: React.ReactNode;
}

interface MenuContextType {
  commentOptions: CommentMenuOption[];
  addCommentOptions: (newOptions: CommentMenuOption[]) => void;
  setContextOptions: (newOptions: CommentMenuOption[]) => void;
  resetToGlobalOptions: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const initialCommentOptions: CommentMenuOption[] = [
    {
      label: 'New Debate',
      action: () => navigate('/new-debate'),
      isGlobal: true,
    },
  ];
  
  const [globalOptions, setGlobalOptions] = useState<CommentMenuOption[]>(initialCommentOptions);
  const [contextOptions, setContextOptions] = useState<CommentMenuOption[]>([]);

  const addCommentOptions = useCallback((newOptions: CommentMenuOption[]) => {
    setGlobalOptions((prevOptions) => [
      ...prevOptions,
      ...newOptions.filter((o) => o.isGlobal),
    ]);
    setContextOptions(newOptions);
  }, []);

  const resetToGlobalOptions = useCallback(() => {
    setContextOptions([]);
  }, []);

  const commentOptions = [...globalOptions, ...contextOptions];

  return (
    <MenuContext.Provider
      value={{
        commentOptions,
        addCommentOptions,
        setContextOptions,
        resetToGlobalOptions,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};