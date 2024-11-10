"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var io_utils_js_1 = require("../utils/io_utils.js");
var utils_game_js_1 = require("./utils_game.js");
function main() {
    (0, utils_game_js_1.print)('===== JOGO HANOI RGB - (ROGERIO GORDINHO E BONITO >:3) =====\n');
    (0, utils_game_js_1.print)('');
    var nivel = (0, io_utils_js_1.get_number_min_max)('>>> Digite o nivel do jogo (1)-Normal (2)-Medio (3)-Avançado: ', 1, 3);
    (0, utils_game_js_1.print)('');
    var nome_jogador_1 = (0, utils_game_js_1.get_text)('>>> Nome Jogador 1: ');
    (0, utils_game_js_1.print)('');
    var nome_jogador_2 = (0, utils_game_js_1.get_text)('>>> Nome Jogador 2: ');
    var torres = distribuir_itens_torres(nivel);
    var torre_inicial = torres[0], torre_G = torres[1], torre_B = torres[2];
    var copia1_v1 = __spreadArray([], torre_inicial, true);
    var copia1_v2 = __spreadArray([], torre_G, true);
    var copia1_v3 = __spreadArray([], torre_B, true);
    var jogadas_player1 = iniciar_jogo(nome_jogador_1, copia1_v1, copia1_v2, copia1_v3);
    var copia2_v1 = __spreadArray([], torre_inicial, true);
    var copia2_v2 = __spreadArray([], torre_G, true);
    var copia2_v3 = __spreadArray([], torre_B, true);
    var jogadas_player2 = iniciar_jogo(nome_jogador_2, copia2_v1, copia2_v2, copia2_v3);
    var vencedor = '';
    if (jogadas_player1 === jogadas_player2)
        vencedor = 'EMPATE';
    else {
        vencedor = jogadas_player1 < jogadas_player2 ? nome_jogador_1 : nome_jogador_2;
    }
    (0, utils_game_js_1.print)("\t------------------------------------\n\t>>> Jogador ".concat(vencedor, " VENCEU ! <<<\n\t-------------------------------------\n\t>>> Jogadas Jogador 1 ").concat(nome_jogador_1, ": ").concat(jogadas_player1, " jogadas\n\t>>> Jogadas Jogador 2 ").concat(nome_jogador_2, ": ").concat(jogadas_player2, " jogadas\n"));
}
main();
function iniciar_jogo(nome, torre1, torre2, torre3) {
    //acaba quando o jogador completar o jogo (RETORNAR QUANTIDADE DE MOVIMENTOS)
    (0, utils_game_js_1.print)("\n >>> Jogador ".concat(nome, "! O jogo COME\u00C7OU!\n"));
    (0, utils_game_js_1.print)("\n>>> Quantidade minima de movimentos: ".concat((0, utils_game_js_1.numero_jogadas_minimas)(torre1.length), "\n"));
    var jogadas = 0;
    var torre_R = torre1;
    var torre_G = torre2;
    var torre_B = torre3;
    while (!(jogo_finalizado(torre_R, torre_G, torre_B))) {
        (0, utils_game_js_1.print)(' >>> ESTADO DAS TORRE <<<\n');
        (0, utils_game_js_1.print)("Torre de R ---> " + imprimir_torre(torre_R));
        (0, utils_game_js_1.print)("Torre de G ---> " + imprimir_torre(torre_G));
        (0, utils_game_js_1.print)("Torre de B ---> " + imprimir_torre(torre_B));
        var operacao_user = (0, utils_game_js_1.get_operation)('\n>> selecione o movimento (Ex: RG , Item de Torre R para Torre G): ');
        var torre_origem = [], torre_destino = [];
        switch (operacao_user) {
            case 'RG':
                torre_origem = torre_R;
                torre_destino = torre_G;
                break;
            case 'RB':
                torre_origem = torre_R;
                torre_destino = torre_B;
                break;
            case 'GR':
                torre_origem = torre_G;
                torre_destino = torre_R;
                break;
            case 'GB':
                torre_origem = torre_G;
                torre_destino = torre_B;
                break;
            case 'BR':
                torre_origem = torre_B;
                torre_destino = torre_R;
                break;
            case 'BG':
                torre_origem = torre_B;
                torre_destino = torre_G;
                break;
        }
        if (torre_origem.length === 0) {
            (0, utils_game_js_1.print)('');
            (0, utils_game_js_1.print)('>>> Erro! Torre de Origem Vazia!');
            (0, utils_game_js_1.print)('');
        }
        else {
            torre_destino.push(torre_origem.pop());
            jogadas++;
            (0, utils_game_js_1.print)('\n>>> Movimentos Efetudos: ' + jogadas);
        }
    }
    (0, utils_game_js_1.print)("\n >>> Parabens Jogador ".concat(nome, "! Voce completou ").concat(jogadas, " jogadas !\n"));
    return jogadas;
}
function jogo_finalizado(torreR, torreG, torreB) {
    if ((0, utils_game_js_1.e_igual)(torreR, function (elem) { return elem === 'R'; }) &&
        (0, utils_game_js_1.e_igual)(torreG, function (elem) { return elem === 'G'; }) &&
        (0, utils_game_js_1.e_igual)(torreB, function (elem) { return elem === 'B'; })) {
        return true;
    }
    return false;
}
function imprimir_torre(torre) {
    var img = torre.length > 0 ? torre.join(' ') : '[ vazio ]';
    return img;
}
function distribuir_itens_torres(nivel) {
    if (nivel === 1) {
        return iniciar_itens_nivel_1();
    }
    else if (nivel === 2) {
        return iniciar_itens_nivel_2();
    }
    else {
        return iniciar_itens_nivel_3();
    }
}
function iniciar_itens_nivel_1() {
    var torre_1 = [], torre_2 = [], torre_3 = [];
    var itens = 'RGB'.split('');
    while (torre_1.length !== 9) {
        torre_1.push(itens[(0, utils_game_js_1.random_number)(0, 2)]);
    }
    return [torre_1, torre_2, torre_3];
}
function iniciar_itens_nivel_2() {
    var torre_1 = [], torre_2 = [], torre_3 = [];
    var itens = 'RGB'.split('');
    while (torre_1.length + torre_2.length + torre_3.length !== 9) {
        var torre = (0, utils_game_js_1.random_number)(1, 3);
        if (torre === 1 && torre_1.length < 4) {
            torre_1.push(itens[(0, utils_game_js_1.random_number)(0, itens.length - 1)]);
        }
        else if (torre === 2 && torre_2.length < 3) {
            torre_2.push(itens[(0, utils_game_js_1.random_number)(0, itens.length - 1)]);
        }
        else if (torre === 3 && torre_3.length < 2) {
            torre_3.push(itens[(0, utils_game_js_1.random_number)(0, itens.length - 1)]);
        }
    }
    //verificaçao para que todas torres devem ter pelo menos um ou mais valores
    if (torre_1.length === 0 || torre_2.length === 0 || torre_3.length === 0)
        return iniciar_itens_nivel_2();
    return [torre_1, torre_2, torre_3];
}
function iniciar_itens_nivel_3() {
    var torre_1 = [], torre_2 = [], torre_3 = [];
    var itens = 'RGB'.split('');
    while (torre_1.length + torre_2.length + torre_3.length !== 9) {
        var torre = (0, utils_game_js_1.random_number)(1, 3);
        if (torre === 1 && torre_1.length < 3) {
            torre_1.push(itens[(0, utils_game_js_1.random_number)(0, itens.length - 1)]);
        }
        else if (torre === 2 && torre_2.length < 3) {
            torre_2.push(itens[(0, utils_game_js_1.random_number)(0, itens.length - 1)]);
        }
        else if (torre === 3 && torre_3.length < 3) {
            torre_3.push(itens[(0, utils_game_js_1.random_number)(0, itens.length - 1)]);
        }
    }
    //verificaçao para que todas torres devem ter pelo menos um ou mais valores
    if (torre_1.length === 0 || torre_2.length === 0 || torre_3.length === 0)
        return iniciar_itens_nivel_2();
    return [torre_1, torre_2, torre_3];
}
//# sourceMappingURL=hanoi_game.js.map