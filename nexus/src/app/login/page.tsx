
export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">

            <div className="max-w-md w-full bg-sky-500/50 text-black p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Nexus Login</h1>
                <form className="space-y-6">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium"> Email </label>
                        <input id="email" type="email" required className="peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 hover:border-blue-700 shadow-sm" placeholder="voce@email.com" />
                        </div>

                    <div>
                        <label
                            htmlFor="password" className="block text-sm font-medium"> Senha </label>
                        <input id="password" type="password" required className="peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 hover:border-blue-700 shadow-sm"/>
                    </div>

                    <div>
                        <button type="submit" className="mt-6 px-4 py-2 bg-black text-white rounded border-gray-300 hover:bg-blue-700 shadow-sm">
                            Entrar
                        </button>
                    </div>

                </form>
            </div>

        </main>
    );
}
