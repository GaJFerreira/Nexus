'use client'

import { use, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { Router, useRouter } from "next/router";

export default function RegisterPage() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try{
            await createUserWithEmailAndPassword(auth, email, password);
            router.push(';menu');
            
        }catch(err){
            console.error("Erro de cadastro: ", err);
            setError("Erro ao fazer cadastro. por favor, tente novamente.");
        }finally{
            setIsLoading(false);
        }

    } 

    return (
<main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white/90 backdrop-blur-sm p-8 shadow-md text-gray-800">
                <h1 className="text-3xl font-bold mb-6 text-center">Cadastro</h1>
               
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium"> Email </label>
                        <input 
                            id="email" 
                            type="email" 
                            required 
                            className="peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:opacity-50" 
                            placeholder="voce@email.com"
                            
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium"> Senha </label>
                        <input 
                            id="password" 
                            type="password" 
                            required 
                            className="peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:opacity-50"
                            placeholder="Minimo de 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
                    )}

                    <div>
                        <button 
                            type="submit" 
                            className="flex w-full justify-center mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Carregando...' : 'Cadastrar'}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
  }
  