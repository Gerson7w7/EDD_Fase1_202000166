class Block{
    constructor(i, dato, hashPrevio){
        this.i = i;
        this.dato = dato;
        this.hashPrevio = hashPrevio;
        this.fecha = Date.now();
        this.hash = this.crearHash();
        this.nonce = 0;
        this.pruebaTrabajo(3);
    }

    crearHash(){
        // aquí se usa la librería
        let bitArray = sjcl.hash.sha256.hash(this.indice+this.data+this.fecha+this.previusHash+this.nonce);  
        let digest_sha256 = sjcl.codec.hex.fromBits(bitArray); 
        return digest_sha256;
    }

    pruebaTrabajo(dificultad){
        while(this.hash.substring(0, dificultad) !== Array(dificultad + 1).join('0')){
            this.nonce++;
            this.hash = this.crearHash();
            console.log(this.nonce);
        }
        return this.hash;
    }
}

class Chain{
    constructor(){
        this.indice = 0;
        this.cadena = [];
        this.cadena.push(this.bloqueGenesis());
    }

    bloqueGenesis(){
        let genesis = new Block(this.indice, 'Bloque Genesis', '');
        this.indice++;
        return genesis;
    }

    add(dato){
        let nuevo = new Bloque(this.indice, dato, this.cadena[this.indice - 1].hash);
        this.indice++;
        this.cadena.push(nuevo);
    }

    recorrer(){
        for(let item of this.cadena){
            console.log(item);
        }
    }
}