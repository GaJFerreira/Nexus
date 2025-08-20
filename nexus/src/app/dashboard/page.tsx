// src/app/dashboard/page.tsx

'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/client';
import AddTransactionModal from '@/app/components/modals/AddTransactionModal';

// Interfaces para definir a "forma" dos nossos dados
interface UserProfile {
  name: string;
  email: string;
}
interface Account {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  // Estados para guardar os dados e controlar a UI
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]); // Estado para guardar as contas
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // CORREÇÃO 1: O estado do modal agora é um booleano
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar todos os dados necessários (perfil e contas)
  const fetchData = useCallback(async () => {
    if (!user) return;
    setIsDataLoading(true);
    try {
      // Buscar o perfil do utilizador
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data() as UserProfile);
      }

      // CORREÇÃO 2: Buscar as contas do utilizador
      const accountsQuery = query(collection(db, "accounts"), where("userId", "==", user.uid));
      const accountsSnapshot = await getDocs(accountsQuery);
      const userAccounts = accountsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name as string }));
      setAccounts(userAccounts);

    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    } finally {
      setIsDataLoading(false);
    }
  }, [user]);

  // Efeito para segurança e busca inicial de dados
  useEffect(() => {
    if (!isAuthLoading) {
      if (user) {
        fetchData();
      } else {
        router.push('/login');
      }
    }
  }, [user, isAuthLoading, router, fetchData]);

  // Tela de carregamento
  if (isAuthLoading || isDataLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-black/50 p-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-6">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center items-center">
                <span className="text-lg font-semibold text-gray-700">Saldo</span>
                <span className="text-3xl font-bold text-green-700 mt-2">R$ 1.234,56</span>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center items-center ">
                <span className="text-lg font-semibold text-gray-700">Entradas</span>
                <span className="text-3xl font-bold text-blue-600 mt-2">R$ 5.000,00</span>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center items-center">
                <span className="text-lg font-semibold text-gray-700">Saídas</span>
                <span className="text-3xl font-bold text-red-600 mt-2">R$ 3.765,44</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-rows-3 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
                <span className="text-gray-700 font-semibold">Resumo Rápido</span>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-transform hover:scale-105"
                  onClick={() => setIsModalOpen(true)}
                >
                  ➕ Nova Transação
                </button>
              </div>
              <div className="row-span-2 bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800">Transações Recentes</h3>
                <p className="text-gray-500 mt-4">Em breve, as suas transações aparecerão aqui...</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* O modal é renderizado aqui, fora do layout principal, para garantir que ele apareça por cima de tudo */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // CORREÇÃO 3: A função agora recarrega os dados
        onTransactionAdded={fetchData} 
        accounts={accounts} // Passa a lista de contas buscada
      />
    </>
  );
}
