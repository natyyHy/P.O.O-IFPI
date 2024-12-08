import prompt from "prompt-sync";

export function print(texto : string) : void {
    console.log(texto);
}

export function input(pergunta: string): string {
    const promptSync = prompt();
    return promptSync(pergunta);
}