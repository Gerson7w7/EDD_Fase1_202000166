class NodoAVL {
    constructor(dato) {
        this.dato = dato;
        this.izq = null;
        this.der = null;
        this.altura = 0;
    }
}

class AVL {
    constructor(){
        this.raiz = null;
        this.dot = '';
    }

    add(dato){
        let nuevo = new NodoAVL(dato);
        this.raiz = this.add2(nuevo, this.raiz);
    }

    add2(nuevo, aux){ 
        if(aux == null){
            return nuevo;
        }else if(nuevo.dato.id < aux.dato.id){ // izquierda
            aux.izq = this.add2(nuevo, aux.izq);
            // verificando la equivalencia mediante alturas
            if(this.altura(aux.izq) - this.altura(aux.der) == 2){
                if(nuevo.dato.id < aux.izq.dato.id){ // rotación izquierda-izquierda
                    aux = this.rii(aux);
                }else{ // rotación izquierda derecha
                    aux = this.rid(aux);
                }
            } 
        }else if(nuevo.dato.id > aux.dato.id){ // derecha
            aux.der = this.add2(nuevo, aux.der);
            // verificando la equivalencia mediante alturas
            if(this.altura(aux.izq) - this.altura(aux.der) == -2){
                if(nuevo.dato.id > aux.der.dato.id){ // rotación derecha-derecha
                    aux = this.rdd(aux);
                }else{ // rotación derecha izquierda
                    aux = this.rdi(aux);
                }
            } 
        }
        // alturas o profundidad de las ramas izq y der
        let hIzq = this.altura(aux.izq);
        let hDer = this.altura(aux.der);
        aux.altura = this.hMax(hIzq, hDer) + 1;
        // retornando el arbol rotado
        return aux;
    }

    altura(aux){ // retorna la altura del nodo
        if(aux == null){
            return -1;
        }
        return aux.altura;
    }

    hMax(h1, h2){ // retorna la altura máxima
        if(h1 > h2){
            return h1;
        }
        return h2;
    }

    // rotación izquierda izquierda
    rii(a1){
        // rotación simple por derecha
        let a2 = a1.izq;
        a1.izq = a2.der;
        a2.der = a1;
        // asignando alturas
        a1.altura = this.hMax(this.altura(a1.izq), this.altura(a1.der)) + 1;
        a2.altura = this.hMax(this.altura(a2.izq), a1.altura) + 1; 
        return a2;
    }

    // rotación derecha derecha
    rdd(a1){
        // rotación simple por izquierda
        let a2 = a1.der;
        a1.der = a2.izq;
        a2.izq = a1;
        // asignando alturas
        a1.altura = this.hMax(this.altura(a1.izq), this.altura(a2.der)) + 1;
        a2.altura = this.hMax(this.altura(a2.der), a1.altura) + 1;
        return a2;
    }

    // método para guardar las lista de los clientes a los vendedores
    addListaClientes(id, lista, aux){
        if(aux != null){
            this.addListaClientes(id, lista, aux.izq);
            if(aux.dato.id == id){ // si encuentra el id del vendedor            
                aux.dato.lClientes = lista;
            }
            this.addListaClientes(id, lista, aux.der);
        } 
    }

    // método para guardar un cliente a un vendedor
    addCliente(id, dato, aux){
        if(aux != null){
            this.addCliente(id, dato, aux.izq);
            if(aux.dato.id == id){ // si encuentra el id del vendedor            
                aux.dato.lClientes.add(dato);
            }
            this.addCliente(id, dato, aux.der);
        } 
    }

    // método para guardar las lista de meses para los eventos
    addListaEventos(id, lista, aux){
        if(aux != null){
            this.addListaEventos(id, lista, aux.izq);
            if(aux.dato.id == id){ // si encuentra el id del vendedor            
                aux.dato.eventos = lista;
            }
            this.addListaEventos(id, lista, aux.der);
        } 
    }

    // método para guardar un eventos
    addMes(id, mes, aux){
        if(aux != null){
            this.addMes(id, mes, aux.izq);
            if(aux.dato.id == id){ // si encuentra el id del vendedor            
                aux.dato.eventos.add(mes);
            }
            this.addMes(id, mes, aux.der);
        } 
    }

    // método para guardar la matriz para los eventos
    addMatrixEventos(id, mes, dato, x, y, aux){
        if(aux != null){
            this.addMatrixEventos(id, mes, dato, x, y, aux.izq);
            if(aux.dato.id == id){ // si encuentra el id del vendedor            
                aux.dato.eventos.addMatrix(mes, dato, x, y)
            }
            this.addMatrixEventos(id, mes, dato, x, y, aux.der);
        } 
    }

    buscar(username, password, aux, usuario){
        if(aux != null){
            usuario = this.buscar(username, password, aux.izq, usuario);
            // console.log('nombre: ' + aux.dato.username + ' password: ' + aux.dato.password)
            // console.log('nombre: ' + username + ' password: ' + password)
            if(aux.dato.username == username && aux.dato.password == password){
                console.log('nombre: ' + aux.dato.username + ' password: ' + aux.dato.password)
                return aux.dato;
            } 
            usuario = this.buscar(username, password, aux.der, usuario);
        } 
        return usuario;
    }

    // rotación izquierda derecha
    rid(a1){
        // rotación simple por la izquierda
        a1.izq = this.rdd(a1.izq);
        // rotación simple por la derecha
        return this.rii(a1);
    }    

    // rotación derecha izquierda
    rdi(a1){
        // rotación simple por la derecha
        a1.der = this.rii(a1.der);
        // rotación simple por la izquierda
        return this.rdd(a1);
    }

    deserealizarEDD(aux){
        if(aux != null){
            this.deserealizarEDD(aux.izq);
            let s = new Serealizacion();
            if(aux.dato.lClientes != null){
                aux.dato.lClientes = s.cambiazo(new ListaDoble(), aux.dato.lClientes);
                console.log('estoy aki')
                aux.dato.lClientes.mostrar(); 
            }if(aux.dato.eventos.primero != null){
                aux.dato.eventos = s.cambiazo(new ListaDoble(), aux.dato.eventos);
                aux.dato.eventos.deserealizarEDD();
                aux.dato.eventos.mostrar2(); 
            } 
            this.deserealizarEDD(aux.der);
        } 
    }

    // ========== RRECORRIDOS ========
    preOrder(aux){
        if(aux != null){
            console.log(aux.dato.id);
            this.preOrder(aux.izq);
            this.preOrder(aux.der);
        }
    }

    inOrder(aux){
        if(aux != null){
            this.inOrder(aux.izq);
            console.log(aux.dato.id); 
            //aux.dato.lClientes.mostrar(); 
            //aux.dato.eventos.mostrar2(); 
            this.inOrder(aux.der);
        } 
    }

    postOrder(aux){
        if(aux != null){
            this.postOrder(aux.izq);
            this.postOrder(aux.der);
            console.log(aux.dato.id);
        }
    }
}