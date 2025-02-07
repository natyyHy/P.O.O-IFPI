import {Cliente} from "./classCliente"
import { ValorInvalidoError } from "./excecoes";

export class Conta {
    private _numero: string;
    private _saldo: number = 0;
    private _id: number;
    private _cliente!: Cliente;

    constructor(numero: string, saldo: number, id: number, cliente: Cliente | null = null) {
        this._numero = numero;
        this._id = id;
        this._cliente = cliente!;
        this.depositar(saldo)
    }

    get lerNumero() : string {
        return this._numero
    }

    get lerSaldo() : number {
        return this._saldo
    }

    get lerId() : number {
        return this._id
    }

    get lerCliente() : Cliente {
        return this._cliente;
    }

    set escreverTitular(novo_titular : Cliente) {
        this._cliente = novo_titular;
    }

    set escreverSaldo(novo_saldo : number) {
        this._saldo = novo_saldo;
    }

    public sacar(valor: number): void {
        this._saldo = this._saldo - valor;
    }

    public depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    public consultarSaldo(): number {
        return this._saldo
    }

    public transferir(contaDestino: Conta, valor: number): void {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;

        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}

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


export class ContaPoupanca extends Conta {

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

export class ContaImposto extends Conta {
    private _taxaDeImposto: number = 0.38/100;

    public sacar(valor: number): void {
        let imposto: number = valor * this._taxaDeImposto;
        let totalSaque: number = valor + imposto;
        super.sacar(totalSaque);
    }

    get lerTaxaImposto() : number{
        return this._taxaDeImposto;
    }
}