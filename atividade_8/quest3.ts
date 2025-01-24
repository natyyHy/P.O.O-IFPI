/*
3) Com  o  código  repassado,  crie  duas  contas  e  teste  o  método  transferir  de  modo 
que a conta a ser debitada não possua saldo suficiente. Explique o que ocorreu.
*/

import { Conta } from "./excecoes-parte-1/banco";

const conta_debitada : Conta = new Conta(1,'111',90)
const conta_destino : Conta = new Conta(2,'222',300);

conta_debitada.transferir(conta_destino,100);

/*
OutPut:
    throw new Error('Saldo insuficiente:' + this._saldo);
    Error: Saldo insuficiente:90


R: O comando "throw new Error('Saldo insuficiente:' + this._saldo);" interronpeu a exercução do metodo transferir pois percebeu
    que conta a ser debitada nao possuia saldo suficiente e lançou mensagem de erro.
    Portanto, nota-se que o erro apenas foi lançado e nao foi capturado(dentro de um bloco catch),logo ele encerrou o programa com a mensagem no console.

    Seria necessario a implementação da captura do erro (catch) para o programa nao encerrar com um erro não tratado


*/


