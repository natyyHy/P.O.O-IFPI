class situacaoFinanceira {
    valorCreditos: number;
    valorDebitos: number;

    constructor(valorCreditos: number , valorDebitos: number){
        this.valorCreditos = valorCreditos;
        this.valorDebitos = valorDebitos;
    }

    calcularSaldor(): number{
        return this.valorCreditos - this.valorDebitos   
    }
}

const situacao_financeira = new situacaoFinanceira(1300,1040)

console.log(situacao_financeira.calcularSaldor())
