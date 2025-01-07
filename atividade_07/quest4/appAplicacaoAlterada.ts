import { input, print } from "../utils"
import {Conta,Banco, Poupanca} from "./quest_A"
import { Cliente } from "./quest_A";

let banco : Banco = new Banco();
let opcao : string | null= '';

do {
    print('\nBem vindo\nDigite uma opção:'); 
    print('Contas:\n')
    print('1 - Inserir conta      2 - Consultar conta   3 - Sacar\n' + 
            '4 - Depositar     5 - Excluir conta     6 - Transferir\n' + 
      '7 – Totalizações   8 - Atualizar    9 - efetuar ordem bancaria\n')
    print('Clientes:\n'); 
    print('10 - Inserir cliente      11 - Consultar cliente por cpf    12 - Associar Conta a cliente   13 - Listar contas do cliente\n')
    print('14 - Total saldo cliente   15 - Mudar o titular da conta      16 - Excluir cliente\n')
    print('17 - Atribuir titular a contas sem cliente    18 - Render Juros\n')

    print('0 - Sair\n');
    opcao = input("opcao:")
        
        switch (opcao) {
            case '1':
                inserir();
                break;
            
            case '2':
                consultar();
                break;


            case '3':
                sacar();
                break;

            case '4':
                depositar();
                break;
            
            case '5':
                excluir_conta();
                break;

            case '6':
                transferir();
                break;
            
            case '7':
                totalizacao();
                break;

            case '8':
                atualizar();
                break;

            case '9':
                efetuar_ordem_bancaria();
                break;

            case '10':
                inserir_cliente();
                break;

            case '11':
                consultar_cliente();
                break;

            case '12':
                associar_cliente_conta();
                break;

            case '13':
                listar_contas_cliente();
                break;

            case '14':
                total_saldo_cliente();
                break;

            case '15':
                mudar_titular_conta();
                break;

            case '16':
                excluir_cliente();
                break;

            case '17':
                atribuir_titular_contasSemCliente();
                break;

            case '18':
                renderJuros();
                break;
                
            default:
                break;
        }

}while(opcao != '0');

print("Programa encerrando...")

function renderJuros() {
    print('\n --- RenderJuros ---')
    let numeroContaPou: string = input('digite o numero da conta poupanca que deseja: ');
    banco.renderJuros(numeroContaPou);
    print('--- render juros executado com sucesso ---')

}

function exibir_conta(numero : string ) : void {
    let conta : Conta = banco.consultar(numero);
    if(!conta){
        return;

    }

    print(`\n=== conta ===`)
    print(`id - ${conta.lerId}`)
    print(`numero - ${conta.lerNumero}`)
    print(`saldo - ${conta.lerSaldo}$`)
    let resposta : string | undefined = (conta.lerCliente === null) ? 'nenhum titular' : conta.lerCliente?.lerNome
    print(`cliente - ${resposta}`)
}

function inserir() : void {
    print("\n Cadastrar Conta");
    print('1 - inserir conta normal   2 - inserir conta Poupanca')
    let opcao : number = Number(input('digite a opcao: '));
    print('--- opcao selecionada ---');
    let numero : string = input("digite o numero da conta:");
    let id_disponivel : number  = banco.adicionar_id_conta();
    while(id_disponivel == -1){
        id_disponivel = banco.adicionar_id_conta();
    }
    let conta_com_id : Conta;

    if(opcao === 2){
        let taxa : number = Number(input(`digite a taxa de juros que deseja para conta poupanca ${numero}: `));
        conta_com_id = new Poupanca(numero,0,id_disponivel,null,taxa);
    }else{
        conta_com_id = new Conta(numero,0,id_disponivel,null)
    }

    let saldo_inicial : number = parseFloat(input('Saldo inicial da conta '+ numero + ":"));
    conta_com_id.escreverSaldo = saldo_inicial;
    banco.inserir_conta(conta_com_id);
    print(`conta cadastrada com sucesso!\n`);
}

function consultar() : void {
    print(`\n Consultar Conta`);
    let numero : string = input('digite o numero da conta:');

    let i : number = 0;
    for(let conta of banco.lerContas){
        if(conta.lerNumero === numero){
            i = 1
            break;
        }
    }
    if(i === 0){
        print("Conta nao encontrada ou inexistente");
        return;
    }

    let conta_consultada : Conta = banco.consultar(numero);
    print(`\nNUMERO DA CONTA: ${conta_consultada.lerNumero}`);
    print(`SALDO DA CONTA: $${conta_consultada.lerSaldo}`);
    print(`ID DA CONTA: ${conta_consultada.lerId}`);
    if(conta_consultada instanceof Poupanca){
        print(`TIPO: POUPANCA`);
        print(`TAXA DE JUROS: ${conta_consultada.lerTaxa}%`);
    }else{
        print('TIPO: NORMAL');
    }
    let resposta : string | undefined = (conta_consultada.lerCliente === null) ? 'nenhum cliente associado a conta' : conta_consultada.lerCliente?.lerNome;
    print(`TITULAR(cliente): ${resposta}\n`);
}

