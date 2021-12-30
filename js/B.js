class NodoB{
    constructor(dato){
        this.dato = dato;
        // para la lista (doblemente enlazada)
        this.siguiente = null;
        this.anterior = null;
        // para las paginas
        this.izquierda = null;
        this.derecha = null;
    }
}

class ListaB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    // pasamos por parámetro el nodo 
    add(nuevo){
        // si no hay ningún dato
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        // si hay datos en la lista
        }else{
            // si el dato nuevo es menor que el primero
            if(nuevo.dato.id < this.primero.dato.id){
                nuevo.siguiente = this.primero;
                this.primero.anterior = nuevo;
                // punteros de la página
                this.primero.izquierda = nuevo.derecha;
                this.primero = nuevo;
                this.size++;
                return true;
            // si el dato nuevo es mayor que el último
            }else if(nuevo.dato.id > this.ultimo.dato.id){
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                // punteros de la página
                this.ultimo.derecha = nuevo.izquierda;
                this.ultimo = nuevo;
                this.size++;
                return true;
            // si no es menor que el primero o mayor que el último entonces se recorre la lista
            }else{
                let aux = this.primero;
                while(aux != null){
                    // si el dato es menor que el auxiliar entonces se inserta una posición antes
                    if(nuevo.dato.id < aux.dato.id){
                        nuevo.siguiente = aux;
                        nuevo.anterior = aux.anterior;
                        // punteros de la página
                        aux.izquierda = nuevo.derecha;
                        aux.anterior.derecha = nuevo.izquierda;
                        aux.anterior.siguiente = nuevo;
                        aux.anterior = nuevo;
                        this.size++;
                        return true;
                    }else if(nuevo.dato.id == aux.dato.id){
                        // si el dato nuevo es igual al dato de la lista no se insertará
                        return false; 
                    }
                    aux = aux.siguiente;
                }
            }
        }
    }  
}

class Pagina{
    constructor(){
        this.esRaiz = false;
        this.MAX_CLAVES = 4;
        this.MIN_CLAVES = 2;
        this.size = 0;
        this.claves = new ListaB();
    }

    addPagina(nuevo){
        if(this.claves.add(nuevo)){ // si se inserta en nodo en la lista
            this.size = this.claves.size;
            // si la página tiene menos nodos que el máximo, retorna la página
            if(this.size < this.MAX_CLAVES + 1){
                return this;
            // si supera el máximo de claves la página se tiene que romper
            }else{
                // ojo: retorna un nodo con páginas hijas
                return this.romperPagina(this);
            }
        }
        return null;
    }

    romperPagina(paginaAux){
        let medio = paginaAux.claves.primero;
        for(let i = 0; i<2; i++){
            // aquí tenemos el dato que está a la mitad
            medio = medio.siguiente;
        }

        // nodos de la pagina llena
        let primero = paginaAux.claves.primero;
        let segundo = paginaAux.claves.primero.siguiente;
        let tercero = paginaAux.claves.ultimo.anterior;
        let cuarto = paginaAux.claves.ultimo;

        // eliminando referencias de los nodos
        primero.siguiente = null;
        primero.anterior = null;
        segundo.siguiente = null;
        segundo.anterior = null;
        tercero.siguiente = null;
        tercero.anterior = null;
        cuarto.siguiente = null;
        cuarto.anterior = null;
		medio.siguiente = null;
        medio.anterior = null;

        // creando las páginas nuevas desde el nodo de medio
        medio.izquierda = new Pagina();
        medio.izquierda.addPagina(primero);
        medio.izquierda.addPagina(segundo);
        medio.derecha = new Pagina();
        medio.derecha.addPagina(tercero);
        medio.derecha.addPagina(cuarto);
        return medio;
    }

    // método para seber si la página es una hoja
    esHoja(paginaAux){
        if(paginaAux.claves.primero.izquierda == null){
            return true;
        }
        return false;
    }
}

class ArbolB{
    constructor(){
        this.raiz = null;
        this.orden = 5;
        this.altura = 0;
        this.dot = '';
    }

