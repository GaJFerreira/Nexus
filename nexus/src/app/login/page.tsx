// src/app/login/page.tsx

// Esta é a definição do nosso componente de página de login.
// Tudo que estiver dentro do `return` será renderizado na tela.
export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Nexus Login</h1>
            <form>

                <div>
                    <label htmlFor="Email"> Email </label>
                    <input id="email" name="email" type="email"/>
                </div>

                <div>   
                    <label htmlFor="password"> Senha </label>
                    <input id="password" name="password" type="password"/>    
                </div>

            </form>

        </div>
        
    </main>
  );
}
