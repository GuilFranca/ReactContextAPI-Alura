import { useContext } from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const Produtos = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext)

function adicionarProduto(novoProduto) {
  const temOProduto = carrinho.some((itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id);

  console.log(carrinho);

  if (!temOProduto) {
    console.log("Não tem produto");
    // Criamos um novo objeto com quantidade 1, sem modificar o novoProduto original
    return setCarrinho((carrinhoAnterior) => [
      ...carrinhoAnterior,
      { ...novoProduto, quantidade: 1 }
    ]);
  }

  // CORREÇÃO AQUI: Não usamos +=, criamos um objeto novo mapeado
  setCarrinho((carrinhoAnterior) =>
    carrinhoAnterior.map((itemDoCarrinho) =>
      itemDoCarrinho.id === novoProduto.id
        ? { ...itemDoCarrinho, quantidade: itemDoCarrinho.quantidade + 1 }
        : itemDoCarrinho
    )
  );
}


  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
          />
        ))}
      </div>
    </section>
  );
};

export default Produtos;
