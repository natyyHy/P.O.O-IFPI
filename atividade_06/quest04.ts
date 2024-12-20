
export class Cliente {
    private _id : number ;
    private _nome : string;
    private _cpf : string ;
    private _data_nascimento: string ;
    private _contas : Conta[];

    constructor(id: number, nome: string , cpf: string , data_nascimento: string, contas: []){
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._data_nascimento = data_nascimento;
        this._contas = contas;
    }

    get lerId() : number {
        return this._id
    }

    get lerCpf() : string {
        return this._cpf;
    }

    get lerNome() : string {
        return this._nome;
    }

    get LerDataNascimento() : string {
        return this._data_nascimento;
    }

    get lerContas() : Conta[] {
        return this._contas;
    }

    set escreverContas(contas_novas : Conta[]){
        this._contas = contas_novas;
    }
}


export class Conta {
    private _numero: string;
    private _saldo: number;
    private _id: number;
    private _cliente: Cliente | null;

    constructor(numero: string, saldo: number = 0, id: number, cliente: Cliente | null = null) {
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