function exibir(...rest_parameter: string[]){
    rest_parameter.forEach(element => {
        console.log(element)
    });
}
exibir('a','b')
exibir('a','b','c')
exibir('a','b','c','d')