export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto p-4 text-center">
        <p>&copy; {currentYear} Nexus. Todos os direitos reservados.</p>
        <p className="text-sm text-gray-400">Desenvolvido por Gaj.</p>
      </div>
    </footer>
  );
}
