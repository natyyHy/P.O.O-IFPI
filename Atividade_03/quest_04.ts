function soma(x: number, y?: any): number {
    return x + y
}

//a
console.log(soma(1,2))
/*
saida:
3
(como a funçao recebe dois valores do tipo numero, a funçao retonar o resultado da operaçao normalmente)
*/

//b
console.log(soma(1, "2"));
/*
saida:
'12'
(como o segundo parametro da funçao é do tipo opcional any, a funçao permite o argumento '2' e a operaçao concatenar, resultando em uma string '12',mesmo a funçao tendo o tipo de retorno number)
*/

//c
console.log(soma(1));
/*
saida:
NaN
(a funçao nao recebe o segundo parametro,o que é considerado undefined,a operaçao é exercutada mas 1 + underfined resulta em NaN) 
*/

//essa funçao pode acarretar erros devido ao tipo any de y.