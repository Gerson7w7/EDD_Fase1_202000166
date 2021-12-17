class NodoDatos{
    constructor(dato, x, y){
        // atributos del nodo
        this.dato = dato;
        this.x = x;
        this.y = y;
        // punteros para x
        this.izquierda = null;
        this.derecha = null;
        // punteros para y
        this.arriba = null;
        this.abajo = null;
    }
}

class ListaDatos{
    constructor(){
        this.primero = null;
    }

    addX(dato, x, y){ // se compara con y & se ingresa x
        let nuevo = new NodoDatos(dato, x, y);
        if(this.primero == null){
            // el primer dato de la lista de datos
            this.primero = nuevo;
        }else{
            // si la posición en y del nodo nuevo es menor que el primero del primer nodo, entonces pasa a ser el primer nodo
            if(nuevo.y < this.primero.y){
                nuevo.derecha = this.primero;
                this.primero.izquierda = nuevo;
                this.primero = nuevo;
            }else{
                // si la posición en y no es menor que el primero, entonces rrecorremos la lista
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.y < aux.y){
                        // si la posición del nuevo es menor a la posición actual de la lista en y
                        nuevo.derecha = aux;
                        nuevo.izquierda = aux.izquierda;
                        aux.izquierda.derecha = nuevo;
                        aux.izquierda = nuevo;   
                        break;                   
                    }else if(aux.derecha == null){
                        // si a la derecha está nulo, quiere decir que el nuevo nodo será el último de la lista
                        aux.derecha = nuevo;
                        nuevo.izquierda = aux;
                        break;
                    }
                    aux = aux.derecha;
                }
            }
        }

    }

    addY(dato, x, y){ // se compara con x & se ingresa y
        let nuevo = new NodoDatos(dato, x, y);
        if(this.primero == null){
            // el primer dato de la lista de datos
            this.primero = nuevo;
        }else{
            // si la posición en x del nodo nuevo es menor que el primero del primer nodo, entonces pasa a ser el primer nodo
            if(nuevo.x < this.primero.x){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                // si la posición en x no es menor que el primero, entonces rrecorremos la lista
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.x < aux.x){
                        // si la posición del nuevo es menor a la posición actual de la lista en x
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba = nuevo;   
                        break;                   
                    }else if(aux.abajo == null){
                        // si a la derecha está nulo, quiere decir que el nuevo nodo será el último de la lista
                        aux.abajo = nuevo;
                        nuevo.arriba = aux;
                        break;
                    }
                    aux = aux.abajo;
                }
            }
        }
    }

    // recorrido de las x (hacia los lados)
    reocorrerX(){
        let aux = this.primero
        while(aux != null){
            console.log('dato: ' + aux.dato + ', x: ' + aux.x + ', y: ' + aux.y);
            aux = aux.derecha;
        }
    }

    reocorrerY(){
        let aux = this.primero
        while(aux != null){
            console.log('dato: ' + aux.dato + ', x: ' + aux.x + ', y: ' + aux.y);
            aux = aux.abajo;
        }
    }
}


class NodoCabecera{
    constructor(dato){
        this.dato = dato;
        // punteros para las cabeceras
        this.siguiente = null;
        this.anterior = null;
        // lista con los datos de la matriz
        this.listaDatos = new ListaDatos();
    }
}

class ListaCabecera{
    constructor(){
        this.primero = null;
    }

    // para añadir recibimos por parámetro ya el nodo
    add(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato < this.primero.dato){
                // si el nodo nuevo es menor que el primero de la lista, pasa a ser el primero el nuevo
                nuevo.siguiente = this.primero;
                this.primero.anterior = nuevo;
                this.primero = nuevo;
            }else{
                // si no es menor que el primer dato de la lista, entonces se recorre toda la lista
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        // si el nodo es menor que la posición actual, se asigna un posición atrás
                        nuevo.siguiente = aux;
                        nuevo.anterior = aux.anterior;
                        aux.anterior.siguiente = nuevo;
                        aux.anterior = nuevo;
                        break;
                    }else if(aux.siguiente == null){
                        // si el nodo siguiente es nulo, entonces el nuevo nodo irá de último
                        nuevo.anterior = aux;
                        aux.siguiente = nuevo;
                        break;
                    }
                    aux = aux.siguiente;
                }
            }
        }
    }

    // método para verificar si existe la cabecera donde se quiere añadir un dato
    buscarCabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }
            aux = aux.siguiente;
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log('pos: ' + aux.dato)
            aux = aux.siguiente;
        }
    }
}


class Matrix{
    constructor(){
        // creamos las cabeceras tanto de x como de y
        this.cabeceraX = new ListaCabecera();
        this.cabeceraY = new ListaCabecera();
    }

    add(dato, x, y){
        // primero verificamos si las cabeceras ya existen
        let nodoX = this.cabeceraX.buscarCabecera(x);
        let nodoY = this.cabeceraY.buscarCabecera(y);

        // si no existen los nodos los creamos
        if(nodoX == null){
            nodoX = new NodoCabecera(x);
            // incertamos la cabecera que se acaba de crear
            this.cabeceraX.add(nodoX);
        }
        if(nodoY == null){
            nodoY = new NodoCabecera(y);
            // incertamos la cabecera que se acaba de crear
            this.cabeceraY.add(nodoY);
        }

        // incertamos el dato en las cabeceras x & y
        nodoX.listaDatos.addX(dato, x, y);
        nodoY.listaDatos.addY(dato, x, y);
    }

    recorrerMatrix(){
        // recorremos la cabecera de x y sus listas internas
        console.log('==== Cabeceras X ====');
        let aux = this.cabeceraX.primero;
        while(aux != null){
            // cabeceras
            console.log('   pos: ' + aux.dato);
            let aux2 = aux.listaDatos.primero;
            while(aux2 != null){
                // datos internos
                console.log('       dato:' + aux2.dato);
                aux2 = aux2.derecha;
            }
            aux = aux.siguiente;
        }

        console.log('==== Cabeceras Y ====');
        aux = this.cabeceraY.primero;
        while(aux != null){
            // cabeceras
            console.log('   pos: ' + aux.dato);
            let aux2 = aux.listaDatos.primero;
            while(aux2 != null){
                // datos internos
                console.log('       dato:' + aux2.dato);
                aux2 = aux2.abajo;
            }
            aux = aux.siguiente;
        }
    }
}

// let matriz1 = new Matrix();

// matriz1.add(0,0,0);
// matriz1.add(12,0,1);
// matriz1.add(5,1,1);
// matriz1.add(6,2,3);
// matriz1.add(1,10,1);
// matriz1.add(2,1,2);
// matriz1.add(7,3,3);

// matriz1.recorrerMatrix();