    add(dato){
        let nuevo = new NodoB(dato);
        // si no existe la raíz, el nuevo nodo es la raíz
        if(this.raiz == null){
            this.raiz = new Pagina();
            this.raiz.esRaiz = true;
            this.raiz = this.raiz.addPagina(nuevo);
        // si ya existe una raíz, se inserta el nuevo nodo
        }else{
            let respuesta;
            // si la altura es 0, inserta directamente
            if(this.altura == 0){
                respuesta = this.raiz.addPagina(nuevo);
            // si no es 0 la altura, recorre el arbol
            }else{
                respuesta = this.addRecorriendo(nuevo, this.raiz);
            }
            // si la respuesta es una página lo asigna como raíz
            if(respuesta instanceof Pagina){
                this.raiz = respuesta;
            // si es un nodo, se crea una página como raíz y se añaden los nodos
            }else if(respuesta instanceof NodoB){
                this.altura++;
                this.raiz = new Pagina();
                this.raiz = this.raiz.addPagina(respuesta);
            }
        }
    }

    addRecorriendo(nuevo, aux){
        // si es una hoja, inserta el dato
        if(aux.esHoja(aux)){
            return aux.addPagina(nuevo);
        // si no es hoja, se recorre el arbol
        }else{
            let respuesta;
            // si el dato es menor que el primero de la página
            if(nuevo.dato.id < aux.claves.primero.dato.id){
                respuesta = this.addRecorriendo(nuevo, aux.claves.primero.izquierda);
                // si es un nodo se inserta en la página
                if(respuesta instanceof NodoB){
                    return aux.addPagina(respuesta);
                // si es una página se asigna al la izquierda del primero
                }else if(respuesta instanceof Pagina){
                    aux.claves.primero.izquierda = respuesta;
                    return aux;
                }
            // si el dato es mayor que el último de la página
            }else if(nuevo.dato.id > aux.claves.ultimo.dato.id){
                respuesta = this.addRecorriendo(nuevo, aux.claves.ultimo.derecha);
                // si es un nodo se inserta en la página
                if(respuesta instanceof NodoB){
                    return aux.addPagina(respuesta);
                // si es una página se asigna al la izquierda del primero
                }else if(respuesta instanceof Pagina){
                    aux.claves.ultimo.derecha = respuesta;
                    return aux;
                }
            // si los valores están en medio
            }else{
                let auxLista = aux.claves.primero;
                while(auxLista != null){
                    // si el dato es menor que el nodo actual de la lista
                    if(nuevo.dato.id < auxLista.dato.id){
                        let respuesta = this.addRecorriendo(nuevo, auxLista.izquierda);    
                        if(respuesta instanceof NodoB){
                            return aux.addPagina(respuesta);
                        }else if(respuesta instanceof Pagina){
                            auxLista.izquierda = respuesta;
                            auxLista.anterior.derecha = respuesta;
                            return aux;
                        }
                    // si el dato es el mismo que el del nodo actual, no se agrega
                    }else if(nuevo.dato.id == auxLista.dato.id){
                        return aux;
                    }
                    auxLista = auxLista.siguiente;
                }
            }
        }
        return this;
    }

    deserealizarEDD(auxRaiz){
        let s = new Serealizacion();
        auxRaiz = s.cambiazo(new Pagina(), auxRaiz);
        //console.log(auxRaiz)
        auxRaiz.claves = s.cambiazo(new ListaB(), auxRaiz.claves);
        ///console.log(auxRaiz.claves)
        if(!auxRaiz.esHoja(auxRaiz)){ 
            //recorrer los hijos de cada clave
            let aux = auxRaiz.claves.primero;
            while(aux != null){
                aux.izquierda = this.deserealizarEDD(aux.izquierda);
                aux = aux.siguiente;
            }
            auxRaiz.claves.ultimo.derecha = this.deserealizarEDD(auxRaiz.claves.ultimo.derecha); 
        }  
        return auxRaiz;
    }

    buscar(id, auxRaiz, producto){
        let aux = auxRaiz.claves.primero;
        while(aux != null){
            if(aux.dato.id == id){
                producto = aux.dato;
            }
            aux = aux.siguiente;
        }
        if(!auxRaiz.esHoja(auxRaiz)){ 
            //recorrer los hijos de cada clave
            aux = auxRaiz.claves.primero;
            while(aux != null){
                producto = this.buscar(id, aux.izquierda, producto);
                aux = aux.siguiente;
            }
            producto = this.buscar(id, auxRaiz.claves.ultimo.derecha, producto); 
        }  
        return producto;
    }

