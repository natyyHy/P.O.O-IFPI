
import {Banco} from "../questao4/classBanco"
import {App} from "../questao4/classApp"


function main(){
    let bancoNovo : Banco = new Banco();
    let appNovo : App = new App(bancoNovo);

    appNovo.menu();
}

main();