import * as fs from "fs"
import {ContaImposto,ContaSalario,Conta,ContaPoupanca} from "./classConta"

export function write_file(contas: Conta[],nomearquivo: string) : void{
    let conteudo : string[] = []
    for(let conta of contas){
        const numero: string = conta.lerNumero;
        const saldo : number = conta.lerSaldo;
        const id: number = conta.lerId;
        const titular : string = (conta.lerCliente === undefined) ? 'nenhum' : conta.lerCliente + ''
        
        if(conta instanceof ContaPoupanca){
            conteudo.push([`CP`, `${numero}`,`${saldo}`,`${(conta.lerTaxa * 100)}`,`${id}`,`${titular}`].join(';'))
        }else if(conta instanceof ContaImposto){
            conteudo.push([`CI`, `${numero}`,`${saldo}`,`${conta.lerTaxaImposto * 100}`,`${id}`,`${titular}`].join(';'))
        }else if(conta instanceof ContaSalario){
            conteudo.push([`CS`, `${numero}`, `${saldo}`,`${conta.lerLimite}`, `${id}`,`${titular}`].join(';'))
        }
        else{
            conteudo.push([`C`, `${numero}`,`${saldo}`,`${id}`,`${titular}`].join(';'))
        }
    }

    conteudo.join('\n');
    fs.writeFileSync(nomearquivo, conteudo.join('\n'), 'utf-8');
}