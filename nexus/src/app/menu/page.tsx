// src/app/dashboard/page.tsx

'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

    
export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Se o utilizador estiver logado, mostramos o conteúdo real do dashboard.
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
    
    
      </main>
    </div>
  );
}
