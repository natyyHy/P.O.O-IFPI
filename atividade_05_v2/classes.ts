
import {Conta, Banco} from "./banco"

export class Cliente {
    id : number ;
    nome : string;
    cpf : string ;
    data_nascimento: string ;
    contas : Conta[];

    constructor(id: number, nome: string , cpf: string , data_nascimento: string, contas: []){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = contas;
    }

    

}


export class Postagem {
    id : number;
    texto : string;
    qtd_curtidas : number;

    constructor(id: number , texto: string, qtd_curtidas: number){
        this.id = id;
        this.texto = texto;
        this.qtd_curtidas = qtd_curtidas;
    }

    curtir() : void {
        this.qtd_curtidas++;
    }

    toString() : string {
        if(this.texto === '' || this.qtd_curtidas === 0) {
            console.log("Nao ha curtidas ou nao ha postagem");
            return '';
        }

        return this.texto + "\n" + "CURTIDAS:\N" + this.qtd_curtidas
    }

}

export class Microblog {

    postagens: Postagem[];

    constructor(postagens: Postagem[]){
        this.postagens = postagens;
    }

    buscar_IndicePostagem(id:number): number{
        let pos = -1;
        for(let i = 0;i < this.postagens.length;i++){
            if(id === this.postagens[i].id){
                pos = i;
                break;
            }
        }
        return pos;
    }

    buscar_postagem(id: number) : Postagem{
        let post !: Postagem;
        let indice = this.buscar_IndicePostagem(id);
        if(indice === -1){ console.log("postagem nao encontrada");}else{
            post = this.postagens[indice];
        }
        return post;
    }

    incluir_postagem(obj_postagem: Postagem) : void {
        this.postagens.push(obj_postagem);
    }

    excluir_postagem(id: number) : void{
        let indice : number = this.buscar_IndicePostagem(id);
        if(indice == -1){
            console.log("Id de postagem nao encontrado");
            return;
        }
        for(let i = indice; i < this.postagens.length;i++){
            this.postagens[i] = this.postagens[i + 1];
        }

        this.postagens.pop();
    }

    postagem_maisCurtida() : Postagem | void {
        if(this.postagens.length == 0) {console.log("nao ha postagens"); return;}
        let postagemMaior: Postagem = this.postagens[0];

        for(let i = 1; i < this.postagens.length - 1; i++){
            if(postagemMaior.qtd_curtidas < this.postagens[i].qtd_curtidas){
                postagemMaior = this.postagens[i];
            }
        }
        return postagemMaior;
    }

    curtir(id: number){
        let postagem : Postagem = this.buscar_postagem(id);
        postagem.curtir;
    }

    toString() : string {
        let concatenacao = '';
        for(let i = 0; i < this.postagens.length;i++){
            if(i === this.postagens.length){
                concatenacao += this.postagens[i].toString();
            }else{
                concatenacao += this.postagens[i].toString() + "\n\n";
            }
            
        }
        return concatenacao;
    }
}
