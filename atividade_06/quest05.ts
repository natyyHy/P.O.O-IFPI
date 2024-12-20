
import {print , input} from './utils'; import {Banco} from './quest03'; import {Cliente, Conta} from './quest04';

export class App {

    private banco : Banco;

    constructor(){
        this.banco = new Banco();
    }

    menu() : void {
        let opcao: string | null = '';

    do {
      print(`\nBem vindo\nDigite uma opção:`);
      print(`Contas:\n`);
      print(`1 - Inserir conta      2 - Consultar conta   3 - Sacar\n` +
            `4 - Depositar     5 - Excluir conta     6 - Transferir\n` +
            `7 – Totalizações   8 - Atualizar    9 - Efetuar ordem bancaria\n`);
      print(`Clientes:\n`);
      print(`10 - Inserir cliente      11 - Consultar cliente por CPF   12 - Associar Conta a Cliente   13 - Listar Contas do Cliente\n`);
      print(`14 - Total saldo cliente   15 - Mudar o titular da conta   16 - Excluir cliente\n`);
      print(`17 - Atribuir titular a contas sem cliente\n`);
      print(`0 - Sair\n`);

      opcao = input("opcao:");

      switch (opcao) {
        case '1': this.inserirConta(); break;
        case '2': this.consultarConta(); break;
        case '3': this.sacar(); break;
        case '4': this.depositar(); break;
        case '5': this.excluirConta(); break;
        case '6': this.transferir(); break;
        case '7': this.totalizacao(); break;
        case '8': this.atualizarConta(); break;
        case '9': this.efetuarOrdemBancaria(); break;
        case '10': this.inserirCliente(); break;
        case '11': this.consultarCliente(); break;
        case '12': this.associarClienteConta(); break;
        case '13': this.listarContasCliente(); break;
        case '14': this.totalSaldoCliente(); break;
        case '15': this.mudarTitularConta(); break;
        case '16': this.excluirCliente(); break;
        case '17': this.atribuirTitularContasSemCliente(); break;
        case '0': print("Programa encerrando..."); break;
        default: print("Opcao inválida"); break;
      }

        } while (opcao !== '0');
    }

    exibir_conta(numero : string ) :void {
        let conta : Conta = this.banco.consultar(numero);
            if(!conta){
                return;
            }
        
            print(`\n=== conta ===`)
            print(`id - ${conta.lerId}`)
            print(`numero - ${conta.lerNumero}`)
            print(`saldo - ${conta.lerSaldo}$`)
            let resposta : string | undefined = (conta.lerCliente === null) ? 'nenhum titular' : conta.lerCliente?.lerNome;
            print(`cliente - ${resposta}`)
    }

    inserirConta() : void {
        print("\n Cadastrar Conta");
        let numero : string = input("digite o numero da conta:")
        let id_disponivel : number  = this.banco.adicionar_id_conta();
        while(id_disponivel == -1){
            id_disponivel = this.banco.adicionar_id_conta();
        }
        let conta_com_id : Conta = new Conta(numero,0,id_disponivel)
        let saldo_inicial : number = parseFloat(input('Saldo inicial da conta '+ numero + ":"));
        conta_com_id.escreverSaldo = saldo_inicial;
        this.banco.inserir_conta(conta_com_id);
        print(`conta cadastrada com sucesso!\n`)
    }

    consultarConta() : void {
            print(`\n Consultar Conta`);
            let numero : string = input('digite o numero da conta:');
        
            let i : number = 0;
            for(let conta of this.banco.lerContas){
                if(conta.lerNumero === numero){
                    i = 1
                    break;
                }
            }
            if(i === 0){
                print("Conta nao encontrada ou inexistente")
                return;
            }
            let conta_consultada : Conta = this.banco.consultar(numero);
            if(conta_consultada.lerCliente !== undefined ){
                print(`\nNUMERO DA CONTA: ${conta_consultada.lerNumero}`)
                print(`SALDO DA CONTA: $${conta_consultada.lerSaldo}`)
                print(`ID DA CONTA: ${conta_consultada.lerId}`)
                print(`TITULAR(cliente): ${conta_consultada.lerCliente?.lerNome}\n`)
            }else {
                print(`\nNUMERO DA CONTA: ${conta_consultada.lerNumero}`)
                print(`SALDO DA CONTA: $${conta_consultada.lerSaldo}`)
                print(`ID DA CONTA: ${conta_consultada.lerId}`)
                print(`TITULAR(cliente): nenhum cliente associado a conta\n`)
            }
    }

