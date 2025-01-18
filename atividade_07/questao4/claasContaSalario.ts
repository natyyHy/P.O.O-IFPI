import { Cliente } from "./classCliente";
import { Conta } from "./classConta";

export class ContaSalario extends Conta{

    private _saquesAtinjidos: number = 0;
    private _limiteSaque : number;

    constructor(numero: string, saldo: number = 0, id: number, cliente: Cliente | null,limiteSaq: number) {
        super(numero,saldo,id,cliente);
        this._limiteSaque = limiteSaq;
    }

    get lerSaques() : number {
        return this._saquesAtinjidos;
    }

    get lerLimite() : number {
        return this._limiteSaque;
    }

    set escreverLimiteSaq(s:number){
        this._limiteSaque = s;
    }

    public sacar(valor: number): void {
        if((this.lerSaques) < this._limiteSaque && valor > 0){
            this.sacar(valor);
            this._saquesAtinjidos += 1;
            return;   
        }
        return;
    }

    public resetarLimite(saquesMensais: number): void {
        this._limiteSaque = saquesMensais;
    }
    
}