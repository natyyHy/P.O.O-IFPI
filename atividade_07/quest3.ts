import { Calculadora } from "./quest2";

//a. Implemente um método chamado exponenciar que retorne o primeiro operando elevado ao segundo;

class CalculadoraCientifica extends Calculadora{
    constructor(op1: number , op2 : number){
        super(op1,op2);
    }
    public exponenciar(){
        return this._operador1**this._operador2
    }
}



//b. Teste a classe

let calculadoraBr : CalculadoraCientifica = new CalculadoraCientifica(30,2);
console.log(calculadoraBr.exponenciar());
