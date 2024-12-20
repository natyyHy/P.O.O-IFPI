
class Calculadora{
    private operador1 : number; //modificadores de acesso private
    private operador2 : number;

    constructor(operador1: number , operador2: number){
        this.operador1 = operador1;
        this.operador2 = operador2;
    }

    public soma() : number{
        return this.operador1 + this.operador2;
    }

    public subtrair() : number {
        return this.operador1 - this.operador2;
    }
}

//Teste a classe calculadora e seus métodos.

let calculadora : Calculadora = new Calculadora(10,5);

console.log(calculadora.soma());
console.log(calculadora.subtrair());

//Tente acessar os atributos diretamente e verifique o que acontece.
    /*
        calculadora.  <--- os atributos tornam inacessiveis por conta do modificador de acesso private
    */