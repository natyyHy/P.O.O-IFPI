
function main(){

    let estoqueRcarvalho : Estoque = new Estoque();
    const data: Date = new Date(2025, 0, 18);

    let sabao : Produto = new Produto('1S','sabao azul',30,4.55);
    let biscoito : ProdutoPerecivel = new ProdutoPerecivel('2B','bisc choco',20,5.70,data);
    const dataPassada : Date = new Date(2025,0,10);
    let iogute : ProdutoPerecivel = new ProdutoPerecivel('3I','ior de morango',15,9.90,dataPassada);

    const imprimirquant = (obj : Produto) => console.log(`quantidade atual: ${obj.lerQuant}`)

    //deve repor quantidade
    imprimirquant(sabao)
    sabao.repor(5)
    imprimirquant(sabao)

    //nao deve repor quantidade
    imprimirquant(biscoito)
    biscoito.repor(3);
    imprimirquant(biscoito)

    //deve abaixa quantidade
    imprimirquant(iogute)
    biscoito.darBaixa(4)
    imprimirquant(iogute)

    estoqueRcarvalho.adicionarProduto(sabao)
    estoqueRcarvalho.adicionarProduto(biscoito)
    estoqueRcarvalho.adicionarProduto(iogute)

    estoqueRcarvalho.exibirProdutos()

    //alterar quantidade
    iogute.alterarQuantidade(66);
    imprimirquant(iogute);
}

main();