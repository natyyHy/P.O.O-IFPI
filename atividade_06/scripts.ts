import {Banco} from './quest03'; import {Cliente, Conta} from './quest04'; import {App} from './quest05';

//Crie  scripts  que  testam  todas  as  classes  e  verifiquem  o  acesso  a  atributos privados
function executarTesteBanco() {
    console.log("Iniciando testes banco...");

    const banco = new Banco();

    const conta1 = new Conta("123", 1000, 1);
    const conta2 = new Conta("456", 2000, 2);

    banco.inserir_conta(conta1);
    banco.inserir_conta(conta2);

    //acesso  a  atributos privados
    console.log("Contas banco:", banco.lerContas); // Deve exibir 1000
    console.log("Clientes do banco:", banco.lerClientes); // Deve exibir 100
}

function executarTesteConta() {
    console.log("Iniciando testes conta...");

    const conta : Conta = new Conta("123", 1000, 1);
    //acesso  a  atributos privados
    console.log(conta.lerNumero);
    console.log(conta.lerSaldo);
    console.log(conta.lerId); 
    console.log(conta.lerCliente); 
    conta.escreverSaldo = 2000;
    console.log(conta.lerSaldo);
    conta.escreverTitular = new Cliente(1,"joao","123","12/12/12",[]);
    console.log(conta.lerCliente);

}

function executarTesteCliente() {
    console.log("Iniciando testes cliente...");

    const cliente : Cliente = new Cliente(1,"maria","432","12/12/12",[]);
    //acesso  a  atributos privados
    console.log(cliente.lerNome);
    console.log(cliente.lerCpf);
    console.log(cliente.LerDataNascimento);
    console.log(cliente.lerContas);
    cliente.escreverContas = [ new Conta("123", 1000, 1) ];
    console.log(cliente.lerContas);
}

function executarTesteApp() {
    console.log("Iniciando testes app...");

    const aplicativo = new App();
    // app.banco = new Banco();  <--- erro, banco é privado em App e não pode ser acessado diretamente assim 
    aplicativo.menu();
}

executarTesteBanco();
executarTesteConta();
executarTesteCliente();
executarTesteApp();
