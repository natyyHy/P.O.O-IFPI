class triangulo{
    lado1:number;
    lado2:number;
    lado3:number;

    constructor(lado1:number,lado2:number,lado3:number){
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.lado3 = lado3;
    
    }

    is_triangulo(): boolean {
        return ((this.lado2 - this.lado3 < this.lado1 ) && (this.lado1 < this.lado2 + this.lado3)) ? true : false;
    }

    ehIsoceles(): boolean {
        if(!(this.is_triangulo())) return false;
        return (this.lado1 === this.lado2 || this.lado2 === this.lado3 || this.lado3 === this.lado1 ) ? true : false;
        
    }

    ehEquilatero():boolean{
        if(!(this.is_triangulo())) return false;
        return (this.lado1 === this.lado2 && this.lado2 === this.lado3 && this.lado3 === this.lado1 ) ? true : false;
    }

    ehEscaleno(): boolean {
        if(!(this.is_triangulo())) return false;
        return (this.lado1 !== this.lado2 && this.lado2 !== this.lado3 && this.lado3 !== this.lado1 ) ? true : false;
    }
}


let triang : triangulo = new triangulo(5,5,4);
console.log(triang.is_triangulo())

console.log("\n")

//isoceles
const triang1 = new triangulo(6,5,5)
console.log('isoceles: ' + triang1.ehIsoceles());
console.log('equilatero: ' + triang1.ehEquilatero());
console.log('escaleno: ' + triang1.ehEscaleno());

console.log("\n")

//equilatero
const triang2 = new triangulo(5,5,5);
console.log('isoceles: ' + triang2.ehIsoceles());
console.log('equilatero: ' + triang2.ehEquilatero());
console.log('escaleno: ' + triang2.ehEscaleno());

console.log("\n")

//escaleno
const triang3 = new triangulo(5,6,7);
console.log('isoceles: ' + triang3.ehIsoceles());
console.log('equilatero: ' + triang3.ehEquilatero());
console.log('escaleno: ' + triang3.ehEscaleno());