
import {Conta} from "./banco"

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