    sacar(): void {
            print("\n Sacar na Conta");
            let numero : string = input("digite o numero da conta:");
            let valor_sacado : number = Number(input('digite o valor a ser sacado:'));
        
            this.banco.sacar(numero,valor_sacado);
    }

    depositar() : void {
        print("\n Depositar na Conta");
            let valor_deposito : number = Number(input('digite o valor a ser depositado:'));
            let numero : string = input('digite o numero da conta:');
        
            this.banco.depositar(valor_deposito,numero);
            print(`valor $${valor_deposito} depositado a conta ${numero} com sucesso\n`);
    }

    excluirConta() : void {
        print("\n Excluir Conta");
        let numero : string = input("digite o numero da conta:");
        this.banco.excluir_conta(numero);
        print(`Conta ${numero} excluida com sucesso`);
    }

    excluirCliente() : void {
        print(`\n Excluir Cliente`);
            for(let cliente of this.banco.lerClientes){
                print(`cliente ${cliente.lerNome} | cpf: ${cliente.lerCpf}`)
            }
            let cpf : string = input('digite o cpf do cliente que deseja excluir:')
        
            this.banco.excluir_cliente(cpf);
            print(`cliente ${cpf} removido com sucesso`);
    }

    transferir() : void {
        print("\n Transferencia na Conta");
        
            let numero_origem : string;
            let numero_destino : string;
            let valor : number;
            
            numero_origem = input('digite o numero da conta origem:');
            numero_destino = input('digite o numero da conta destino:')
            valor = Number(input('digite o valor da transferencia:'));
        
            this.banco.transferir(this.banco,numero_origem,numero_destino,valor);
    }

    totalizacao() : void {
        print('\nTotalizacao Contas')
        
            print('1 - Total quantidade contas    2 - Total Saldo das Contas   3 - Media Saldo Contas')
            let opcao = input('opcao:');
        
            switch (opcao) {
                case '1':
                    let qtd : number = this.banco.total_quantidade_contas()
                    print(`>>> ${qtd} CONTAS NO BANCO <<<`);
                    break;
            
                case '2':
                    let total_saldo_contas = this.banco.total_saldo_contas();
                    print(`>>> $${total_saldo_contas} TOTAL SALDO NO BANCO <<<`)
                    break;
        
                case '3':
                    let media = this.banco.calcular_media_saldo_contas();
                    print(`>>> ${media} MEDIA SALDO TOTAL CONTAS NO BANCO <<<`);
                    break;
        
                default:
                    break;
            }
    }

    atualizarConta() : void {
        let numero: string = input('digite o numero da conta antiga:');
        
        let condicao : number = this.banco.verificar_conta(this.banco,numero);
        
        if(condicao == 0){
            print('conta nao encontrada ou inexistente');
            return;
        }
        
        let conta_antiga = this.banco.consultar(numero);
        let novo_saldo : number = Number(input('digite o novo saldo da conta:'));
        let cpf_cliente : string = input('digite o cpf do novo cliente:');
        let cliente = this.banco.consultar_cliente_cpf(cpf_cliente)
        if(cliente === null){
            print('cliente nao encontrado')
            return;
        }
        
        let nova_conta : Conta = new Conta(conta_antiga.lerNumero,novo_saldo,conta_antiga.lerId,cliente);
        this.banco.atualizar(nova_conta);
        print('conta atualizada com sucesso');
    }

    efetuarOrdemBancaria() : void {
        let numero_origem : string = input("Digite o número da conta origem: ");
            let conta_origem : Conta = this.banco.consultar(numero_origem);
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
        
            this.banco.efetuar_ordem_bancaria(numero_origem,contas);
        
            for(let conta of contas){
                this.exibir_conta(conta.numero);
            }
            print('\nTransferencias realizadas com sucesso...')
    }

