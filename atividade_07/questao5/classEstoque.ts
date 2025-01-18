class Estoque {
    private _produtos: Produto[] = [];


    public adicionarProduto(p: Produto){
        this._produtos.push(p);
    }

    public exibirProdutos(): void {
        for(let p of this._produtos){
            console.log(`id: ${p.lerId}`)
            console.log(`descricao: ${p.lerDescr}`)
            console.log(`quantidaes: ${p.lerQuant}`)
            console.log(`preco unidade: ${p.lerValor}`)
            console.log(`\n`)

        }
    }
}