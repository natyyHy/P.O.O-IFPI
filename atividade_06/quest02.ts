
class Hora {
    private _hora : number;
    private _minutos : number;
    private _segundos : number;

    constructor(hora : number , minutos : number , segundos : number){
        this._hora = hora;
        this._minutos = minutos;
        this._segundos = segundos;
    }

    get lerHora() : number{
        return this._hora
    }

    get lerMinutos() : number{
        return this._minutos
    }

    get lerSegundos() : number{
        return this._segundos
    }
    
    public lerTempo() : string {
        return `${this._hora}:${this._minutos}:${this._segundos}`
    }
}


let horario : Hora = new Hora(4, 13, 23);

console.log(horario.lerHora);
console.log(horario.lerMinutos);
console.log(horario.lerSegundos);


let tempo : string = horario.lerTempo();

console.log(tempo);