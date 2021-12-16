class NodoLista {
    constructor(dato) {
        this.dato = dato;
        this.anterior = null;
        this.siguiente = null;
    }
}

class ListaDoble {
    constructor(){
        this.primero = null;
        this.size = 0;
    }

    add(dato){
        // creando el nuevo nodo con el dato
        let nuevo = new NodoLista(dato);
        // si es el primer dato de la lista lo asigna de primero
        if(this.primero == null){
            this.primero = nuevo;
            this.size++;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                aux = aux.siguiente;
            }
            // incertando en nuevo dato mediante punteros
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
            // aumentando tamaño
            this.size++;
        }
    }

    delete(id){

    }

    mostrar() {
        let aux = this.primero;
        console.log('====LISTA DOBLEMENTE ENLAZADA====')
        while(aux != null) {
            console.log('-----------------------');
            console.log('->' + aux.dato.id);
            if (aux.siguiente != null){
                console.log('->siguiente ' + aux.siguiente.dato.id);
            }
            if (aux.anterior != null){
                console.log('->anterior ' + aux.anterior.dato.id);
            }         
            aux = aux.siguiente;
        }
    }
}