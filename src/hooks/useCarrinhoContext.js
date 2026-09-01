import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";
import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_QUANTIDADE } from "../Reduces/carrinhoReducer";

const addProdutoAction = (novoProduto) => ({
    type: ADD_PRODUTO,
    payload: novoProduto,
});

const removerProdutoAction = (produtoId) => ({
    type: REMOVE_PRODUTO,
    payload: produtoId
});

const updateQuantidadeAction = (produtoId, quantidade) => ({
    type: UPDATE_QUANTIDADE,
    payload: { produtoId, quantidade },
});

export const useCarrinhoContext = () => {
    const {
        carrinho,
        quantidade,
        valorTotal,
        dispatch
    } = useContext(CarrinhoContext);

    function adicionarProduto(novoProduto) {
        dispatch(addProdutoAction(novoProduto));
    }

    function removerProduto(produtoId) {
        const produto = carrinho.find((item) => item.id === produtoId);

        if (produto && produto.quantidade > 1) {
            dispatch(updateQuantidadeAction(produtoId, produto.quantidade - 1));
        } else {
            dispatch(removerProdutoAction(produtoId))
        }
    }

    function removerProdutoCarrinho(idProduto) {
        dispatch(removerProdutoAction(idProduto))
    }

    return {
        carrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade
    }
}