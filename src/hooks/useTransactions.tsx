import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';



interface Transaction {
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createAt'>
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'createAt'>

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions : Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

// ************ PROVIDER PERSOLALIZADO PARA TODOS ACESAREM OS METODOS DE ACESSO A API
export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    const createTransaction = useCallback(async (transactionInput: TransactionInput) => {

        const response = await api.post('transactions', transactionInput)
        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
    }, [transactions])

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

//**********CRIAÇÂO DO HOOK */

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}