class equipamento{
    ligado:boolean;

    constructor(ligado:boolean=false){
        this.ligado = ligado;
    }

    liga(){
        if(this.ligado) return console.log('Aparelho ja esta ligado')
        this.ligado = true;
    }
    desligar(){
        if(!this.ligado) return console.log('Aparelho ja esta desligado')
        this.ligado = false;
    }

    inverte():void{
        if(this.ligado){
            this.desligar()
        }else{
            this.liga()
        }
    }

    estaLigado():boolean{
        return this.ligado;
    }

}


const celular : equipamento = new equipamento();
console.log("esta ligado? ");
console.log('SISTEMA: ' + celular.estaLigado())
console.log('ligando celular...')

celular.liga()

console.log("esta ligado?")
console.log('SISTEMA: ' + celular.estaLigado())
console.log("ligando celular novamente...")
console.log('SISTEMA: ')

celular.liga()

console.log("invertendo...")
celular.inverte()

console.log("esta ligado?")
console.log('SISTEMA: ' + celular.estaLigado())

console.log('desligando celular...')

console.log('SISTEMA: ')
celular.desligar()
