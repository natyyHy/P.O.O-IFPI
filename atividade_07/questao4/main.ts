
import {Banco} from "./classBanco"
import {App} from "./classApp"


function main(){
    let bancoNovo : Banco = new Banco();
    let appNovo : App = new App(bancoNovo);

    appNovo.menu();
}

main();