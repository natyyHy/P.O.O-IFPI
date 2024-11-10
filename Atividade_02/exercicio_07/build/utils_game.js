"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numero_jogadas_minimas = exports.e_igual = void 0;
exports.get_number_min = get_number_min;
exports.get_text = get_text;
exports.print = print;
exports.random_number = random_number;
exports.get_operation = get_operation;
var readline_sync_1 = require("readline-sync");
function get_number_min(msg, min) {
    var numero = Number((0, readline_sync_1.question)(msg));
    if (numero < min) {
        print("\n>>> Numero deve ser maior ou igual a ".concat(min, "!"));
        return get_number_min(msg, min);
    }
    return numero;
}
function get_text(msg) {
    return (0, readline_sync_1.question)(msg);
}
function print(msg) {
    return console.log(msg);
}
function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function get_operation(msg) {
    var entrada = (0, readline_sync_1.question)(msg).toUpperCase();
    var entrada_array = entrada.split('');
    if (entrada_array.length > 2) {
        print('>> Possivel apenas 1 movimento!');
        return get_operation(msg);
    }
    else if ((['R', 'G', 'B'].includes(entrada_array[0]) &&
        ['R', 'G', 'B'].includes(entrada_array[1])) === false) {
        print('>> Item desconhecido!');
        return get_operation(msg);
    }
    else if (entrada_array[0] === entrada_array[1]) {
        print('>> Itens nao podem ser IGUAIS!');
        return get_operation(msg);
    }
    return entrada;
}
var e_igual = function (vetor, criterio) {
    var total = 0;
    for (var _i = 0, vetor_1 = vetor; _i < vetor_1.length; _i++) {
        var i = vetor_1[_i];
        if (criterio(i))
            total++;
    }
    if (total === vetor.length)
        return true;
    return false;
};
exports.e_igual = e_igual;
var numero_jogadas_minimas = function (tamanho) {
    return Math.pow(2, tamanho) - 1;
};
exports.numero_jogadas_minimas = numero_jogadas_minimas;
//# sourceMappingURL=utils_game.js.map