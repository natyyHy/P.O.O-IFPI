import prompt from "prompt-sync";
function input(pergunta: string): string {
    const promptSync = prompt();
    return promptSync(pergunta);
}


function print(text: string){
    return console.log(text);
}

export {print, input}