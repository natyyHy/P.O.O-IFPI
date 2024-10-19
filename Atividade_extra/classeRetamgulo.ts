class Retangulo {
    l1: number;
    l2: number;

    constructor(l1: number, l2: number) {
        this.l1 = l1;
        this.l2 = l2;
    }

    calcularPerimetro(): number {
        return 2 * (this.l1 + this.l2);
    }
}

const retangulo = new Retangulo(4, 3);

console.log(retangulo.calcularPerimetro());