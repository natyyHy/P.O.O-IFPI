/*
2) Explique por que cada um dos 3 métodos acima possui limitações de uso.

1- Try-Catch possui uma limitaçao de ocultar erros,tornando a depuração do codico mais dificil, é notorio propor
    exceções especificas.

2-  Throw possui uma limitação de não corrigir erros apos uma causa de erro, apos lançar erro, a execução do codico é interronpida
    mas não corrigir o problema. Outra limitação seria se o erro lançado estiver sem um contexto ou um bom controle, ele pode ser tornar 
    dificilmente legivel e confuso quem for lidar com ele no catch

3 - finally possui uma limitação na qual indepedente do que aconteça no codico,ele será exercutado,caso o programa precise encerrar apos
    uma captura de erro, o uso finally pode nao ser essencial. Outro ponto seria atrapalhar na depuraçao do codico, caso um erro ocorrer
    no seu bloco, ele poderia atrapalhar ou ate mascarar o principal erro original.

*/