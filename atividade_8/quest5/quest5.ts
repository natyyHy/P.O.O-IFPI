/*5) Crie  um  método  chamado  validaValor(valor)  na  que  lance  um  erro  caso  o  valor 
repassado seja menor ou igual a zero ou em formato inválido. Chame o método no 
construtor  da  classe  conta  para  validar  o  saldo  inicial.  Chame  o  método  também 
nos  métodos  sacar  e  depositar.  Reexecute  a  classe  App  e  chame  as  opções  de 
menu  que  aceitam valores referentes  a  saldo,  débito,  crédito  e transferir.  Avalie  o 
tratamento do erro.*/

import {Banco} from "./classes/classBanco"
import {App} from "./classes/classApp"


function main(){
    let bancoNovo : Banco = new Banco();
    let appNovo : App = new App(bancoNovo);

    appNovo.menu();
}

main();

/*
1 - TESTE EM VALIDAÇÃO NO SALDO INICIAL
output:
    1 - inserir Conta   2 - inserir Conta Poupanca   3 - inserir Conta Imposto   4 - inserir Conta Salario
    digite a opcao: 1
    --- opcao selecionada ---
    digite o numero da conta:111-1
    Saldo inicial da conta 111-1:-90
    digite o id da conta:1
    O valor deve ser maior que zero e em formato valido.


2 - TESTE EM VALIDAÇÃO EM TRANSFERENCIA
output:
    Transferencia na Conta
    digite o numero da conta origem:111-1
    digite o numero da conta destino:222-2
    digite o valor da transferencia:-50
    O valor deve ser maior que zero e em formato valido.

3 - TESTE EM VALIDAÇÃO EM SACAR
output:
     Sacar na Conta

    1 - sacar em Conta    2 - sacar em Conta Imposto   3 - sacar em Conta Salario
    opcao: 1
    digite o numero da conta:111-1
    digite o valor a ser sacado:'40'
    conta encontrada...
    O valor deve ser maior que zero e em formato valido.


4 - TESTE EM VALIDAÇÃO EM DEPOSITAR
output:
    opcao:4
    Depositar na Conta
    digite o valor a ser depositado:0
    digite o numero da conta:333-3
    O valor deve ser maior que zero e em formato valido.


    Avaliação: O tratamento de erro validarValor(valor) promove uma reutilizaçao de codico,podendo usar nas varias funcionalidades que tem
    como entrada o valor inserido do usuario,como saldo,transferencia,deposito e saque. A mensagem de erro é clara para o usuario saber qual
    foi o tipo de erro e como tambem a função evitar que dados e valores invalidaos sejam inseridos, garantindo consistencia nos dados da conta,
    numca podendo ser 0 ou valor nao do tipo number.
    
*/
