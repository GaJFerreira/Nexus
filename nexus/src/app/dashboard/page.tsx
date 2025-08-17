// src/app/dashboard/page.tsx

'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/client';

interface UserProfile {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);


  useEffect(() => {

    if (!isAuthLoading && !user) {
      router.push('/login');
      return;
    }


    if (user) {
      const fetchUserProfile = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
        } else {
          console.error("Não foi encontrado um perfil para este utilizador.");
        }
        setIsProfileLoading(false);
      };

      fetchUserProfile();
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || isProfileLoading || !userProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
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
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
              <span className="text-gray-700">Resumo Rápido</span>
            </div>
            <div className="row-span-2 bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
              <span className="text-gray-700">Lista de Transações Recentes</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
