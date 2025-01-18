// b. A classe Produto tem atributos privados representando identificador,
//descrição, quantidade de produtos em estoque e valor unitário;

/*c. Produto possui dois métodos para repor e dar baixa. A e ambos somam e
subtraem respectivamente uma quatidade passada por parâmetro do
atributo quantidade;*/

class Produto {
    private _id : string;
    private _descricao : string;
    private _quantidadeEstoque : number;
    private _valorUnitario : number;

    constructor(id: string, descr : string, quant: number, valorUni: number){
        this._id = id;
        this._descricao = descr;
        this._quantidadeEstoque = quant;
        this._valorUnitario = valorUni;
    }

    get lerId(): string{
        return this._id;
    }

    get lerDescr(): string{
        return this._descricao;
    }

    get lerQuant(): number {
        return this._quantidadeEstoque;
    }

    get lerValor(): number {
        return this._valorUnitario; 
    }

    public alterarQuantidade(valor: number) : void {
        const novaQuant = this._quantidadeEstoque + valor;
        if(novaQuant < 0){
            return;
        }
        this._quantidadeEstoque = novaQuant;
    }

    public repor(quant : number) : void {
        if(quant < 0){
            return;
        }
        this.alterarQuantidade(quant);
    }

    public darBaixa(quant : number) : void {
        if(quant < 0){
            return;
        }
        this.alterarQuantidade(-quant);
    }
}