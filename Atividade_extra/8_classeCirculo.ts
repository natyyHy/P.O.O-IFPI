class circulo {
    raio: number;

    constructor(raio: number){
        this.raio = raio;
    }

    calcularArea(): number{
        return (this.raio)**2 * 3.14; 
    }

    calcularPerimetro():number{
        return 2 * 3.14 * this.raio
    }
}

const circulo_v1 = new circulo(4);

console.log(circulo_v1.calcularArea())
console.log(circulo_v1.calcularPerimetro())
