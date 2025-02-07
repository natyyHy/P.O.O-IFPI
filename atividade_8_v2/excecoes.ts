
class AplicacaoError extends Error {
    constructor(message : string){
        super(message);
    }
}

export class ContaInexistenteError extends AplicacaoError {
    constructor(){
        super('conta inexistente!');
    }
}

export class ClienteNaoEncontradoError extends AplicacaoError {
    constructor(){
        super('cliente nao encontrado!');
    }
}

export class SaldoInsuficienteError extends AplicacaoError {
    constructor(){
        super('saldo insuficiente!');
    }
}

export class ValorInvalidoError extends AplicacaoError {
    constructor(){
        super('valor invalido!');
    }
}

export class NotNumber extends AplicacaoError {
    constructor(){
        super('Valor nao eh um numero!');
    }
}

export class PoupancaInvalidaError extends AplicacaoError {
    constructor(){
        super('Nao eh Conta Poupanca!');
    }
}

export class  CpfInvalidoError extends AplicacaoError {
    constructor(){
        super('Cpf invalido!');
    }
}

export class DateNascimentoInvalidoError extends AplicacaoError {
    constructor(){
        super('Data de nascimento invalido!');
    }
}

export class ContaInvalida extends AplicacaoError {
    constructor(){
        super('Conta nao deve possuir mais de um cliente!');
    }
}

export class ValorVazioError extends AplicacaoError {
    constructor(){
        super('Valor vazio!');
    }
}