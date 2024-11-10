import { question } from 'readline-sync'

export function get_number_min(msg, min){
    const numero = Number(question(msg))
    if(numero < min){
        print(`\n>>> Numero deve ser maior ou igual a ${min}!`)
        return get_number_min(msg,min)
    }
    return numero
}

export function get_text(msg){
    return question(msg)
}

export function print(msg){
    return console.log(msg)
}

export function random_number(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function get_operation(msg){
    let entrada = question(msg).toUpperCase()
    let entrada_array = entrada.split('')
    if(entrada_array.length > 2){

        print('>> Possivel apenas 1 movimento!')
        return get_operation(msg)
        
    }else if((['R','G','B'].includes(entrada_array[0]) &&
                ['R','G','B'].includes(entrada_array[1])) === false){
        print('>> Item desconhecido!')
        return get_operation(msg)
    }else if(entrada_array[0] === entrada_array[1]){
        print('>> Itens nao podem ser IGUAIS!')
        return get_operation(msg)
    }
    
    return entrada
}

export const e_igual = (vetor , criterio) => {
    let total = 0
    for(let i of vetor){
        if(criterio(i)) total++
    }
    if(total === vetor.length) return true
    return false
}

export const numero_jogadas_minimas = (tamanho) => {
   return 2**tamanho - 1
}

