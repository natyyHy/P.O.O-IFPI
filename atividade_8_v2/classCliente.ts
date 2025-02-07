import {Conta} from "./classConta"
import { CpfInvalidoError, DateNascimentoInvalidoError } from "./excecoes";

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

    // 7 -QUESTAO -------------------------------------------------------

    private validaCPF(cpf: string): void {
        const CPF = /^\d{1}\.\d{1}\.\d{1}\-\d{2}$/;
        if (!CPF.test(cpf)) {
            throw new CpfInvalidoError();
        }
    }

    private validaDataNascimento(data: Date): void {
        let DATA = data.getTime()
        if (isNaN(DATA)) {
            throw new DateNascimentoInvalidoError();
        }
    }

    // --------------------------------------------------------------------
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