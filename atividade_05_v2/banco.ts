

import {Cliente} from "./classes"
import { input, print } from "./utils";


export class Conta {
    numero: string;
    saldo: number;
    id: number;
    cliente: Cliente | null;

    constructor(numero: string, saldo: number = 0, id: number, cliente: Cliente | null = null) {
        this.numero = numero;
        this.saldo = saldo;
        this.id = id;
        this.cliente = cliente!;
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo
    }

    transferir(contaDestino: Conta, valor: number): void {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;

        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}


export class Banco {
    contas: Conta[];
    Clientes: Cliente[];

    constructor() {
        this.contas = [];
        this.Clientes = [];
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }

    adicionar_cliente(cliente: Cliente): void{
        this.Clientes.push(cliente);
    }

    adicionar_id_conta() : number {

        let id : number = Number(input("digite o id da conta:"));
        for(let conta of this.contas){
            if(conta.id === id){
                print('Id digitado ja existente, tente novamente...');
                return -1;
            }
        }
        return id;
    }

    adicionar_id_cliente() : number {

        let id : number = Number(input("digite o id do cliente:"));
        for(let conta of this.Clientes){
            if(conta.id === id){
                print('Id digitado ja existente, tente novamente...');
                return -1;
            }
        }
        return id;
    }

    consultar_cliente_cpf(cpf : string) : Cliente | null{
        for(let i = 0; i < this.Clientes.length ; i++){
            if(cpf === this.Clientes[i].cpf){
                return this.Clientes[i];
            }
        }
        return null;
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void {
        const cliente = this.consultar_cliente_cpf(cpfCliente);
        const conta = this.consultar(numeroConta);
    
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
    
        if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }
    
        if (conta.cliente) {
            console.log(`A conta ${numeroConta} já está associada a um cliente.`);
            return;
        }
    
        conta.cliente = cliente;
        cliente.contas.push(conta);
        console.log(`Conta ${numeroConta} associada ao cliente ${cliente.nome} com sucesso.`);
    }
    

    listar_contas_cliente(cpf: string): Conta[] | void{
        const cliente_encontrado = this.consultar_cliente_cpf(cpf);
        if(!cliente_encontrado){
            console.log("cliente com cpf ", cpf , " nao encontrado")
            return;
        }

        return cliente_encontrado.contas;
    }

    totalizar_saldo_cliente(cpf: string): number | void{
        const cliente = this.consultar_cliente_cpf(cpf);
        if(!cliente){
            console.log("cliente nao encontrado")
            return;
        }
        const total = cliente?.contas.reduce((acumulador,saldo) => acumulador + saldo.saldo , 0);
        return total;

    }

    inserir_cliente(Cliente: Cliente) : void {
        for(let cliente of this.Clientes){
            if(Cliente.id === cliente.id || Cliente.cpf === cliente.cpf){
                console.log("cliente ja esta cadastrado");
                return;
            }
        }
        this.Clientes.push(Cliente);
    }

    inserir_conta(Conta: Conta) : void {
        for(let conta of this.contas){
            if(Conta.numero === conta.numero){
                console.log("conta ja esta cadastrado");
                return;
            }
        }
        this.contas.push(Conta);
    }

    //novos metodos

    consultar_indice(numero: string): number{
        let conta_procurada : number = -1;
        for(let i = 0; i < this.contas.length;i++){
            if(this.contas[i].numero === numero){
                conta_procurada = i;
                break;
            }
        }

        return conta_procurada;
    }

    excluir(numero : string): void{
        let conta_indice = this.consultar_indice(numero);

        if(conta_indice != -1){
            for(let i = conta_indice; i < this.contas.length - 1;i++){
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    atualizar(conta_nova : Conta): void {
        let conta_antiga : Conta = this.consultar(conta_nova.numero);
        if(conta_antiga){
            conta_antiga = conta_nova;
        }
    }

    sacar(numero: string, valor: number):void  {
        let conta_procurada : Conta = this.consultar(numero);

        if(conta_procurada.saldo < valor){
            print("saldo insuficiente para saque")
            return;
        }

        conta_procurada.sacar(valor);
        print(`Valor $${valor} sacado na conta ${numero} com sucesso`);
    }

    depositar(valor: number, numero : string) : void {
        let conta_procurada : Conta = this.consultar(numero);
        if(conta_procurada){
            conta_procurada.depositar(valor);
        }
    }

    transferir(banco : Banco,numeroDebito: string,numeroCredito:string, valor: number): void{
        if((this.verificar_conta(banco,numeroDebito)) == 0){
            print('contas nao encontradas ou inexistentes')
            return;
        }

        let conta_debito : Conta = this.consultar(numeroDebito);
        let conta_credito : Conta = this.consultar(numeroCredito);

        if(!conta_debito){
            console.log("conta debito nao encontrada")
            return;
        }

        if(conta_debito.saldo > valor){
            conta_debito.sacar(valor);
            conta_credito.depositar(valor);
            console.log(`Transferencia de R$${valor} realizada com sucesso de ${numeroDebito} para ${numeroCredito}.`);
        }else{
            console.log(`saldo de conta debito insuficiente\nSALDO CONTA DEBITO: ${conta_debito.saldo} < ${valor}`)
            return;
        }
    }

    transferir_contas(numeroDebito: string , contasDestino : {numero: string , valor: number}[]) : void{
        let contaDebito : Conta = this.consultar(numeroDebito);

        if(!contaDebito){
            console.log(`Conta debito numero ${numeroDebito} nao encontrado`)
            return;
        }

        for(const transferir of contasDestino){
            
            const conta_destino : Conta = this.consultar(transferir.numero);

            if(contaDebito.saldo < transferir.valor){
                console.log(`Saldo insuficiente de conta debito saldo: ${contaDebito.saldo} para conta ${conta_destino.numero} de valor ${transferir.valor}.`)
                continue;
            }

            contaDebito.sacar(transferir.valor);
            conta_destino.depositar(transferir.valor);

        }
    }

    total_quantidade_contas() : number{
        let quantidade = 0;
        if(this.contas.length == 0){
            console.log("Nao ha contas no banco");
            return quantidade;
        }
        for(let conta of this.contas){
            if(conta){ quantidade++ };
        }
        return quantidade;
    }

    total_saldo_contas(): number{
        let total = 0;
        if(this.contas.length == 0){
            console.log("Nao ha contas no banco");
            return total;
        }
        for(let conta of this.contas){
            total += conta.saldo;
        }
        return total;
    }

    calcular_media_saldo_contas(): number{
        if((this.total_quantidade_contas()) === 0){
            console.log("nao ha contas no banco")
            return 0;
        }
        let media = (this.total_saldo_contas()) / (this.total_quantidade_contas()); return media;
    }

    verificar_conta(banco : Banco, numero1 : string) : number {
        let i : number = 0;
        for(let conta of banco.contas){
            if(conta.numero === numero1){
                i++;
            }
        }
        return i;
    }
}