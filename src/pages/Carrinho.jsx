import { useState } from "react";
import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaTruck, FaTag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";

export default function Carrinho() {
  const { itensCarrinho, atualizarQuantidade, removerDoCarrinho, calcularTotal } = useCarrinho();
  const navigate = useNavigate();
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [cupomInvalido, setCupomInvalido] = useState(false);
  const [descontoCupom] = useState(0.10);
  const [cep, setCep] = useState("");
  
  const calcularSubtotal = () => calcularTotal();
  const calcularDesconto = () => cupomAplicado ? calcularSubtotal() * descontoCupom : 0;
  const calcularTotalComDesconto = () => calcularSubtotal() - calcularDesconto();
  const calcularTotalPix = () => calcularTotalComDesconto() * 0.95;
  const aplicarCupom = () => {
    const cupomValido = "MUITOLEGAL10";
    
    if (cupom.trim().toUpperCase() === cupomValido) {
      setCupomAplicado(true);
      setCupomInvalido(false);
    } else if (cupom.trim()) {
      setCupomInvalido(true);
      setCupomAplicado(false);
    }
  };
  
  const formatarCep = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    const limitado = apenasNumeros.substring(0, 8)
    if (limitado.length > 5) {
      return limitado.substring(0, 5) + '-' + limitado.substring(5);
    }
    
    return limitado;
  };

  const calcularFrete = () => {
    navigate('/manutencao');
  };

  const finalizarCompra = () => {
    navigate('/manutencao');
  };

  return (
    <>
      <Cabecalho />
      
      <main className="min-h-screen container mx-auto px-4 py-8 pt-32">
        {itensCarrinho.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <section className="text-center">
              <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-4">
                Seu carrinho está vazio!
              </h2>
              <p className="text-gray-500 mb-4">
                Procura algum artigo específico?
              </p>
              <p className="text-gray-500 mb-8">
                Confira nosso catálogo!
              </p>
              <Link 
                to="/produtos" 
                className="bg-azul text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 inline-block"
              >
                Catálogo
              </Link>
            </section>
          </div>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <article className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <header className="p-4 md:p-6 border-b">
                <h3 className="text-lg font-semibold">Itens no Carrinho ({itensCarrinho.length})</h3>
              </header>
              
              <ul className="divide-y">
                {itensCarrinho.map(item => (
                  <li key={item.id} className="p-4 md:p-6">
                    {/* Layout mobile - empilhado */}
                    <div className="block sm:hidden">
                      <div className="flex items-start gap-3 mb-3">
                        <img 
                          src={item.imagem} 
                          alt={item.nome}
                          className="w-16 h-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm leading-tight">{item.nome}</h4>
                          <p className="text-verde font-bold text-lg">R$ {item.preco.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removerDoCarrinho(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 shrink-0"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        
                        <span className="w-16 text-center font-semibold text-lg">{item.quantidade}</span>
                        
                        <button 
                          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Layout desktop - horizontal */}
                    <div className="hidden sm:flex items-center gap-4">
                      <img 
                        src={item.imagem} 
                        alt={item.nome}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.nome}</h4>
                        <p className="text-verde font-bold text-lg">R$ {item.preco.toFixed(2)}</p>
                      </div>
                          
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        
                        <span className="w-12 text-center font-semibold">{item.quantidade}</span>
                        
                        <button 
                          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removerDoCarrinho(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
            
            <aside className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4 md:p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold mb-6">Resumo</h3>
              
              <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cupom de Desconto:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={cupom}
                        onChange={(e) => {
                          setCupom(e.target.value.toUpperCase());
                          setCupomInvalido(false);
                        }}
                        placeholder="XXXXXXXXXX"
                        maxLength="12"
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          cupomInvalido 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-azul'
                        }`}
                        disabled={cupomAplicado}
                      />
                      <button
                        type="button"
                        onClick={aplicarCupom}
                        disabled={cupomAplicado || !cupom.trim()}
                        className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        Aplicar
                      </button>
                    </div>
                    {cupomAplicado && (
                      <p className="text-green-600 text-sm mt-2">
                        <FaTag className="inline mr-1" />
                        Cupom aplicado com sucesso! 🎉
                      </p>
                    )}
                    {cupomInvalido && (
                      <p className="text-red-600 text-sm mt-2">
                        Cupom inválido. Tente novamente.
                      </p>
                  )}
                </form>
                
                <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calcular Frete:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(formatarCep(e.target.value))}
                        placeholder="00000-000"
                        maxLength="9"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul"
                      />
                      <button
                        type="button"
                        onClick={calcularFrete}
                        className="bg-azul text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer whitespace-nowrap justify-center"
                      >
                        <FaTruck className="text-sm" />
                        Calcular
                      </button>
                  </div>
                </form>
                
                <section className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Produtos ({itensCarrinho.length} itens)</span>
                      <span>R$ {calcularSubtotal().toFixed(2)}</span>
                    </div>
                    
                    {cupomAplicado && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Desconto (10%)</span>
                        <span>- R$ {calcularDesconto().toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span>Frete:</span>
                      <span className="text-verde">Grátis</span>
                    </div>
                    
                    <hr />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-verde">R$ {calcularTotalComDesconto().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>ou R$ {calcularTotalPix().toFixed(2)} no Pix</span>
                      <span>em até 6x sem juros</span>
                    </div>
                </section>
                
                <button onClick={finalizarCompra} className="w-full bg-verde text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition duration-200 font-semibold cursor-pointer">
                  Finalizar Compra
                </button>
                
                <Link 
                  to="/produtos" 
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg mt-3 hover:bg-gray-50 transition duration-200 font-semibold text-center block"
                >
                  Continuar Comprando
                </Link>
            </aside>
          </section>
        )}
      </main>
      
      <RodaPe />
    </>
  );
}
