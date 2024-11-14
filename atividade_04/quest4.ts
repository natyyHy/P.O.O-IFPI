class Radio { 
    volume : number;
    constructor(volume : number= 0) { 
        this.volume = volume;
    } 
} 
let n : Radio = new Radio(); 
n.volume = 10; 


class radio { 
    volume : number;
    constructor(volume? : number) { 
        this.volume = volume ?? 0;
    } 
} 
let r : radio = new radio(); 
r.volume = 10; 