function array_in_string(array: number[]): string {
    let formato_string = ''

    array.forEach((numero, index) => {
        if(index === array.length - 1){
            formato_string += numero + ''
        }else{
            formato_string += numero + '-'
        }
    });
    return formato_string
}

console.log(array_in_string([1,2,3,4,5]))


/*

-> EM FORMATO EM ARRAY STRING

function array_in_string(array: number[]):string[] { //declara parametro em array: array: number[]

    let array_string:string[] = []
    
    //recebe args: numero,index,array
    array.forEach((numero, index) => {
        if(index === array.length){
            array_string.push(numero + '')
        }else{
            array_string.push(numero + '-')
        }
    });

    return array_string
}

console.log(array_in_string([4,3,2,1]))

*/