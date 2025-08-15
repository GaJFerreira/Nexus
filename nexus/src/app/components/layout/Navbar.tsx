// src/components/layout/Navbar.tsx

'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { auth } from '@/app/lib/firebase/client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="bg-black shadow-md text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        
        <Link 
          href={user ? "/menu" : "/"} 
          className="text-2xl font-bold text-blue-500 hover:text-blue-400"
        >
          Nexus
        </Link>

        <div className="flex items-center space-x-4">
          {isLoading ? (

            <div className="h-8 w-32 animate-pulse rounded-md bg-gray-700" />
          ) : user ? (

            <>
              <span className="hidden sm:inline">Olá, {user.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Sair
              </button>
            </>
          ) : (

            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Registar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
