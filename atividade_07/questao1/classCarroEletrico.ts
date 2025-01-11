
class CarroEletrico extends Veiculo {
    public autonomiaBateria : number;
    
    constructor(placa: string,ano: number,modelo: string,bacteria : number){
        super(placa,ano,modelo);
        this.autonomiaBateria = bacteria;
    }
}