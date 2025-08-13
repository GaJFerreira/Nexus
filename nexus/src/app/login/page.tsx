'use client'

import { useState } from "react";

export default function LoginPage() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{  
        event.preventDefault();   
       
        console.log('Dados do formulario:', {email, password}); 
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-md rounded-lg bg-gray-400 p-8 shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Nexus Login</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
                        <input 
                            id="email" 
                            type="email" 
                            required 
                            className="peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-700" 
                            placeholder="voce@email.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Senha </label>
                        <input 
                            id="password" 
                            type="password" 
                            required 
                            className="peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-700" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <div>

                        <button 
                            type="submit" 
                            className="flex w-full justify-center mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}