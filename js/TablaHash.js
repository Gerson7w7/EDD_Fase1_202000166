class NodoHash{
    constructor(dato){
        this.dato = dato;
    }
}

class TablaHash{
    constructor(){
        this.size = 7;  
        this.claves = this.initArreglo(this.size);
        this.clavesUsed = 0;   
        this.id = 0;  
    }

    initArreglo(size){
        // inicializamos el arreglo de n posiciones y lo llenamos con null
        let claves = [];
        for(let i = 0; i < size; i++){
            claves[i] = null;
        }
        return claves;
    }

    metodoDivision(dato){
        // retornamos el módulo dato mod size
        return dato % this.size;
    }

    conlisionesCuadratico(indice){
        let nuevoIndice = 0;
        let i = 0
        let disponible = false;
        while(disponible == false){
            // calculando el nuevo índice
            nuevoIndice = indice + (i*i);
            // si el nuevo indice excede el tamaño del arreglo
            if(nuevoIndice >= this.size){
                nuevoIndice = nuevoIndice - this.size;
            }
            // verficamos si el nuevo índice está disponible
            if(this.claves[nuevoIndice] == null){
                disponible = true;
            }
            i++;
        }
        return nuevoIndice;
    }

    // enviamos por parámetro el nodo nuevo
    add(nuevo){
        // aquí asignamos un id automáticamente
        this.id++;
        nuevo.dato.idVenta = this.id;
        let indice = this.metodoDivision(this.id);
        // verificamos que el índice esté disponible
        if(this.claves[indice] == null){
            this.claves[indice] = nuevo;
            this.clavesUsed++;
        // si está ocupado, solucionamos la colisión
        }else{
            indice = this.conlisionesCuadratico(indice);
            this.claves[indice] = nuevo;
            this.clavesUsed++;
        }
        // verificamos si se tiene que hacer rehashing
        let densidad = this.clavesUsed / this.size;
        if(densidad >= 0.5){
            this.rehashing();
        }
    }

    rehashing(){
        let primo = false;
        let nuevoSize = this.size;
        while(primo == false){
            nuevoSize++;
            let divisibilidad = 0;
            for(let i = nuevoSize; i > 0; i--){
                // si el tamaño se divide exactamente, es divisible por ese número
                if(nuevoSize % i == 0){
                    divisibilidad++;
                }
            }
            // si se dividió 2 veces, es un número primo
            if(divisibilidad == 2){
                primo = true;
            }
        }
        // haciendo el rehashing
        // guardando las claves de la anterior tabla hash
        let clavesAntiguas = this.claves;
        this.size = nuevoSize;
        this.claves = this.initArreglo(this.size);
        this.clavesUsed = 0;
        this.id = 0;
        // insertando las claves antiguas en el nuevo arreglo
        for(let i = 0; i < clavesAntiguas.length; i++){
            // solo insertará si la posición está ocupada
            if(clavesAntiguas[i] != null){
                this.add(clavesAntiguas[i]);
            }
        }
    }

    deserealizarEDD(){
        let s = new Serealizacion();
        for(let i = 0; i < this.size; i++){
            if(this.claves[i] != null){
                this.claves[i].dato.productos = s.cambiazo(new ListaDoble(), this.claves[i].dato.productos);
            }   
        }
    }

    recorrer(){
        for(let i = 0; i < this.size; i++){
            if(this.claves[i] != null){
                console.log('-->' + this.claves[i].dato);
            }else{
                console.log('--null');
            }
        }
    }

    // ==================== GRAPHVIZ =================
    graphviz(){
        let cadena = "digraph hash{ </br>\n";
        cadena += "nodesep=.05; \nrankr=TB; </br>\n";
        cadena += "node [shape=record,width=.1,height=.1]; </br>\n";
        cadena += 'node0[label ="'
        for(let i = 0; i < this.size; i++){
            if(i != this.size - 1){
                if(this.claves[i] != null){
                    cadena += this.claves[i].dato.idVenta + "|";
                }else{
                    cadena += "|";
                }
            }else{
                if(this.claves[i] != null){
                    cadena += this.claves[i].dato.idVenta;
                }
            }     
        } 
        cadena += '", height=0.5]; </br>\n}';
        return cadena;
    }

    // ==================== VIS JS =================
    dotgen(){
        this.dot = "digraph hash{ \n";
        this.dot += "graph [rankdir = TB]\n";
        this.dot += "nodesep=.05;\n";
        this.dot += "node [shape=record,width=.1,height=.1];\n";
        this.dot += 'node0[shape="box" label ="'
        for(let i = 0; i < this.size; i++){
            if(i != this.size - 1){
                if(this.claves[i] != null){
                    this.dot += this.claves[i].dato.idVenta + "  |";
                }else{
                    this.dot += "  |";
                }
            }else{
                if(this.claves[i] != null){
                    this.dot += this.claves[i].dato.idVenta;
                }
            }     
        } 
        this.dot += '", height=0.5];\n}';
    }
}