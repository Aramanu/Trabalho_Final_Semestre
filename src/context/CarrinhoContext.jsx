import { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itensCarrinho, setItensCarrinho] = useState(() => {
    try {
      const itemsSalvos = localStorage.getItem('carrinho');
      return itemsSalvos ? JSON.parse(itemsSalvos) : [];
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage:', error);
    }
  }, [itensCarrinho]);

  const adicionarAoCarrinho = (produto) => {
    setItensCarrinho(itensAtuais => {
      const itemExistente = itensAtuais.find(item => item.id === produto.id);
      
      if (itemExistente) {
        const novosItens = itensAtuais.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Quantidade atualizada!',
          text: `${produto.nome} - Quantidade: ${itemExistente.quantidade + 1}`,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
        
        return novosItens;
      } else {
        const novoItem = {
          id: produto.id,
          nome: produto.nome,
          preco: produto.valor,
          imagem: produto.imagem,
          quantidade: 1
        };
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Produto adicionado!',
          text: `${produto.nome} foi adicionado ao carrinho`,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
        
        return [...itensAtuais, novoItem];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setItensCarrinho(itensAtuais => 
      itensAtuais.filter(item => item.id !== id)
    );
  };

  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    
    setItensCarrinho(itensAtuais =>
      itensAtuais.map(item =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  const calcularTotal = () => {
    return itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const quantidadeTotal = () => {
    return itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  const value = {
    itensCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    calcularTotal,
    quantidadeTotal
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
}