class saudacao {
    texto: string;
    destinatario: string;

    constructor(texto: string, destinatario:string){
        this.texto = texto;
        this.destinatario = destinatario;
    }

    obterSaudacao(): string{
        return this.texto + ', ' + this.destinatario;
    }
}

let msg : saudacao = new saudacao('Ola','naty');
console.log(msg.obterSaudacao());