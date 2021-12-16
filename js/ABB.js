class NodoABB{
    constructor(dato){
        this.dato = dato;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ABB{
    constructor(){
        this.raiz = null;
    }

    add(dato){
        let nuevo = new NodoABB(dato);
        if(this.raiz == null){
            this.raiz = nuevo;
        }else{
            this.add2(nuevo, this.raiz);
        }
    }

    add2(nuevo, aux){
        if(nuevo.dato.id < aux.dato.id){ // izquierda
            if(aux.izquierda == null){
                // asignando hoja izquierda
                aux.izquierda = nuevo;
            }else{
                this.add2(nuevo, aux.izquierda);
            }
        }else if(nuevo.dato.id > aux.dato.id){ // derecha
            if(aux.derecha == null){
                // asignando hoja izquierda
                aux.derecha = nuevo;
            }else{
                this.add2(nuevo, aux.derecha);
            }
        }
    }

    preOrder(aux){
        if(aux != null){
            console.log(aux.dato);
            this.preOrder(aux.izquierda);
            this.preOrder(aux.derecha);
        }
    }

    inOrder(aux){
        if(aux != null){          
            this.inOrder(aux.izquierda);
            console.log(aux.dato);
            this.inOrder(aux.derecha);
        }
    }

    postOrder(aux){
        if(aux != null){           
            this.postOrder(aux.izquierda);
            this.postOrder(aux.derecha);
            console.log(aux.dato);
        }
    }
}