/*
4) Instancie uma classe App e, caso necessário, crie duas contas. Acesse a opção de 
transferir com valor alto o suficiente para lançar uma exceção/erro.  Verifique que o 
lançamento  da  exceção  foi  “propagado”  para  o  método  conta.transferir(), 
banco.transferir() e App.menu()? Como você avalia a confiabilidade dessa 
implementação.
*/

import { App } from "./excecoes-parte-1/app";

let app_novo : App = new App();
app_novo.menu()


/*
R: A implementação passa a ser confiavel. pois:
    1 - o erro do saldo é lançado no seu local correto
    2 - a proporgação da exceção vão ate o nivel superior em app.menu
    3 - o menu informar o erro ocorrido,ajudando assim na legibilidade de falhas e feedback ao usuario

    o fluxo da exceção é bem estruturada, resumindo, a exceção começar em conta.transferir(), ela é propagada em banco.transferir() ou capturada
    e em app.menu ela é captuda e tratada, executando assim o catch para exibir a mensagem de erro.
*/
