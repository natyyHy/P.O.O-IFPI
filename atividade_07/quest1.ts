
class Veiculo {
    public placa: string;
    public ano: number;
    public modelo: string;

    constructor (placa: string , ano: number, modelo : string){
        this.placa = placa;
        this.ano = ano;
        this.modelo = modelo;
    }
}

class Carro extends Veiculo {
    public roda: number;
    public cor: string;

    constructor(placa: string,ano: number,modelo: string,roda : number, cor: string){
        super(placa,ano,modelo);
        this.roda = roda;
        this.cor = cor;
    }
}

class CarroEletrico extends Veiculo {
    public autonomiaBateria : number;
    
    constructor(placa: string,ano: number,modelo: string,bacteria : number){
        super(placa,ano,modelo);
        this.autonomiaBateria = bacteria;
    }
}