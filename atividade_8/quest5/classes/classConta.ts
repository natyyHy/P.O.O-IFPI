import {Cliente} from "./classCliente"

export class Conta {
    private _numero: string;
    private _saldo: number;
    private _id: number;
    private _cliente: Cliente | null;

    constructor(numero: string, saldo: number, id: number, cliente: Cliente | null = null) {
        this.validaValor(saldo);
        this._numero = numero;
        this._saldo = saldo;
        this._id = id;
        this._cliente = cliente!;
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

    get lerCliente() : Cliente | undefined{
        if(this._cliente != null){
            return this._cliente
        }
    }

    set escreverTitular(novo_titular : Cliente | null) {
        this._cliente = novo_titular;
    }

    set escreverSaldo(novo_saldo : number) {
        this.validaValor(novo_saldo);
        this._saldo = novo_saldo;
    }

    private validaValor(valor: number): void {
        if ( isNaN(valor) || valor <= 0) {
            throw new Error("O valor deve ser maior que zero e em formato valido.");
        }
    }

    public sacar(valor: number): void {

        this.validaValor(valor);
        if(valor > this._saldo){
            throw new Error('Saldo insuficiente: ' + this.lerSaldo)
        }
        this._saldo = this._saldo - valor;
    }

    public depositar(valor: number): void {

        this.validaValor(valor);
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
