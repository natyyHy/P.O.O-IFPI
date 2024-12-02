
class Conta {
    numero: string;
    saldo: number;
    id: number;
    cliente: cliente;

    constructor(numero: string, saldo: number, id: number , cliente: cliente) {
        this.numero = numero;
        this.saldo = saldo;
        this.id = id;
        this.cliente = cliente;
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

class cliente {
    id : number ;
    nome : string;
    cpf : string ;
    data_nascimento: Date ;
    contas : Conta[];

    constructor(id: number, nome: string , cpf: string , data_nascimento: Date, contas: []){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = contas;
    }

}

class Banco {
    contas: Conta[];
    Clientes: cliente[];

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

    adicionar_cliente(cliente: cliente): void{
        this.Clientes.push(cliente);
    }

    consultar_cliente_cpf(cpf : string) : cliente | null{
        for(let i = 0; i < this.Clientes.length ; i++){
            if(cpf === this.Clientes[i].cpf){
                return this.Clientes[i];
            }
        }
        return null;
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void{
        let cliente_encontrada = this.consultar_cliente_cpf(cpfCliente);

        if(!cliente_encontrada){
            console.log("Cliente com CPF não encontrado");
            return;
        }

        const conta_encontrada = this.consultar(numeroConta);
        if(!conta_encontrada){
            console.log(`Conta com numero ${numeroConta} nao encontrado`);
            return;
        }

        // Verificar se a conta já está associada a outro cliente
        if(conta_encontrada.cliente.id !== cliente_encontrada.id){
            console.log(`A conta ${numeroConta} ja esta associada a um cliente`);
            return;
        }

        // se nao, associar
        conta_encontrada.cliente = cliente_encontrada;
        cliente_encontrada.contas.push(conta_encontrada)
        console.log(`conta ${numeroConta} associada a cliente ${cliente_encontrada.nome}`)
        

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

    inserir_cliente(Cliente: cliente) : void {
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
            if(Conta.id === conta.id || Conta.numero === conta.numero){
                console.log("conta ja esta cadastrado");
                return;
            }
        }
        this.contas.push(Conta);
    }


}

// Criando clientes e contas
const cliente1 : cliente = new cliente(1,'João Silva',"123.456.789-00",new Date ("1990-05-15"),[]);
const cliente2 : cliente = new cliente(2,"Maria Oliveira","987.654.321-00",new Date("1985-09-25"),[]);


const conta1 = new Conta("001", 1000, 1, cliente1);
const conta2 = new Conta("002", 500, 2, cliente2);


cliente1.contas.push(conta1);
cliente2.contas.push(conta2);

// Criando instância do banco e adicionando clientes e contas
const banco = new Banco();
banco.inserir_conta(conta1);
banco.inserir_conta(conta2);
banco.adicionar_cliente(cliente1);
banco.adicionar_cliente(cliente2);


// Testando duplicações e erros
banco.associarContaCliente("001", "987.654.321-00");
banco.associarContaCliente("001", "123.456.789-00");
banco.associarContaCliente("003", "123.456.789-00");
banco.associarContaCliente("001", "111.111.111-11");


//
banco.listar_contas_cliente("987.654.321-00");
banco.listar_contas_cliente("123.456.789-00");

console.log(`total da conta de cliente ${cliente2.nome}: ${banco.totalizar_saldo_cliente('987.654.321-00')}`)


