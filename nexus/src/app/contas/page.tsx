// src/app/contas/page.tsx

'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { PlusCircle, Banknote, Landmark, CreditCard } from 'lucide-react';
import AddAccountModal from '@/app/components/modals/AddAccountModal';
import { db } from '@/app/lib/firebase/client';
import { collection, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore';

// Definimos a "forma" de um objeto de Conta, com base na nossa documentação
interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit_card';
  balance: number; // Em cêntimos
  createdAt: Timestamp;
}

export default function ContasPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Função para buscar as contas do utilizador no Firestore
  const fetchAccounts = useCallback(async () => {
    if (!user) return;
    setIsDataLoading(true);
    try {
      // 1. Criar a consulta: na coleção 'accounts', encontre os documentos
      // onde 'userId' é igual ao uid do nosso utilizador.
      const q = query(
        collection(db, "accounts"), 
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc") // Ordenar pelas mais recentes primeiro
      );
      
      // 2. Executar a consulta
      const querySnapshot = await getDocs(q);
      
      // 3. Mapear os resultados para o nosso formato de 'Account'
      const userAccounts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Account));
      
      setAccounts(userAccounts);
    } catch (error) {
      console.error("Erro ao buscar contas: ", error);
    } finally {
      setIsDataLoading(false);
    }
  }, [user]);

  // Busca as contas quando a página carrega
  useEffect(() => {
    if (!isAuthLoading && user) {
      fetchAccounts();
    }
  }, [user, isAuthLoading, fetchAccounts]);

  // Segurança da Rota
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  // A função que é chamada pelo Modal após uma nova conta ser adicionada
  const handleAccountAdded = () => {
    fetchAccounts(); // Simplesmente busca a lista de contas novamente
  };

  // Funções auxiliares para formatação e ícones
  const formatCurrency = (valueInCents: number) => (valueInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const getAccountIcon = (type: Account['type']) => {
    const iconProps = { size: 24, className: "mr-4" };
    switch (type) {
      case 'checking': return <Landmark {...iconProps} color="#3b82f6" />;
      case 'savings': return <Banknote {...iconProps} color="#22c55e" />;
      case 'credit_card': return <CreditCard {...iconProps} color="#f97316" />;
    }
  };

  if (isAuthLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Minhas Contas
            </h1>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <PlusCircle size={18} />
              <span>Adicionar Conta</span>
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contas Registadas</h3>
            {isDataLoading ? (
              <p>A carregar contas...</p>
            ) : accounts.length > 0 ? (
              <div className="space-y-4">
                {/* 4. Mapear e renderizar cada conta */}
                {accounts.map(account => (
                  <div key={account.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center">
                      {getAccountIcon(account.type)}
                      <div>
                        <p className="font-semibold text-gray-800">{account.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{account.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    {account.type !== 'credit_card' && (
                      <p className="font-semibold text-lg text-gray-900">{formatCurrency(account.balance)}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                Você ainda não registou nenhuma conta. Clique em "Adicionar Conta" para começar.
              </p>
            )}
          </div>
        </main>
      </div>

      <AddAccountModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccountAdded={handleAccountAdded}
      />
    </>
  );
}
