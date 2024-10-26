class Retangulo_v2 {
    l1: number;
    l2: number;

    constructor(l1: number, l2: number) {
        this.l1 = l1;
        this.l2 = l2;
    }

    calcularPerimetro(): number {
        return 2 * (this.l1 + this.l2);
    }

    its_retamgulo():boolean{
        return this.l1 === this.l2
    }
}

const retangulo_v2 = new Retangulo_v2(4, 3);
const retangulo_v3 = new Retangulo_v2(3 , 3)

console.log(retangulo_v2.calcularPerimetro());
console.log(retangulo_v3.its_retamgulo())