    inserirCliente() : void {
        print("\n Cadastrar Cliente")
        
            let id_disponivel : number  = this.banco.adicionar_id_cliente();
            while(id_disponivel == -1){
                id_disponivel = this.banco.adicionar_id_cliente();
            }
        
            let nome : string = input('digite o nome do cliente:');
            let cpf : string = input('digite o cpf do cliente:');
            let data_nascimento : string = input('digite a data de nascimento:')
        
            let cliente : Cliente = new Cliente(id_disponivel,nome,cpf,data_nascimento,[]);
        
            this.banco.inserir_cliente(cliente);
            print('cliente cadastrado com sucesso\n');
    }

    consultarCliente() : void {
        let cpf : string = input('digite o cpf do cliente:')
        
        let cliente : Cliente | null = this.banco.consultar_cliente_cpf(cpf);
        if(cliente === null){
            print("cliente nao encontrado ou inexistente");
            return;
        }

        print(`ID DO CLIENTE: ${cliente?.lerId}`)
        print(`NOME DO CLIENTE: ${cliente?.lerNome}`)
        print(`CPF DO CLIENTE: ${cliente?.lerCpf}`)
        print(`DATA DE NASCIMENTO: ${cliente.LerDataNascimento}`)
        let resposta : string | number = (cliente.lerContas.length > 0) ? cliente.lerContas.length : 'nenhuma conta associada';
        print(`CONTAS CLIENTE: ${resposta}\n`)
        
    }

    associarClienteConta() : void {
        let numero : string = input("digite o numero da conta:");
        let cpf : string = input('digite o cpf do cliente:');
        this.banco.associarContaCliente(numero,cpf);
    }

    listarContasCliente() : void {
        print("\nLista contas do cliente");
        let cpf : string = input('digite o cpf do cliente:');
        
        let contas_cliente : Conta[] | void = this.banco.listar_contas_cliente(cpf);
        if(contas_cliente){
        for(let conta of contas_cliente){
                if(conta !== undefined){
                    print(`\nid conta: ${conta.lerId}`)
                    print(`numero conta:${conta.lerNumero}`)
                    print(`saldo da conta: ${conta.lerSaldo}`)
                    print(`cliente da conta: ${conta.lerCliente?.lerNome}\n`)
                }
            }
        }else{
            print('nehuma conta cadastrada.')
        }
    }

    totalSaldoCliente(): void {
        let cpf : string = input('digite o cpf do cliente:');
        let total : number | void = this.banco.totalizar_saldo_cliente(cpf);
        print(`\nSALDO TOTAL DE CLIENTE ${cpf}\nTOTAL: $${total} reais\n`)
    }

    mudarTitularConta() : void {
        print('\nMudar titular da conta');
        let numero : string = input('numero da conta que deseja alterar: ');
        let c : Conta = this.banco.consultar(numero)
        if(c.lerCliente === null){
            print('conta nao tem titular! Nao ha mudancas')
            return;
        }
        
        print("\nLista dos clientes")
        for(let cliente of this.banco.lerClientes){
            print(`Cliente ${cliente.lerNome} -> cpf: ${cliente.lerCpf}`)
        }
        
        let cpf : string = input(`digite o cpf do cliente que deseja titular a nova conta:`)
        let cliente_novo : Cliente | null = this.banco.consultar_cliente_cpf(cpf);
        this.banco.mudar_titular_conta(numero,cliente_novo);
        print(`conta ${numero} com titular alterado com sucesso!`);
    }

    atribuirTitularContasSemCliente() : void {
        print('\n Contas sem cliente');
        let contas_sem_cliente : Conta[] = this.banco.listar_contas_sem_cliente(this.banco);
        
        for(let conta of contas_sem_cliente){
            print(`\nid conta: ${conta.lerId}`)
            print(`numero conta:${conta.lerNumero}`)
            print(`saldo da conta: ${conta.lerSaldo}`)
            let resposta : string | number = (conta.lerCliente === null) ? 'nenhum titular' : 'tem titular'
            print(`cliente da conta: ${resposta}\n`)
        }
        
        for(let i = 0; i < contas_sem_cliente.length;i++){
            this.banco.imprimir_clientes_banco(this.banco);
            let numero : string = contas_sem_cliente[i].lerNumero
            let cpf : string = input(`${i + 1} - digite o cpf do novo titular da conta ${numero}:`);
            this.banco.associarContaCliente(numero,cpf);
        
            print(`\nConta ${numero} com novo titular com sucesso`);
            this.exibir_conta(numero);
        
        }
    }

}
