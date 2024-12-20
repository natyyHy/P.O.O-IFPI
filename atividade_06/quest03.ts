import {Conta, Cliente} from './quest04' ; import {input} from './utils';

export class Banco {
    private contas: Conta[];
    private Clientes: Cliente[];

    constructor() {
        this.contas = [];
        this.Clientes = [];
    }

    get lerContas() : Conta[] {
        return this.contas;
    }

    get lerClientes() : Cliente[] {
        return this.Clientes;
    }


    public consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            let contaNumero : string = conta.lerNumero
            if (contaNumero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }

    public adicionar_cliente(cliente: Cliente): void{
        this.Clientes.push(cliente);
    }

    public adicionar_id_conta() : number {

        let id : number = Number(input("digite o id da conta:"));
        for(let conta of this.contas){
            let idAtual : number = conta.lerId
            if(idAtual === id){
                console.log('Id digitado ja existente, tente novamente...');
                return -1;
            }
        }
        return id;
    }

    public adicionar_id_cliente() : number {

        let id : number = Number(input("digite o id do cliente:"));
        for(let conta of this.Clientes){
            let idAtual : number = conta.lerId
            if(idAtual === id){
                console.log('Id digitado ja existente, tente novamente...');
                return -1;
            }
        }
        return id;
    }

    public consultar_cliente_cpf(cpf : string | undefined) : Cliente | null{
        for(let i = 0; i < this.Clientes.length ; i++){
            const cpfClienteAtual : string = this.Clientes[i].lerCpf;
            if(cpf === cpfClienteAtual){
                return this.Clientes[i];
            }
        }
        return null;
    }

    public desassociarContaCliente(numeroConta : string, cpfCliente: string | undefined) : void {
        let cliente : Cliente | null  = this.consultar_cliente_cpf(cpfCliente);
        let contas : Conta[] = this.lerContas; 
        if(cliente && cliente.lerContas){
            let contas_novas : Conta[] = [];
            for(let i = 0; i < cliente.lerContas.length;i++){
                if(cliente.lerContas[i].lerNumero !== numeroConta){
                    contas_novas.push(cliente.lerContas[i]);
                }
            }

            cliente.escreverContas = contas_novas;
        }
          
    }

    public desassociarClienteConta(cpf: string){
        let cliente : Cliente | null = this.consultar_cliente_cpf(cpf);

        if(cliente?.lerContas){
            for(let conta of cliente.lerContas){
                conta.escreverTitular = null;
            }
        }
    }

    public excluir_cliente(cpf : string) : void {
        let cliente_indice = this.consultar_indice_clientes(cpf);

        if(cliente_indice === -1){
            return;
        }
        
        this.desassociarClienteConta(cpf);
        for(let i = cliente_indice; i < this.Clientes.length - 1;i++){
                this.Clientes[i] = this.Clientes[i + 1];
        }

        this.Clientes.pop();
        
    }

    public excluir_conta(numero : string): void{
        let conta_indice = this.consultar_indice_contas(numero);

        if(conta_indice === -1){
            return;
        }

        //dessacosiar conta do cliente titular
        let conta : Conta = this.consultar(numero);
        if (conta && conta.lerCliente) {
            let cpf: string | undefined = conta.lerCliente.lerCpf;
            this.desassociarContaCliente(numero,cpf);
            
        }

        for(let i = conta_indice; i < this.contas.length - 1;i++){
            this.contas[i] = this.contas[i + 1];
        }
        this.contas.pop();

    }

    public associarContaCliente(numeroConta: string, cpfCliente: string | undefined): void {
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
    
        if (conta.lerCliente) {
            console.log(`A conta ${numeroConta} já está associada a um cliente.`);
            return;
        }
    
        conta.escreverTitular = cliente;
        cliente.lerContas.push(conta);
        console.log(`Conta ${numeroConta} associada ao cliente ${cliente.lerNome} com sucesso.`);
    }
    

    public listar_contas_cliente(cpf: string): Conta[] | void{
        const cliente_encontrado = this.consultar_cliente_cpf(cpf);
        if(!cliente_encontrado){
            console.log("cliente com cpf ", cpf , " nao encontrado")
            return;
        }

        return cliente_encontrado.lerContas;
    }

    public totalizar_saldo_cliente(cpf: string): number | void{
        const cliente = this.consultar_cliente_cpf(cpf);
        if(!cliente){
            console.log("cliente nao encontrado")
            return;
        }
        const total = cliente?.lerContas.reduce((acumulador,saldo) => acumulador + saldo.lerSaldo , 0);
        return total;

    }

    public inserir_cliente(Cliente: Cliente) : void {
        for(let cliente of this.Clientes){
            if(Cliente.lerId === cliente.lerId || Cliente.lerCpf === cliente.lerCpf){
                console.log("cliente ja esta cadastrado");
                return;
            }
        }
        this.Clientes.push(Cliente);
    }

