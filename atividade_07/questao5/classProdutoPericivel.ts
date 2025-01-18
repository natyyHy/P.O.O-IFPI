/*ProdutoPerecivel tem as mesmas características de Produto, porém possui
a mais um atributo representando a data da validade
(https://www.javatpoint.com/typescript-date-object). Use herança;*/

/*Um produto perecível possui um método que diz se um produto está válido
ou não comparando sua data de validade com a data atual;
 */

/*Use sobrescrita, ou seja, reescreva os métodos repor e dar baixa para que
não seja possível executar a ação caso o produto não esteja na validade;*/

class ProdutoPerecivel extends Produto{
    private _dataValidade : Date;

    constructor(id: string, descr : string, quant: number, valorUni: number,dataValidade: Date){
        super(id,descr,quant,valorUni)
        this._dataValidade = dataValidade;
    }

    public eh_valid(dataAtual : Date) : boolean {
        if(dataAtual >= this._dataValidade){
            return true;
        }
        return false;
    }

    override repor(quant: number) : void{
        const dataAtual = new Date(); //pega o horario atual do sistema
        if(this.eh_valid(dataAtual)){
            super.repor(quant);
            return;
        }
        return;
    }

    override darBaixa(quant: number): void {
        const dataAtual = new Date()
        if(this.eh_valid(dataAtual)){
            super.repor(quant);
            return;
        }
        return;
    }
}   