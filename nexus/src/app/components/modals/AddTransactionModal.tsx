'use client'

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/lib/firebase/client";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Account{
    id: string;
    name: string;
}

interface AddTransactionModalProps{
    isOpen: boolean;
    onClose: () => void;
    onTransactionAdded: () => void;
    accounts: Account[];
}

export default function AddTransactionModal({ isOpen, onClose, onTransactionAdded, accounts }: AddTransactionModalProps) {
    const {user} = useAuth();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState<'alimentacao' | 'transporte' | 'lazer' | 'moradia' | 'saude' | 'educacao' | 'outros' | 'combustivel'>('outros');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState<'saida' | 'entrada'>('saida');
    const [tipoCobranca, setTipoCobranca] = useState<'credito'| 'debito' | 'pix'>('credito');
    const [parcela, setParcela] = useState<'mensal' | 'unica'>('unica');
    const [data, setData] = useState(new Date().toString().split('T')[0]);
    const [idConta, setIdConta] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        if(!user || !idConta){
            setError("Por favor escolha uma conta.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try{
            const transactionData = {
                userId: user.uid,
                idConta: idConta,
                nome: nome,
                descricao: descricao,
                categoria: categoria,
                valor: parseFloat(valor),
                tipo: tipo,
                tipoCobranca: tipoCobranca,
                parcela: parcela,
                data: data,
                createAt: serverTimestamp(),
            }

            await addDoc(collection(db, 'transactions'), transactionData);

            onTransactionAdded();
            onClose();

        }catch(err){
            console.error("Erro ao adicionar transação: ", err);
            setError("Não foi possível adicionar a transação. Tente novamente.")
        }finally{
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return(

        <main className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"></main>
    );

}