    // ===============================  VIS JS  ==============================
    dotgen(){
        this.dot = "digraph arbolB{ \n";
        this.dot += "graph [rankdir = TB]\n";
        this.dot += this.dotgenNodos(this.raiz);
        this.dot += this.dotgenEnlace(this.raiz);
        this.dot += "} \n"
    }

    dotgenNodos(auxRaiz){
        let cadena = '';
        let aux;
        //si es una hoja solo se grafica el nodo
        if(auxRaiz.esHoja(auxRaiz)){ 
            cadena += auxRaiz.claves.primero.dato.id + "[shape=\"box\" label=\""
            aux = auxRaiz.claves.primero;
            while(aux != null){
                cadena += "|" + aux.dato.id + "|";
                aux = aux.siguiente;
            }
            cadena += "\"]; \n";
            return cadena;
        }else{
            cadena += auxRaiz.claves.primero.dato.id + "[shape=\"box\" label=\""
            aux = auxRaiz.claves.primero;
            while(aux != null){
                cadena += "|" + aux.dato.id + "|";
                aux = aux.siguiente;
            }
            cadena += "\"]; \n";
            //recorrer los hijos de cada clave
            aux = auxRaiz.claves.primero;
            while(aux != null){
                cadena += this.dotgenNodos(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena += this.dotgenNodos(auxRaiz.claves.ultimo.derecha);
            return cadena;
        }   
    }

    dotgenEnlace(auxRaiz){
        let cadena = "";
        // si es hoja se enlaza
        if(auxRaiz.esHoja(auxRaiz)){
            return "" + auxRaiz.claves.primero.dato.id + "; \n";
        }else{
            let aux = auxRaiz.claves.primero;
            let contador = 0;
            let primeroRaiz = auxRaiz.claves.primero.dato.id;
            while(aux != null){
                cadena += "\n" + primeroRaiz + "->" + this.dotgenEnlace(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            cadena += "\n" + primeroRaiz + "->" + this.dotgenEnlace(auxRaiz.claves.ultimo.derecha);
            return cadena;
        }
    }
    
    // =============================== GRAPHVIZ ==============================
    graphviz(){
        let cadena = "digraph arbolB{ \n";
        cadena += "rankr=TB; \n";
        cadena += "node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"]; \n";
        cadena += this.graficarNodos(this.raiz);
        cadena += this.graficaEnlace(this.raiz);
        cadena += "} \n"
        return cadena;
    }

    graficarNodos(auxRaiz){
        let cadena = '';
        let contador = 0;
        let aux;
        //si es una hoja solo se grafica el nodo
        if(auxRaiz.esHoja(auxRaiz)){ 
            cadena += "node[shape=record label= \"\<p0\>"
            contador = 0;
            aux = auxRaiz.claves.primero;
            while(aux != null){
                contador++;
                cadena += "|{" + aux.dato.id + "}|\<p" + contador + "\>";
                aux = aux.siguiente;
            }
            cadena += "\"]" + auxRaiz.claves.primero.dato.id + "; \n";
            return cadena;
        }else{
            cadena += "node[shape=record label= \"\<p0\>"
            contador = 0;
            aux = auxRaiz.claves.primero;
            while(aux != null){
                contador++;
                cadena += "|{" + aux.dato.id + "}|\<p" + contador + "\>";
                aux = aux.siguiente;
            }
            cadena += "\"]" + auxRaiz.claves.primero.dato.id + "; \n";
            //recorrer los hijos de cada clave
            aux = auxRaiz.claves.primero;
            while(aux != null){
                cadena += this.graficarNodos(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena += this.graficarNodos(auxRaiz.claves.ultimo.derecha);
            return cadena;
        }   
    }

    graficaEnlace(auxRaiz){
        let cadena = "";
        // si es hoja se enlaza
        if(auxRaiz.esHoja(auxRaiz)){
            return "" + auxRaiz.claves.primero.dato.id + "; \n";
        }else{
            let aux = auxRaiz.claves.primero;
            let contador = 0;
            let primeroRaiz = auxRaiz.claves.primero.dato.id;
            while(aux != null){
                cadena += "\n" + primeroRaiz + ":p" + contador + "->" + this.graficaEnlace(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            cadena += "\n" + primeroRaiz + ":p" + contador + "->" + this.graficaEnlace(auxRaiz.claves.ultimo.derecha);
            return cadena;
        }
    }
}