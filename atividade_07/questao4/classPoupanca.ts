
import {Conta} from "../questao4/classConta"
import {Cliente} from "../questao4/classCliente"

export class Poupanca extends Conta {

    private _taxa: number;
    constructor(numero: string, saldo: number, id: number, cliente: Cliente | null,taxa: number){
        super(numero,saldo,id,cliente);
        this._taxa = taxa;
    }

    public renderJuros(){
        let juros: number = this.lerSaldo * (this._taxa / 100);
        this.depositar(juros);
    }

    get lerTaxa() : number {
        return this._taxa
    }
}