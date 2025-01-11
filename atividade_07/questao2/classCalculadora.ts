export class Calculadora {
    protected _operador1: number;
    protected _operador2: number;
    
    constructor(op1: number, op2: number){
        this._operador1 = op1;
        this._operador2 = op2;
    }

    somar() : number{
        return this._operador1 + this._operador2;
    }


}