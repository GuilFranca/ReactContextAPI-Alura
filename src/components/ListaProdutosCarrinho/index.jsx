import ItemCarrinhoSuspenso from "@/components/CarrinhoSuspenso/ItemCarrinhoSuspenso";
import ItemCarrinho from "@/components/ItemCarrinho";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CarrinhoContext } from "../../context/CarrinhoContext";

const ListaProdutosCarrinho = ({ carrinho }) => {

  const { setCarrinho } = useContext(CarrinhoContext)

  function removerProduto(idProduto) {
    const item = carrinho.find(item => item.id === idProduto);

    if (item.quantidade > 1) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.map((carrinhoItem) =>
          carrinhoItem.id === idProduto ?
            { ...carrinhoItem, quantidade: carrinhoItem.quantidade - 1 }
            : carrinhoItem))
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.filter((carrinhoItem) => carrinhoItem.id !== item.id)
    )
  }

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
            />
          ) : (
            <ItemCarrinhoSuspenso
              key={itemCarrinho.id}
              itemCarrinho={itemCarrinho}
              removerProduto={removerProduto}
            />
          );
        })
      )}
    </ul>
  );
};

export default ListaProdutosCarrinho;
