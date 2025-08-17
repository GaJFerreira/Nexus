// src/components/modals/AddAccountModal.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Definimos as "props" que o nosso modal vai aceitar
interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountAdded: () => void; // Função para avisar a página que uma nova conta foi adicionada
}

export default function AddAccountModal({ isOpen, onClose, onAccountAdded }: AddAccountModalProps) {
  const { user } = useAuth();

  // Estados para controlar os campos do formulário
  const [name, setName] = useState('');
  const [type, setType] = useState<'checking' | 'savings' | 'credit_card'>('checking');
  const [balance, setBalance] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setError("Você precisa de estar logado para adicionar uma conta.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Adiciona um novo documento à coleção 'accounts'
      await addDoc(collection(db, 'accounts'), {
        userId: user.uid,
        name: name,
        type: type,
        balance: type !== 'credit_card' ? parseFloat(balance) * 100 : 0, // Guardamos em cêntimos
        createdAt: serverTimestamp(),
        // Outros campos como creditLimit podem ser adicionados aqui
      });
      
      onAccountAdded(); // Avisa o componente pai que a lista precisa de ser atualizada
      onClose(); // Fecha o modal
      
    } catch (err) {
      console.error("Erro ao adicionar conta: ", err);
      setError("Não foi possível adicionar a conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // O fundo escuro semi-transparente (overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* O contentor do modal */}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Adicionar Nova Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo Nome da Conta */}
            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Nome da Conta</label>
              <input
                id="accountName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Ex: Conta Corrente Itaú"
              />
            </div>
            {/* Campo Tipo de Conta */}
            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                id="accountType"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="checking">Conta Corrente</option>
                <option value="savings">Poupança / Investimentos</option>
                <option value="credit_card">Cartão de Crédito</option>
              </select>
            </div>
            {/* Campo Saldo Inicial (só aparece para contas, não para cartão de crédito) */}
            {type !== 'credit_card' && (
              <div>
                <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">Saldo Inicial (R$)</label>
                <input
                  id="initialBalance"
                  type="number"
                  step="0.01"
                  required
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="1000.00"
                />
              </div>
            )}
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {/* Botões de Ação */}
          <div className="mt-6 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400">
              {isLoading ? 'A guardar...' : 'Guardar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
