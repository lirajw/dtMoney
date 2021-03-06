import { FormEvent, useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }:NewTransactionModalProps) {
    const {createTransaction} = useTransactions()

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const[type, setType] = useState('deposit')

    const handleCreateNewTransaction = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        await createTransaction({
          title,
          amount: value,
          category,
          type
        });
       
        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');

        onRequestClose();

    }, [createTransaction, title, value, category, type, onRequestClose]);

    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button 
              type="button"
              onClick={onRequestClose}
              className="react-modal-close"
            >

                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>

            <input
              placeholder="Título"
              value={title}
              onChange={event => setTitle(event.target.value)}/>

            <input
              type ="number"
              placeholder="Valor"
              value={value}
              onChange={event => setValue(Number(event.target.value))}
              />

            <TransactionTypeContainer>
                <RadioBox 
                  type="button" 
                  onClick={() => {setType('deposit')}}
                  isActive={type === 'deposit'}
                  activeColor="green"
                > 
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox 
                  type="button" 
                  onClick={() => {setType('withdrawn')}}
                  isActive={type === 'withdrawn'}
                  activeColor="red"
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>
            
            <input
              placeholder="Categoria"
              value={category}
              onChange={event => setCategory(event.target.value)}
              />

            <button type="submit">
                Salvar
            </button>
              
            </Container>
            
        </Modal>
    )
}