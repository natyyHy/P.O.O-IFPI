import * as fs from 'fs'
import { Conta } from './classConta'
import { Poupanca } from './classPoupanca';
import { ContaImposto } from './classContaImposto';
import { ContaSalario } from './claasContaSalario';

export function read_file(caminho_arquivo: string) : Conta[] {
    let conta : Conta;
    let contas : Conta[] = [];
        const dados : string = fs.readFileSync(caminho_arquivo,'utf-8');
        const linhas : string[] = dados.split('\n');
        for(let linha of linhas){
            const campo: string[] = linha.split(';');
            const tipo = campo[0];
            const numero = campo[1];
            const saldo = Number(campo[2]);
            const id = Number(campo[campo.length - 2]);
            if(tipo === 'C'){
                contas.push(conta = new Conta(numero,saldo,id,null));
            }else if(tipo === 'CP'){
                const taxa = Number(campo[linha.length - 2]);
                contas.push(conta = new Poupanca(numero,saldo,id,null,taxa))
            }else if(tipo === 'CS'){
                const limite = Number(campo[campo.length - 3])
                contas.push(conta = new ContaSalario(numero,saldo,id,null,limite))
            }
            else{
                contas.push(conta = new ContaImposto(numero,saldo,id,null));
            }
        }
    return contas;
}
