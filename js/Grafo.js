class NodoGrafo{
    constructor(dato, distancia){
        this.dato = dato;
        this.distancia = distancia;
        this.siguiente = null;
        this.anterior = null;     
        this.adyacentes = new ListaAdyacente();
    }
}

class ListaAdyacente{
    constructor(){
        this.primero = null;
    }

    add(dato, distancia){
        // creando en nuevo nodo
        let nuevo = new NodoGrafo(dato, distancia);
        // si no hay nodos, es el primero
        if(this.primero == null){
            this.primero = nuevo;
        // si ya hay datos, recorremos la lista
        }else{
            let aux = this.primero;
            while(aux != null){
                if(aux.siguiente == null){
                    aux.siguiente = nuevo;
                    nuevo.anterior = aux;
                    return nuevo;
                }
                aux = aux.siguiente;
            }
        }
    }
}

class Grafo{
    constructor(){
        this.primero = null;
        this.dot = '';
    }

    add(dato){
        // creando en nuevo nodo
        let nuevo = new NodoGrafo(dato, 0);
        // si no hay nodos, es el primero
        if(this.primero == null){
            this.primero = nuevo;
        // si ya hay datos, recorremos la lista
        }else{
            let aux = this.primero;
            while(aux != null){
                if(aux.siguiente == null){
                    aux.siguiente = nuevo;
                    nuevo.anterior = aux;
                    return nuevo;
                }
                aux = aux.siguiente;
            }
        }
    }

    deserealizarEDD(){
        let s = new Serealizacion()
        let aux = this.primero;
        while(aux != null){
            aux.adyacentes = s.cambiazo(new ListaAdyacente(), aux.adyacentes);
            aux = aux.siguiente;
        }
    }

    // método para encontrar un nodo
    buscar(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato.id == id){
                return aux;
            }
            aux = aux.siguiente;
        }
        // si no ecuentra el nodo, retorna nulo
        return null;
    }

    addAdyacente(id, datoAdyacente, distancia){
        // buscando el nodo principal para insertar su adyacente
        let principal = this.buscar(id);
        if(principal != null){
            principal.adyacentes.add(datoAdyacente, distancia);
        }else{
            console.log('no existe el nodo');
        }
    }

    calcularRuta(inicio, final, grafo){
        let cola = [];
        let aux = grafo.primero;
        while(aux != null){
            // buscando el nodo inicial
            if(aux.dato.id == inicio){
                // agregando a la cola el nodo inicial
                cola.push(aux);
                break;
            }
            aux = aux.siguiente;
        }

        // mientras la cola no esté vacía seguirá iterando
        while(cola.length != 0){
            let nodoActual = cola.shift();
            aux = grafo.primero;
            while(aux != null){
                // para tener sus adyacentes
                if(aux.dato.id == nodoActual.dato.id){
                    // agregando a la cola el nodo inicial
                    nodoActual.adyacentes = aux.adyacentes;
                    break;
                }
                aux = aux.siguiente;
            }
            if(nodoActual.dato.id == final){
                return nodoActual;
            }
            // crear los sucesores del nodo actual
            aux = nodoActual.adyacentes.primero;
            console.log('padre: ' + nodoActual.dato.id)
            while(aux != null){
                // agregando el nodo de donde vinieron
                aux.dato.camino = nodoActual;
                console.log('hijos: ' + aux.dato.id)
                // agregando el acumulado 
                aux.dato.acumulado += nodoActual.acumulado; 
                cola.push(aux);
                aux = aux.siguiente;
            }
            // ordenando la cola
            cola = this.bubbleSort(cola);
        }
        return null;
    }

    rutaOptima(inicio, final, grafo){
        let nodoActual = this.calcularRuta(inicio, final, grafo);
        console.log(nodoActual)
        let grafoSolucion = new Grafo();
        // while(nodoActual != null){
        //     grafoSolucion.add(nodoActual);
        //     nodoActual = nodoActual.dato.camino;
        // }
        return grafoSolucion;
    }

    // metodo de burbuja sacado de internet XD con una pequeña modificación para mi caso
    bubbleSort(array) {
        let swapped = true;
        do {
            swapped = false;
            for (let j = 0; j < array.length - 1; j++) {
                if (array[j].dato.acumulado > array[j + 1].dato.acumulado) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
        return array;
    }

    // ===============================  VIS JS  ==============================
    dotgen(){
        this.dot = "digraph arbolB{ \n";
        this.dot += "graph [rankdir = TB]\n";
        let aux = this.primero;
        // graficando los nodos
        while(aux != null){
            this.dot += "n" + aux.dato.id + "[label= \"" + aux.dato.id + ", " + aux.dato.nombre + "\"];\n"
            aux = aux.siguiente;
        }
        // graficando las relaciones de los nodos
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyacentes.primero;
            while(aux2 != null){
                this.dot += "n" + aux.dato.id + " -- n" + aux2.dato.id + " [label=\"" + aux2.distancia + "\"];\n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        this.dot += "} \n"
    }

    dotgenRutaOptima(){
        this.dot = "digraph arbolB{ \n";
        this.dot += "graph [rankdir = TB]\n";
        let aux = this.primero;
        // graficando los nodos
        while(aux != null){
            this.dot += "n" + aux.dato.id + "[label= \"" + aux.dato.id + ", " + aux.dato.nombre + "\"];\n"
            aux = aux.siguiente;
        }
        // graficando las relaciones de los nodos
        aux = this.primero;
        while(aux.siguiente != null){
            this.dot += "n" + aux.dato.id + " -- n" + aux.siguiente.dato.id + " [label=\"" + aux.siguiente.distancia + "\"];\n";
            aux = aux.siguiente;
        }
        this.dot += "} \n"
    }

    // ========================== GRAPHVIZ =============================
    graphvizRutaOptima(){
        let cadena = "graph grafo {</br>\n rankdir=\"LR\" </br>\n concentrate=true </br>\n"
        let aux = this.primero;
        // graficando los nodos
        while(aux != null){
            cadena += "n" + aux.dato.id + "[label= \"" + aux.dato.id + ", " + aux.dato.nombre + "\"];</br>\n"
            aux = aux.siguiente;
        }
        // graficando las relaciones de los nodos
        aux = this.primero;
        while(aux.siguiente != null){
            cadena += "n" + aux.dato.id + " -- n" + aux.siguiente.dato.id + " [label=\"" + aux.siguiente.distancia + "\"];</br>\n";
            aux = aux.siguiente;
        }
        cadena += "}"
        return cadena;
    }

    graphviz(){
        let cadena = "graph grafo {</br>\n rankdir=\"LR\" </br>\n concentrate=true </br>\n"
        let aux = this.primero;
        // graficando los nodos
        while(aux != null){
            cadena += "n" + aux.dato.id + "[label= \"" + aux.dato.id + ", " + aux.dato.nombre + "\"];</br>\n"
            aux = aux.siguiente;
        }
        // graficando las relaciones de los nodos
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyacentes.primero;
            while(aux2 != null){
                cadena += "n" + aux.dato.id + " -- n" + aux2.dato.id + " [label=\"" + aux2.distancia + "\"];</br>\n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        return cadena;
    }
}