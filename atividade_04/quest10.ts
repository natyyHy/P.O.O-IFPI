class Jogador {
    forca: number;
    nivel: number;
    pontos_atuais: number;

    constructor(forca: number, nivel: number, pontos_atuais: number) {
        this.forca = forca;
        this.nivel = nivel;
        this.pontos_atuais = pontos_atuais;
    }

    calcular_ataque(): number {
        return this.forca * this.nivel;
    }

    atacar(inimigo: Jogador): void {
        if (inimigo.esta_vivo()) {
            inimigo.pontos_atuais -= this.calcular_ataque();
            if (inimigo.pontos_atuais < 0) {
                inimigo.pontos_atuais = 0; // Garante que os pontos de vida não fiquem negativos
            }
        }
    }

    esta_vivo(): boolean {
        return this.pontos_atuais > 0;
    }

    to_string(nome:string): string {
        return `
        >> JOGADOR ${nome} STATUS <<
        Força: ${this.forca}
        Nível: ${this.nivel}
        Pontos de Vida: ${this.pontos_atuais}`;
    }
}

const jogador1 : Jogador = new Jogador(10,3,100);
const jogador2 : Jogador = new Jogador(15,5,100);

console.log(jogador1.to_string('1'))
console.log(jogador2.to_string('2'))

console.log('\nJOGADOR 1 --> ATACA --> JOGADOR 2');
jogador1.atacar(jogador2);

console.log(jogador2.to_string('2'));

console.log('\nJOGADOR 2 --> ATACA --> JOGADOR 1');
jogador2.atacar(jogador1);

console.log(jogador1.to_string('1'));

console.log('\nJOGADOR 2 --> ATACA --> JOGADOR 1');
jogador2.atacar(jogador1);

console.log(jogador1.to_string('1'));

console.log('JOGADOR 1 ESTA VIVO? '+ jogador1.esta_vivo())