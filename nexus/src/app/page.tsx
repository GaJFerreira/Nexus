export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl bg-white/90 backdrop-blur-sm shadow-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Projeto Nexus</h1>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-700 font-medium">Bem-vindo ao projeto Nexus!</p>
          <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
            Aqui você pode ter controle total dos seus gastos pessoais e descobrir exatamente para onde está indo seu
            dinheiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-800">Controle Total</h3>
            <p className="text-sm text-gray-600">Gerencie todos os seus gastos</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800">Relatórios</h3>
            <p className="text-sm text-gray-600">Visualize seus dados</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800">Metas</h3>
            <p className="text-sm text-gray-600">Alcance seus objetivos</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Começar Agora
          </button>
          <p className="text-sm text-gray-500">Organize suas finanças de forma simples e eficiente</p>
        </div>
      </div>
    </main>
  )
}
