// src/context/AuthContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase/client';

// 1. Definir a "forma" dos dados que o nosso contexto vai guardar
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

// 2. Criar o Contexto com um valor inicial
const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  isLoading: true 
});

// 3. Criar o "Provedor" - o componente que vai envolver a nossa aplicação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged é o "vigia" do Firebase. Ele executa uma função
    // sempre que o estado de autenticação muda (login, logout).
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Limpa o "vigia" quando o componente é desmontado para evitar fugas de memória
    return () => unsubscribe();
  }, []);

  const value = { user, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Criar um "Gancho" personalizado para facilitar o uso do nosso contexto
export function useAuth() {
  return useContext(AuthContext);
}