    public inserir_conta(Conta: Conta) : void {
        for(let conta of this.contas){
            if(Conta.lerNumero === conta.lerNumero){
                console.log("conta ja esta cadastrado");
                return;
            }
        }
        this.contas.push(Conta);
    }

    //novos metodos

    private consultar_indice_contas(numero: string): number{
        let conta_procurada : number = -1;
        for(let i = 0; i < this.contas.length;i++){
            if(this.contas[i].lerNumero === numero){
                conta_procurada = i;
                break;
            }
        }

        return conta_procurada;
    }

    private consultar_indice_clientes(cpf: string): number{
        let cliente_encontrado : number = -1;
        for(let i = 0; i < this.Clientes.length;i++){
            if(this.Clientes[i].lerCpf === cpf){
                cliente_encontrado = i;
                break;
            }
        }

        return cliente_encontrado;
    }


    public atualizar(conta_nova : Conta): void {
        let conta_antiga : Conta = this.consultar(conta_nova.lerNumero);
        if(conta_antiga){
            conta_antiga = conta_nova;
        }
    }

    public sacar(numero: string, valor: number):void  {
        let conta_procurada : Conta = this.consultar(numero);

        if(conta_procurada.lerSaldo < valor){
            console.log("saldo insuficiente para saque")
            return;
        }

        conta_procurada.sacar(valor);
        console.log(`Valor $${valor} sacado na conta ${numero} com sucesso`);
    }

    public depositar(valor: number, numero : string) : void {
        let conta_procurada : Conta = this.consultar(numero);
        if(conta_procurada){
            conta_procurada.depositar(valor);
        }
    }

    public transferir(banco : Banco,numeroDebito: string,numeroCredito:string, valor: number): void{
        if((this.verificar_conta(banco,numeroDebito)) == 0){
            console.log('contas nao encontradas ou inexistentes')
            return;
        }

        let conta_debito : Conta = this.consultar(numeroDebito);
        let conta_credito : Conta = this.consultar(numeroCredito);

        if(!conta_debito){
            console.log("conta debito nao encontrada")
            return;
        }

        if(conta_debito.lerSaldo > valor){
            conta_debito.sacar(valor);
            conta_credito.depositar(valor);
            console.log(`Transferencia de R$${valor} realizada com sucesso de ${numeroDebito} para ${numeroCredito}.`);
        }else{
            console.log(`saldo de conta debito insuficiente\nSALDO CONTA DEBITO: ${conta_debito.lerSaldo} < ${valor}`)
            return;
        }
    }

    public efetuar_ordem_bancaria(numeroOrigem: string , contasDestino : {numero: string , valor: number}[]) : void{
        let conta_origem : Conta = this.consultar(numeroOrigem);

        for(const transferir of contasDestino){
            
            const conta_destino : Conta = this.consultar(transferir.numero);
            conta_origem.sacar(transferir.valor);
            conta_destino.depositar(transferir.valor);

        }
    }

    public total_quantidade_contas() : number{
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

    public total_saldo_contas(): number{
        let total = 0;
        if(this.contas.length == 0){
            console.log("Nao ha contas no banco");
            return total;
        }
        for(let conta of this.contas){
            total += conta.lerSaldo;
        }
        return total;
    }

    public calcular_media_saldo_contas(): number{
        if((this.total_quantidade_contas()) === 0){
            console.log("nao ha contas no banco")
            return 0;
        }
        let media = (this.total_saldo_contas()) / (this.total_quantidade_contas()); return media;
    }

    public verificar_conta(banco : Banco, numero1 : string) : number {
        let i : number = 0;
        for(let conta of banco.contas){
            if(conta.lerNumero === numero1){
                i++;
            }
        }
        return i;
    }

    public mudar_titular_conta(numero : string, cliente_novo : Cliente | null) : void {
        let conta : Conta = this.consultar(numero);
        console.log(`Titular antigo da conta ${numero}: ${conta.lerCliente?.lerNome}`);

        let cpf_antigo_titular : string | undefined = conta.lerCliente?.lerCpf
        this.desassociarContaCliente(numero,cpf_antigo_titular);
        cliente_novo?.lerContas.push(conta);

        conta.escreverTitular = cliente_novo
        console.log(`Novo titular da conta ${numero}: ${conta.lerCliente?.lerNome}`);

    }

    public pegar_cpfCliente_conta(conta: Conta): string | undefined {
        if (conta.lerCliente) {
            return conta.lerCliente.lerCpf;
        }
        return undefined;
    }

    public listar_contas_sem_cliente(banco : Banco) : Conta[] {
        let contas_sem_cliente = banco.contas.filter(conta => conta.lerCliente === null);
        return contas_sem_cliente;
    }

    public imprimir_clientes_banco(banco : Banco) : void {
        console.log("\nLista dos clientes")
            for(let cliente of banco.Clientes){
                console.log(`Cliente ${cliente.lerNome} -> cpf: ${cliente.lerCpf}`)
            }
    }

    

}