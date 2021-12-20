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
        this.dot = '';
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

    delete(dato){
        this.raiz = this.delete2(dato, this.raiz);
    }

    // no se autobalancean
    delete2(dato, aux){
        if(aux.dato.id == dato){ // si el dato es igual al nodo
            if(aux.izquierda == null){ // si no tiene hijos izq, no se debe de intercambiar
                if(aux.derecha == null){ // si no tiene hijos der, es una hoja
                    return null;
                }else{
                    aux = aux.derecha; // su hijo der pasa a ser el nuevo aux                  
                }
            }else{ // si tiene hijos izq, hay que hacer un intercambio
                let auxIzq = aux.izquierda;
                let auxDer = aux.derecha;
                aux = this.intercambio(aux.izquierda);
                if(aux != auxIzq){
                    aux.izquierda = auxIzq;
                    aux.derecha = auxDer;
                }else{
                    aux.derecha = auxDer;
                }         
            }    
        }else if(dato < aux.dato.id){ // si el dato es menor que el nodo
            aux.izquierda = this.delete2(dato, aux.izquierda);
        }else if(dato > aux.dato.id){ // si el dato es mayor que el nodo
            aux.derecha = this.delete2(dato, aux.derecha);
        }
        // retornando el arbol
        return aux;
    }

    intercambio(aux){
        if(aux.derecha != null){
            let der = aux.derecha;
            if(aux.derecha.derecha == null){
                aux.derecha = null;
            }
            aux = this.intercambio(der);        
        }
        return aux;
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
            console.log(aux.dato.id);
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

    // graficando arbol
    dotgen(aux) {
        if (aux != null) {
            if (aux.izquierda != null){
                this.dot += aux.dato.id + '--' + aux.izquierda.dato.id + ';';
            } 
            if (aux.derecha != null){
                this.dot += aux.dato.id + '--' + aux.derecha.dato.id + ';';
            } 				
            this.dotgen(aux.izquierda);
            this.dotgen(aux.derecha);
        }
    }

    graphviz(){
        let cadena = "digraph arbol {<br>\n";
        cadena += this.nodosGraphviz(this.raiz);
        cadena +="<br>\n";
        cadena +=this.enlazarGraphviz(this.raiz);
        cadena +="<br>\n}";
        return cadena;
    }

    nodosGraphviz(aux){ //metodo preorden
        let nodos = "";
        if(aux != null){
            nodos += "n" + aux.dato.id + "[label=\"" + aux.dato.id + "\"]<br>\n";
            nodos += this.nodosGraphviz(aux.izquierda);
            nodos += this.nodosGraphviz(aux.derecha);
        }
        return nodos;
    }

    enlazarGraphviz(aux){
        let cadena = "";
        if(aux != null){
            cadena += this.enlazarGraphviz(aux.izquierda);
            cadena += this.enlazarGraphviz(aux.derecha);
            //validaciones
            if(aux.izquierda != null){
                cadena += "n" + aux.dato.id + "-> n" + aux.izquierda.dato.id + "<br>\n";
            }
            if(aux.derecha != null){
                cadena += "n" + aux.dato.id + "-> n" + aux.derecha.dato.id + "<br>\n";
            }       
        }
        return cadena;
    }  
}