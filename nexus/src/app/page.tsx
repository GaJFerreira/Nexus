import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ,du  justify-center p-24">
      <div className="w-full max-w-md rounded-lg bg-white/50 backdrop-blur-sm p-8 shadow-md text-gray-800 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold">Nexus</h1>
    <p className="mt-2 text-lg text-gray-600">A base está pronta.</p>

    <Link href="/login">
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Acessar Login
      </button>
    </Link>
    </div>
  </main>
  );
}
