import { useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho } = useContext(CarrinhoContext);

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

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto
    }
}