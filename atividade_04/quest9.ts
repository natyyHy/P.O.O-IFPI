class conta {
    numero: String;
    saldo: number;
    constructor(numero: String, saldo: number) {
    this.numero = numero;
    this.saldo = saldo;
    }

    sacar(valor: number): boolean{
        let cop = this.saldo - valor;
        if(cop < 0){
            return false;
        }
        this.saldo = this.saldo - valor;
        return true;
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(contaDestino: conta, valor: number): boolean {
        if(this.sacar(valor)){
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }
}

let C1 : conta = new conta('1',100)
let C2 : conta = new conta('2',100)

console.log('conta 1: '+ C1.consultarSaldo())
console.log('conta 2: '+ C2.consultarSaldo())

console.log('PODE SACAR CONTA 1? '+ C1.sacar(100))
console.log('conta 1: '+ C1.consultarSaldo())
console.log('PODE TRANSFERIR DA CONTA 1? ' + C1.transferir(C2,20))
console.log('conta 2: '+ C2.consultarSaldo())
console.log('conta 1: '+ C1.consultarSaldo())