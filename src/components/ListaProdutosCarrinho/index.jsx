import ItemCarrinhoSuspenso from "@/components/CarrinhoSuspenso/ItemCarrinhoSuspenso";
import ItemCarrinho from "@/components/ItemCarrinho";
import { useLocation } from "react-router-dom";
import { useCarrinhoContext } from "../../hooks/useCarrinhoContext";

const ListaProdutosCarrinho = () => {
  const {removerProduto, adicionarProduto, removerProdutoCarrinho, carrinho} = useCarrinhoContext();
  const location = useLocation();
  return (
    <ul className="list-unstyled">
      {carrinho.length === 0 ? (
        <p className="text-center my-5">Não há produtos no carrinho</p>
      ) : (
        carrinho.map((itemCarrinho) => {
          return location.pathname === "/carrinho" ? (
            <ItemCarrinho
              key={itemCarrinho.id}
              itemCarrinho={itemCarrinho}
              removerProduto={removerProduto}
              adicionarProduto={adicionarProduto}
              removerProdutoCarrinho={removerProdutoCarrinho}
            />
          ) : (
            <ItemCarrinhoSuspenso
              key={itemCarrinho.id}
              itemCarrinho={itemCarrinho}
              removerProduto={removerProduto}
              adicionarProduto={adicionarProduto}
              removerProdutoCarrinho={removerProdutoCarrinho}
            />
          );
        })
      )}
    </ul>
  );
};

export default ListaProdutosCarrinho;
