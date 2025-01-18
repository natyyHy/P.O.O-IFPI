import {Banco} from "./classBanco"
import {Conta} from "./classConta"
import {Cliente} from "./classCliente"
import {Poupanca} from "./classPoupanca"
import {print,input} from "../utils"
import { ContaImposto } from "./classContaImposto"
import { existsSync } from "fs"
import { read_file } from "./read_file"
import { write_file } from "./write_file"
import { ContaSalario } from "./claasContaSalario"

export class App {

    private banco : Banco;

    constructor(banco : Banco){
        this.banco = banco;
    }

    public menu() : void {
        let opcao: string | null = '';

    do {
      print(`\nBem vindo\nDigite uma opção:`);
      print('------------------------------------------------------------------------------------------------------')
      print(`* Contas:\n`);
      print(`1 - Inserir conta      2 - Consultar conta   3 - Sacar\n`)
      print(`4 - Depositar     5 - Excluir conta     6 - Transferir\n`)
      print(`7 – Totalizações   8 - Atualizar    9 - Efetuar ordem bancaria\n`);
      print(`9.1 - Render Juros   9.2 - Resetar limite de saque de Conta Salario\n`)
      print(`9.3 - Visualizar Saques Efeutuados de Conta Salario\n`)
      print(`* Clientes:\n`);
      print(`10 - Inserir cliente      11 - Consultar cliente por CPF   12 - Associar Conta a Cliente\n`);
      print(`13 - Listar Contas do Cliente   14 - Total saldo cliente   15 - Mudar o titular da conta\n`);
      print(`16 - Excluir cliente     17 - Atribuir titular a contas sem cliente\n`);
      print('------------------------------------------------------------------------------------------------------')
      print(`1.0 - Upload Arquivo    2.0 - Salvar Arquivo    0 - Sair\n`);

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
        case '9.1': this.renderJuros(); break;
        case '10': this.inserirCliente(); break;
        case '11': this.consultarCliente(); break;
        case '12': this.associarClienteConta(); break;
        case '13': this.listarContasCliente(); break;
        case '14': this.totalSaldoCliente(); break;
        case '15': this.mudarTitularConta(); break;
        case '16': this.excluirCliente(); break;
        case '17': this.atribuirTitularContasSemCliente(); break;
        case '1.0': this.uploadArquivo(); break;
        case '2.0': this.salvar_arquivo(); break;
        case '9.2' : this.resetarLimite(); break;
        case '9.3' : this.exibirSaquesRestantes(); break;
        case '0': print("Programa encerrando..."); break;
        default: print("Opcao inválida"); break;
      }

        } while (opcao !== '0');
    }

    public exibirSaquesRestantes() : void {
        print('\nexibir saques efetuados...')
        let numero : string = input('digite o numero da conta salario: ');
        let conta_consultada : Conta = this.banco.consultar(numero);
        if(conta_consultada){
            if(conta_consultada instanceof ContaSalario){
                print(`\nConta ${numero}:`)
                print(`Saques efetuados --> ${conta_consultada.lerSaques} saques`);
                print(`Limite de saques --> ${conta_consultada.lerLimite}`);
            }else{
                print('conta nao e conta salario...')
                return;
            }
        }else{
            print('conta nao encontrada...')
            return;
        }
    }

    public resetarLimite() : void {
        print('\nresetar limites de saques...');
        let numero : string = input('digite o numero da conta: ');
        let conta_procurada : Conta = this.banco.consultar(numero);
        if(conta_procurada){
            if(conta_procurada instanceof ContaSalario){
                let novoLimite : number = Number(input('digite o novo limite de saques: '));
                conta_procurada.escreverLimiteSaq = novoLimite;
                print('novo limite registrado com sucesso...')
                return;
            }else{
                print('conta nao é Conta Salario...')
                return;
            }
        }else{
            print('conta nao encontrada...')
            return;
        }
    }

    public salvar_arquivo() : void {
        print("salvando contas no arquivo 'contas.txt'...");
        let caminho_arquivo : string = "C:\\Users\\natie\\OneDrive\\Documentos\\ADS-IFPI\\Modulo_2\\P.O.O\\atividade_07_v2\\questao5\\contas.txt";
        write_file(this.banco.lerContas,caminho_arquivo);
        print('arquivo criado com sucesso...');
    }

    public exibir_conta(numero : string ) :void {
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

    public inserirConta() : void {
        print("\n Cadastrar Conta");
            print('1 - inserir Conta   2 - inserir Conta Poupanca   3 - inserir Conta Imposto   4 - inserir Conta Salario')
            let opcao : number = Number(input('digite a opcao: '));
            print('--- opcao selecionada ---');
            let numero : string = input("digite o numero da conta:");
            let saldo_inicial : number = parseFloat(input('Saldo inicial da conta '+ numero + ":"));
            let id_disponivel : number  = this.banco.adicionar_id_conta();
            while(id_disponivel == -1){
                id_disponivel = this.banco.adicionar_id_conta();
            }
            let contaNova : Conta;
            if(opcao === 3){
                contaNova = new ContaImposto(numero,saldo_inicial,id_disponivel,null);
            }else if(opcao === 2){
                let taxa : number = Number(input(`digite a taxa de juros que deseja para conta poupanca ${numero}: `));
                contaNova = new Poupanca(numero,0,id_disponivel,null,taxa);
            }else if(opcao === 4){
                let limite : number = Number(input('digite o limite de saques da conta salario: '));
                contaNova = new ContaSalario(numero,saldo_inicial,id_disponivel,null,limite);
            }else{
                contaNova = new Conta(numero,0,id_disponivel,null)
            }
        
            contaNova.escreverSaldo = saldo_inicial;
            this.banco.inserir_conta(contaNova);
            print(`conta cadastrada com sucesso!\n`);
    }

    public consultarConta() : void {
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
                print(`SALDO DA CONTA: $${conta_consultada.lerSaldo.toFixed(2)}`)
                print(`ID DA CONTA: ${conta_consultada.lerId}`)
                print(`TITULAR(cliente): ${conta_consultada.lerCliente?.lerNome}\n`)
            }else {
                print(`\nNUMERO DA CONTA: ${conta_consultada.lerNumero}`)
                print(`SALDO DA CONTA: $${conta_consultada.lerSaldo.toFixed(2)}`)
                print(`ID DA CONTA: ${conta_consultada.lerId}`)
                print(`TITULAR(cliente): nenhum cliente associado a conta\n`)
            }
    }

    public sacar(): void {
            print("\n Sacar na Conta");
            print(`\n1 - sacar em Conta    2 - sacar em Conta Imposto   3 - sacar em Conta Salario`)
            let opcao : number = Number(input('opcao: '));
            if(opcao <= 0 && opcao > 3){
                print('opcao invalida');
                return;
            }
            let numero : string = input("digite o numero da conta:");
            let valor_sacado : number = Number(input('digite o valor a ser sacado:'));
            let conta_procurada : Conta = this.banco.consultar(numero);

            //achar conta
            if(conta_procurada){
                print('conta encontrada...');
            }else{
                print('conta nao encontrada...');
                return;
            }

            //verificar saldo e verificar opcao de conta
            if(opcao === 3){
                if(conta_procurada instanceof ContaSalario){
                    this.banco.sacar_contasalario(numero,valor_sacado);
                    print('sacar em Conta Salario numero ' + numero + ' concluido...');
                    return;
                }
            }else if(opcao === 2){
                if(conta_procurada instanceof ContaImposto){
                    //resposta = this.banco.sacar(numero,valor_sacado);
                    this.banco.sacar(numero,valor_sacado);
                    print('sacar em Conta Imposto numero ' + numero + ' concluido...');
                    return;
                }
            }else if(opcao === 1){
                    this.banco.sacar(numero,valor_sacado);
                    print(`sacar em Conta ${numero} concluido...`);
                    return;
            }
    }

    public uploadArquivo(): void {
        print('\n Carregar arquivo de contas')
        //let caminho_arquivo : string = input('caminho para o diretorio do arquivo: ');
        let caminho_arquivo : string = "C:\\Users\\natie\\OneDrive\\Documentos\\ADS-IFPI\\Modulo_2\\P.O.O\\atividade_07_v2\\questao5\\contas.txt";

        if(existsSync(caminho_arquivo)){
            print('caminho do arquivo encontrado...')
        }else{
            print('caminho do arquivo nao encontrado...');
            return;
        }

        this.banco.escreverContas = read_file(caminho_arquivo);
        print('arquivo carregado com sucesso...')
        return;
    }

    public depositar() : void {
        print("\n Depositar na Conta");
            let valor_deposito : number = Number(input('digite o valor a ser depositado:'));
            let numero : string = input('digite o numero da conta:');
        
            this.banco.depositar(valor_deposito,numero);
            print(`valor $${valor_deposito} depositado a conta ${numero} com sucesso\n`);
    }

    public excluirConta() : void {
        print("\n Excluir Conta");
        let numero : string = input("digite o numero da conta:");
        this.banco.excluir_conta(numero);
        print(`Conta ${numero} excluida com sucesso`);
    }

    public excluirCliente() : void {
        print(`\n Excluir Cliente`);
            for(let cliente of this.banco.lerclientes){
                print(`cliente ${cliente.lerNome} | cpf: ${cliente.lerCpf}`)
            }
            let cpf : string = input('digite o cpf do cliente que deseja excluir:')
        
            this.banco.excluir_cliente(cpf);
            print(`cliente ${cpf} removido com sucesso`);
    }

    public transferir() : void {
        print("\n Transferencia na Conta");
        
            let numero_origem : string;
            let numero_destino : string;
            let valor : number;
            
            numero_origem = input('digite o numero da conta origem:');
            numero_destino = input('digite o numero da conta destino:')
            valor = Number(input('digite o valor da transferencia:'));
        
            this.banco.transferir(this.banco,numero_origem,numero_destino,valor);
    }

    public totalizacao() : void {
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

    public atualizarConta() : void {
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

    public efetuarOrdemBancaria() : void {
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

    public inserirCliente() : void {
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

    public consultarCliente() : void {
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

    public associarClienteConta() : void {
        let numero : string = input("digite o numero da conta:");
        let cpf : string = input('digite o cpf do cliente:');
        this.banco.associarContaCliente(numero,cpf);
    }

    public listarContasCliente() : void {
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

    public totalSaldoCliente(): void {
        let cpf : string = input('digite o cpf do cliente:');
        let total : number | void = this.banco.totalizar_saldo_cliente(cpf);
        print(`\nSALDO TOTAL DE CLIENTE ${cpf}\nTOTAL: $${total} reais\n`)
    }

    public mudarTitularConta() : void {
        print('\nMudar titular da conta');
        let numero : string = input('numero da conta que deseja alterar: ');
        let c : Conta = this.banco.consultar(numero)
        if(c.lerCliente === null){
            print('conta nao tem titular! Nao ha mudancas')
            return;
        }
        
        print("\nLista dos clientes")
        for(let cliente of this.banco.lerclientes){
            print(`Cliente ${cliente.lerNome} -> cpf: ${cliente.lerCpf}`)
        }
        
        let cpf : string = input(`digite o cpf do cliente que deseja titular a nova conta:`)
        let cliente_novo : Cliente | null = this.banco.consultar_cliente_cpf(cpf);
        this.banco.mudar_titular_conta(numero,cliente_novo);
        print(`conta ${numero} com titular alterado com sucesso!`);
    }

    public atribuirTitularContasSemCliente() : void {
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

    public renderJuros(): void {
        print('\n --- RenderJuros ---')
        let numeroContaPoupanca: string = input('digite o numero da conta poupanca que deseja: ');
        const conta : Conta = this.banco.consultar(numeroContaPoupanca);
        if(conta){
            if(conta instanceof Poupanca){
                    this.banco.renderJuros(numeroContaPoupanca);
                    print(`--- render juros executado com sucesso ---`);
                    return;
            }
            print(`conta numero ${numeroContaPoupanca} nao e poupanca!`);
            return;
        }
        print(`conta numero ${numeroContaPoupanca} nao encontrado!`);
        return;
    }

}
