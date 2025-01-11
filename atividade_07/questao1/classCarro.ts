class Carro extends Veiculo {
    public roda: number;
    public cor: string;

    constructor(placa: string,ano: number,modelo: string,roda : number, cor: string){
        super(placa,ano,modelo);
        this.roda = roda;
        this.cor = cor;
    }
}