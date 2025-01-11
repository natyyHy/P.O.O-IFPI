import { Calculadora } from "../questao2/classCalculadora";

//a. Implemente um método chamado exponenciar que retorne o primeiro operando elevado ao segundo;

export class CalculadoraCientifica extends Calculadora{
    constructor(op1: number , op2 : number){
        super(op1,op2);
    }
    public exponenciar(){
        return this._operador1**this._operador2
    }
}
