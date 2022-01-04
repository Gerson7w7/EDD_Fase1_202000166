class Block{
    constructor(indice, data , previusHash ){
        this.indice = indice;
        this.data  = data ;
        this.previusHash  = previusHash ;
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
        let nuevo = new Block(this.indice, dato, this.cadena[this.indice - 1].hash);
        this.indice++;
        this.cadena.push(nuevo);
    }

    recorrer(){
        for(let item of this.cadena){
            console.log(item);
        }
    }

    // VIS JS
    dotgen(){
        let dot = "digraph blockchain{ \n";
        for(let item of this.cadena){
            dot += item.indice + '[shape="box" label="' + 'Indice:' + item.indice + ",\nPreviusHash:" + item.previusHash 
            + ",\nFecha:" + item.fecha + ",\nHash:" + item.hash + ",\nNonce:" + item.nonce + '"];\n';
        }    
        let aux = null;
        for(let item of this.cadena){
            if(aux != null){
                dot += aux + '--' + item.indice + ';';
            }
            aux = item.indice;  
        }   
        dot += "} \n"
        return dot;
    }

    tablaBlockChain(inner){
        for(let item of this.cadena){
            inner += '<tr><td>' + item.indice + '</td><td>' + item.data + '</td></tr>';
        }
        return inner;
    }

    // GRAPHVIZ
    graphviz(){
        let cadena = "digraph blockchain{ </br>\n";
        cadena += "rankr=TB;</br>\n";
        for(let item of this.cadena){
            cadena += item.indice + '[shape="box" label="' + 'Indice:' + item.indice + ",\nPreviusHash:" + item.previusHash 
            + ",\nFecha:" + item.fecha + ",\nHash:" + item.hash + ",\nNonce:" + item.nonce + '"];\n';
        }    
        let aux = null;
        for(let item of this.cadena){
            if(aux != null){
                cadena += aux + '->' + item.indice + ';';
            }
            aux = item.indice;  
        }   
        cadena += "} \n"
        return cadena;
    }
}