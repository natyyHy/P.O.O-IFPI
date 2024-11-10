import { get_number_min_max } from '../utils/io_utils.js'
import { e_igual, get_operation, get_text, numero_jogadas_minimas, print, random_number } from './utils_game.js'

function main(){

    print('===== JOGO HANOI RGB - (ROGERIO GORDINHO E BONITO >:3) =====\n')
    print('')
    let nivel = get_number_min_max('>>> Digite o nivel do jogo (1)-Normal (2)-Medio (3)-Avançado: ',1,3)
    print('')
    let nome_jogador_1 = get_text('>>> Nome Jogador 1: ')
    print('')
    let nome_jogador_2 = get_text('>>> Nome Jogador 2: ')

    let torres = distribuir_itens_torres(nivel)
    let torre_inicial = torres[0] , torre_G = torres[1] , torre_B = torres[2]

    let copia1_v1 = [... torre_inicial]
    let copia1_v2 = [... torre_G]
    let copia1_v3 = [... torre_B]

    let jogadas_player1 = iniciar_jogo(nome_jogador_1,copia1_v1,copia1_v2,copia1_v3)

    let copia2_v1 = [... torre_inicial]
    let copia2_v2 = [... torre_G]
    let copia2_v3 = [... torre_B]

    let jogadas_player2 = iniciar_jogo(nome_jogador_2,copia2_v1,copia2_v2,copia2_v3)

    let vencedor = ''
    if(jogadas_player1 === jogadas_player2) vencedor = 'EMPATE'
        else{
            vencedor = jogadas_player1 < jogadas_player2 ? nome_jogador_1 : nome_jogador_2   
        }

     print(
`\t------------------------------------
\t>>> Jogador ${vencedor} VENCEU ! <<<
\t-------------------------------------
\t>>> Jogadas Jogador 1 ${nome_jogador_1}: ${jogadas_player1} jogadas
\t>>> Jogadas Jogador 2 ${nome_jogador_2}: ${jogadas_player2} jogadas\n`)
    
}

main()

function iniciar_jogo(nome,torre1,torre2,torre3){
    //acaba quando o jogador completar o jogo (RETORNAR QUANTIDADE DE MOVIMENTOS)
    print(`\n >>> Jogador ${nome}! O jogo COMEÇOU!\n`)
    print(`\n>>> Quantidade minima de movimentos: ${numero_jogadas_minimas(torre1.length)}\n`)
    let jogadas = 0

    let torre_R = torre1
    let torre_G = torre2
    let torre_B = torre3

    while(!(jogo_finalizado(torre_R,torre_G,torre_B))){

        print(' >>> ESTADO DAS TORRE <<<\n')
        print(`Torre de R ---> ` + imprimir_torre(torre_R))
        print(`Torre de G ---> ` + imprimir_torre(torre_G))
        print(`Torre de B ---> ` + imprimir_torre(torre_B))

        let operacao_user = get_operation('\n>> selecione o movimento (Ex: RG , Item de Torre R para Torre G): ')

        let torre_origem = [] , torre_destino = []

        switch (operacao_user) {
            case 'RG':
                torre_origem = torre_R
                torre_destino = torre_G        
                break;
            case 'RB':
                torre_origem = torre_R
                torre_destino = torre_B  
                break;
            case 'GR':
                torre_origem = torre_G
                torre_destino = torre_R
                break;
            case 'GB':
                torre_origem = torre_G
                torre_destino = torre_B
                break;
            case 'BR':
                torre_origem = torre_B
                torre_destino = torre_R
                break;
            case 'BG':
                torre_origem = torre_B
                torre_destino = torre_G
                break;
        }

        if(torre_origem.length === 0){
            print('')
            print('>>> Erro! Torre de Origem Vazia!')
            print('')
        }else {
            torre_destino.push(torre_origem.pop())
            jogadas++
            print('\n>>> Movimentos Efetudos: ' + jogadas)
        }
    }

    print(`\n >>> Parabens Jogador ${nome}! Voce completou ${jogadas} jogadas !\n`)
    return jogadas

}

function jogo_finalizado(torreR,torreG,torreB){

    if(e_igual(torreR, elem => elem === 'R') &&
        e_igual(torreG,elem => elem === 'G') &&
            e_igual(torreB,elem => elem === 'B')){
                return true
            }

    return false
}

function imprimir_torre(torre){
    let img = torre.length > 0 ? torre.join(' ') : '[ vazio ]'
    return img
}

function distribuir_itens_torres(nivel){

    if(nivel === 1){
        return iniciar_itens_nivel_1()
    }else if(nivel === 2){
        return iniciar_itens_nivel_2()
    }else{
        return iniciar_itens_nivel_3()
    }
}


function iniciar_itens_nivel_1(){
    let torre_1 = [] , torre_2 = [] , torre_3 = []
    let itens = 'RGB'.split('')
    while(torre_1.length !== 9){
        torre_1.push(itens[random_number(0,2)])
    }
    return [torre_1 , torre_2 , torre_3]
}

function iniciar_itens_nivel_2(){
    let torre_1 = [] , torre_2 = [] , torre_3 = []
    let itens = 'RGB'.split('')
    while(torre_1.length + torre_2.length + torre_3.length !== 9){
        const torre = random_number(1,3)
        if(torre === 1 && torre_1.length < 4){
            torre_1.push(itens[random_number(0,itens.length - 1)])
        }else if(torre === 2 && torre_2.length < 3){
            torre_2.push(itens[random_number(0,itens.length - 1)])
        }else if(torre === 3 && torre_3.length < 2){
            torre_3.push(itens[random_number(0,itens.length - 1)])
        }
    }

    //verificaçao para que todas torres devem ter pelo menos um ou mais valores
    if(torre_1.length === 0 || torre_2.length === 0 || torre_3.length === 0) return iniciar_itens_nivel_2()
    
    return [torre_1 , torre_2 , torre_3]
}

function iniciar_itens_nivel_3(){
    let torre_1 = [] , torre_2 = [] , torre_3 = []
    let itens = 'RGB'.split('')
    while(torre_1.length + torre_2.length + torre_3.length !== 9){
        const torre = random_number(1,3)
        if(torre === 1 && torre_1.length < 3){
            torre_1.push(itens[random_number(0,itens.length - 1)])
        }else if(torre === 2 && torre_2.length < 3){
            torre_2.push(itens[random_number(0,itens.length - 1)])
        }else if(torre === 3 && torre_3.length < 3){
            torre_3.push(itens[random_number(0,itens.length - 1)])
        }
    }

    //verificaçao para que todas torres devem ter pelo menos um ou mais valores
    if(torre_1.length === 0 || torre_2.length === 0 || torre_3.length === 0) return iniciar_itens_nivel_2()
    
    return [torre_1 , torre_2 , torre_3]
}