function sacar(): void {
    print("\n Sacar na Conta");
    let numero : string = input("digite o numero da conta:");
    let valor_sacado : number = Number(input('digite o valor a ser sacado:'));

    banco.sacar(numero,valor_sacado);
    
}

function depositar() : void {
    print("\n Depositar na Conta");
    let valor_deposito : number = Number(input('digite o valor a ser depositado:'));
    let numero : string = input('digite o numero da conta:');

    banco.depositar(valor_deposito,numero);
    print(`valor $${valor_deposito} depositado a conta ${numero} com sucesso\n`);
}

function excluir_conta() : void {
    print("\n Excluir Conta");
    let numero : string = input("digite o numero da conta:");

    banco.excluir_conta(numero);
    
    print(`Conta ${numero} excluida com sucesso`);

}

function excluir_cliente() : void {
    print(`\n Excluir Cliente`);
    for(let cliente of banco.lerClientes){
        print(`cliente ${cliente.lerNome} | cpf: ${cliente.lerCpf}`)
    }
    let cpf : string = input('digite o cpf do cliente que deseja excluir:')

    banco.excluir_cliente(cpf);
    print(`cliente ${cpf} removido com sucesso`);

}

function transferir() : void {
    print("\n Transferencia na Conta");

    let numero_origem : string;
    let numero_destino : string;
    let valor : number;
    
    numero_origem = input('digite o numero da conta origem:');
    numero_destino = input('digite o numero da conta destino:')
    valor = Number(input('digite o valor da transferencia:'));

    banco.transferir(banco,numero_origem,numero_destino,valor);
}

function totalizacao() : void {
    print('\nTotalizacao Contas')

    print('1 - Total quantidade contas    2 - Total Saldo das Contas   3 - Media Saldo Contas')
    let opcao = input('opcao:');

    switch (opcao) {
        case '1':
            let qtd : number = banco.total_quantidade_contas()
            print(`>>> ${qtd} CONTAS NO BANCO <<<`);
            break;
    
        case '2':
            let total_saldo_contas = banco.total_saldo_contas();
            print(`>>> $${total_saldo_contas} TOTAL SALDO NO BANCO <<<`)
            break;

        case '3':
            let media = banco.calcular_media_saldo_contas();
            print(`>>> ${media} MEDIA SALDO TOTAL CONTAS NO BANCO <<<`);
            break;

        default:
            break;
    }
}

function atualizar() : void {
    let numero: string = input('digite o numero da conta antiga:');

    let condicao : number = banco.verificar_conta(banco,numero);

    if(condicao == 0){
        print('conta nao encontrada ou inexistente');
        return;
    }

    let conta_antiga = banco.consultar(numero);
    let novo_saldo : number = Number(input('digite o novo saldo da conta:'));
    let cpf_cliente : string = input('digite o cpf do novo cliente:');
    let cliente = banco.consultar_cliente_cpf(cpf_cliente)
    if(cliente === null){
        print('cliente nao encontrado')
        return;
    }

    let nova_conta : Conta = new Conta(conta_antiga.lerNumero,novo_saldo,conta_antiga.lerId,cliente);
    banco.atualizar(nova_conta);
    print('conta atualizada com sucesso');

}

function inserir_cliente() : void {
    print("\n Cadastrar Cliente")

    let id_disponivel : number  = banco.adicionar_id_cliente();
    while(id_disponivel == -1){
        id_disponivel = banco.adicionar_id_cliente();
    }

    let nome : string = input('digite o nome do cliente:');
    let cpf : string = input('digite o cpf do cliente:');
    let data_nascimento : string = input('digite a data de nascimento:')

    let cliente : Cliente = new Cliente(id_disponivel,nome,cpf,data_nascimento,[]);

    banco.inserir_cliente(cliente);
    print('cliente cadastrado com sucesso\n');

}

