'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  provider: 'naver' | 'kakao' | 'google' | 'apple';
  tier: 'FREE' | 'STANDARD' | 'PREMIUM';
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (provider: 'naver' | 'kakao' | 'google' | 'apple') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('namu_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (provider: 'naver' | 'kakao' | 'google' | 'apple') => {
    const mockUsers: Record<string, UserProfile> = {
      naver: {
        id: 'usr-naver-01',
        name: '네이버 김투자',
        email: 'investor@naver.com',
        provider: 'naver',
        tier: 'PREMIUM',
      },
      kakao: {
        id: 'usr-kakao-02',
        name: '카카오 박낙찰',
        email: 'bidder@kakao.com',
        provider: 'kakao',
        tier: 'STANDARD',
      },
      google: {
        id: 'usr-google-03',
        name: '구글 이경매',
        email: 'auction@gmail.com',
        provider: 'google',
        tier: 'PREMIUM',
      },
      apple: {
        id: 'usr-apple-04',
        name: '애플 최자산',
        email: 'asset@icloud.com',
        provider: 'apple',
        tier: 'STANDARD',
      },
    };

    const loggedIn = mockUsers[provider];
    setUser(loggedIn);
    localStorage.setItem('namu_user', JSON.stringify(loggedIn));
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('namu_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
