//FUNCAO MAPEAR

const numeros = [1,2,3,4]

const mapear = (Array:number[], transformar:Function) => {
    let novo: number[] = []
    Array.forEach(element => {
        novo.push(transformar(element))
    });
    return novo
}

const dobrar = (item:number):number => item * 2

const numeros_dobrados = mapear(numeros,dobrar)

console.log(numeros_dobrados)

//FUNÇAO REDUCE

const reduce = (Array1:number[], acumulador:number,transformar:Function): number => {
    Array1.forEach(element => {
        acumulador = transformar(acumulador,element)
    });
    return acumulador
}

const somar = (x:number,y:number) => x + y
const somatorio = reduce(numeros_dobrados,0,somar)
console.log(somatorio)

//VERSAO DIRETA

const numeros1 = [4,3,2,1]
const dobrados:number[] = numeros1.map((numero) => numero * 2)
console.log(dobrados)

const somatorio1 = dobrados.reduce((numero,acumulador) => acumulador + numero,0)
console.log(somatorio1)