function consultar_cliente() : void {
    let cpf : string = input('digite o cpf do cliente:')

    let cliente : Cliente | null = banco.consultar_cliente_cpf(cpf);
    if(cliente === null){
        print("cliente nao encontrado ou inexistente");
        return;
    }

    print(`ID DO CLIENTE: ${cliente.lerId}`)
    print(`NOME DO CLIENTE: ${cliente.lerNome}`)
    print(`CPF DO CLIENTE: ${cliente.lerCpf}`)
    print(`DATA DE NASCIMENTO: ${cliente.LerDataNascimento}`)
    let resposta : string | number = (cliente.lerContas.length > 0) ? cliente.lerContas.length : 'nenhuma conta associada';
    print(`CONTAS CLIENTE: ${resposta}\n`)
}

function associar_cliente_conta() : void {
    let numero : string = input("digite o numero da conta:");
    let cpf : string = input('digite o cpf do cliente:');
    banco.associarContaCliente(numero,cpf);
}

function listar_contas_cliente() : void {
    print("\nLista contas do cliente");
    let cpf : string = input('digite o cpf do cliente:')

    let contas_cliente : Conta[] | void = banco.listar_contas_cliente(cpf);
    if(contas_cliente){
        for(let conta of contas_cliente){
            print(`\nid conta: ${conta.lerId}`)
            print(`numero conta:${conta.lerNumero}`)
            print(`saldo da conta: ${conta.lerSaldo}`)
            print(`cliente da conta: ${conta.lerCliente?.lerNome}\n`)
        }
    }
}

function total_saldo_cliente() : void {
    let cpf : string = input('digite o cpf do cliente:');

    let total : number | void = banco.totalizar_saldo_cliente(cpf);
    print(`\nSALDO TOTAL DE CLIENTE ${cpf}\nTOTAL: $${total} reais\n`)
}

function mudar_titular_conta() : void {
    print('\nMudar titular da conta');
    let numero : string = input('numero da conta que deseja alterar: ');
    let c : Conta = banco.consultar(numero)
    if(c.lerCliente === null){
        print('conta nao tem titular! Nao ha mudancas')
        return;
    }

    print("\nLista dos clientes")
    for(let cliente of banco.lerClientes){
        print(`Cliente ${cliente.lerNome} -> cpf: ${cliente.lerCpf}`)
    }

    let cpf : string = input(`digite o cpf do cliente que deseja titular a nova conta:`)
    let cliente_novo : Cliente | null = banco.consultar_cliente_cpf(cpf);
    banco.mudar_titular_conta(numero,cliente_novo);
    print(`conta ${numero} com titular alterado com sucesso!`);
}

function atribuir_titular_contasSemCliente() : void {
    print('\n Contas sem cliente');
    let contas_sem_cliente : Conta[] = banco.listar_contas_sem_cliente(banco);

    for(let conta of contas_sem_cliente){
        print(`\nid conta: ${conta.lerId}`)
        print(`numero conta:${conta.lerNumero}`)
        print(`saldo da conta: ${conta.lerSaldo}`)
        let resposta : string | number = (conta.lerCliente === null) ? 'nenhum titular' : 'tem titular'
        print(`cliente da conta: ${resposta}\n`)
    }

    for(let i = 0; i < contas_sem_cliente.length;i++){
        banco.imprimir_clientes_banco(banco);
        let numero : string = contas_sem_cliente[i].lerNumero
        let cpf : string = input(`${i + 1} - digite o cpf do novo titular da conta ${numero}:`);
        banco.associarContaCliente(numero,cpf);

        print(`\nConta ${numero} com novo titular com sucesso`);
        exibir_conta(numero);

    }
}

function efetuar_ordem_bancaria() : void {
    
    let numero_origem : string = input("Digite o número da conta origem: ");
    let conta_origem : Conta = banco.consultar(numero_origem);
    let qtd: number = Number(input("Digite a quantidade de contas destino: "));
    let contas : { numero: string; valor: number }[] = [];

    for (let i = 0; i < qtd; i++) {
        let numero = input(`digite o numero da conta destino ${i + 1}: `);
        let valorTransferencia = Number(input(`digite o valor para a conta ${numero}: `));
        contas.push({ numero, valor: valorTransferencia });
    }

    const totalNecessario = contas.reduce((soma, destino) => soma + destino.valor, 0);
        if (conta_origem.lerSaldo < totalNecessario) {
            console.log('Saldo insuficiente na conta de origem para realizar todas as transferencias');
            return;
        }else{
            console.log(`Saldo suficiente na conta origem para todas transferencias`)
        }

    banco.efetuar_ordem_bancaria(numero_origem,contas);

    for(let conta of contas){
        exibir_conta(conta.numero);
    }
    print('\nTransferencias realizadas com sucesso...')

}


