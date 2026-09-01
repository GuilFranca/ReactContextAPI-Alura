import { useContext, useEffect, useMemo } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"

export const useCarrinhoContext = () => {
    const {
        carrinho,
        setCarrinho,
        quantidade,
        setQuantidade,
        valorTotal,
        setValorTotal
    } = useContext(CarrinhoContext);

    function adicionarProduto(novoProduto) {
        const temOProduto = carrinho.some((itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id);

        if (!temOProduto) {
            // Criamos um novo objeto com quantidade 1, sem modificar o novoProduto original
            return setCarrinho((carrinhoAnterior) => [
                ...carrinhoAnterior,
                { ...novoProduto, quantidade: 1 }
            ]);
        }

        // Não usamos +=, criamos um objeto novo mapeado
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

    function removerProdutoCarrinho(idProduto) {
        const item = carrinho.find(item => item.id === idProduto);

        setCarrinho((carrinhoAnterior) =>
            carrinhoAnterior.filter((carrinhoItem) => carrinhoItem.id !== item.id)
        )
    }


    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
        }),
            {
                quantidadeTemp: 0,
                totalTemp: 0
            }
        );
    }, [carrinho])


    useEffect(() => {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp)
    })

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade
    }
}