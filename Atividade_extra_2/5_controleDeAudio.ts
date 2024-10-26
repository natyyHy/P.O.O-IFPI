class controleDeAudio{

    volume: number;

    constructor(volume: number){
        this.volume = 2;
    }

    aumentarVolume(): void{
        if(this.volume < 10){
            this.volume += 1;
        }
    }

    diminuirValor(): void{
        if(this.volume > 0){
            this.volume -= 1;
        }
    }

    lerVolume(): number{
        return this.volume;
    }
}

const audiocarro = new controleDeAudio(4)

console.log(controleDeAudio)