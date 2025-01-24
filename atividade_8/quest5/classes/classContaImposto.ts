import {Conta} from "./classConta"

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