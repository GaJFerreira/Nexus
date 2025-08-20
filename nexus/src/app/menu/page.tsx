// src/app/dashboard/page.tsx

'use client';

import { useCallback, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/client';


interface UserProfile { name: string; email: string; }
interface Account { id: string; name: string; }

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black/30 p-6">

      <div className='mb-6'>
        <h1 className="text-2xl font-bold text-white mb-3">Bem-vindo, {user?.email}</h1>
        <h3 className='text-lg text-white font-bold'>Menu de opções</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="basis-3xs bg-white/80 rounded-lg shadow-md p-6 m-1 flex flex-col justify-center items-center">
          📊 Dashboard
          <button className="w-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors" onClick={() => router.push('/dashboard')}>
            Ir
          </button>
        </div>
        <div className="basis-3xs bg-white/80 rounded-lg shadow-md p-6 m-1 flex flex-col justify-center items-center ">
          ⚙️ Configurações
          <button className="w-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors" onClick={() => router.push('/settings')}>
            Ir
          </button>
        </div>
        <div className="basis-3xs bg-white/80 rounded-lg shadow-md p-6 m-1 flex flex-col justify-center items-center ">
          👤 Perfil
          <button className="w-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors" onClick={() => router.push('/user')}>
            Ir
          </button>
        </div>

        <div className="basis-3xs bg-white/80 rounded-lg shadow-md p-6 m-1 flex flex-col justify-center items-center ">
          Contas
          <button className="w-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors" onClick={() => router.push('/contas')}>
            Ir
          </button>
        </div>

      </div>

    </main>

  );
}
