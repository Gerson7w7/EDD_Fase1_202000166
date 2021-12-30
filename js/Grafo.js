class NodoGrafo{
    constructor(id, distancia){
        this.id = id;
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

    add(id, distancia){
        // creando en nuevo nodo
        let nuevo = new NodoGrafo(id, distancia);
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
    }

    add(id){
        // creando en nuevo nodo
        let nuevo = new NodoGrafo(id, 0);
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

    // método para encontrar un nodo
    buscar(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.id == id){
                return aux;
            }
            aux = aux.siguiente;
        }
        // si no ecuentra el nodo, retorna nulo
        return null;
    }

    addAdyacente(id, idAdyacente, distancia){
        // buscando el nodo principal para insertar su adyacente
        let principal = this.buscar(id);
        if(principal != null){
            principal.adyacentes.add(idAdyacente, distancia);
        }else{
            console.log('no existe el nodo');
        }
    }

    graficar(){
        let cadena = "digraph grafo {\n rankdir=\"LR\" \n concentrate=true \n"
        let aux = this.primero;
        // graficando los nodos
        while(aux != null){
            cadena += "n" + aux.id + "[label= \"" + aux.id + "\"];\n"
            aux = aux.siguiente;
        }
        // graficando las relaciones de los nodos
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyacentes.primero;
            while(aux2 != null){
                cadena += "n" + aux.id + " -> n" + aux2.id + " [label=\"" + aux2.distancia + "\"];\n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        return cadena;
    }
}