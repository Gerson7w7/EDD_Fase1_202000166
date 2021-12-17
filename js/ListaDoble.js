class NodoLista {
    constructor(dato) {
        this.dato = dato;
        this.anterior = null;
        this.siguiente = null;
        this.matrix = new Matrix();
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
            let repetido = this.repetido(dato, this.primero)
            if(repetido){
                console.log('Dato repetido, no se insertó: ' + dato + ' :(');
                return;
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
            // aumentando tamaño
            this.size++;
        }
    }

    // método para verificar si hay algún dato repetido
    repetido(dato, aux) {
        if(typeof(dato) == typeof(1)){   
            while(aux != null) {
                if(aux.dato == dato) {
                    return true;
                }
                aux = aux.siguiente;
            }
        }else{
            while(aux != null) {
                if(aux.dato.id == dato.id) {
                    return true;
                }
                aux = aux.siguiente;
            }
        }
        return false;
    }

    delete(id){

    }

    // método para guardar la matriz con los eventos 
    addMatrix(mes, dato, x, y){
        let aux = this.primero;
        while(aux != null){
            if(mes == aux.dato){
                aux.matrix.add(dato, x, y);
                break;
            }
            aux = aux.siguiente;
        }
    }

    deserealizarEDD(){
        let aux = this.primero;
        let s = new Serealizacion();
        while(aux != null){
            aux.matrix = s.cambiazo(new Matrix(), aux.matrix);
            aux = aux.siguiente;
        } 
    }

    mostrar() {
        let aux = this.primero;
        console.log('====LISTA CLIENTES====')
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

    mostrar2() {
        let aux = this.primero;
        console.log('====LISTA MESES====')
        while(aux != null) {
            console.log('-----------------------');
            console.log('->' + aux.dato);
            if (aux.siguiente != null){
                console.log('->siguiente ' + aux.siguiente.dato);
            }
            if (aux.anterior != null){
                console.log('->anterior ' + aux.anterior.dato);
            }         
            aux = aux.siguiente;
        }
    }
}