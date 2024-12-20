import prompt from "prompt-sync";
import { Cliente, Conta } from "./quest04";
import { Banco } from "./quest03";

function print(text : string | number | Cliente[] | Conta[] | Banco): void {
    return console.log(text

    )
}

function input(pergunta: string): string {
    const promptSync = prompt();
    return promptSync(pergunta);
}

export {input , print}