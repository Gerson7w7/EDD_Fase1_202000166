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

    deserealizarEDD(){
        let s = new Serealizacion()
        let aux = this.primero;
        while(aux != null){
            aux.listaDatos = s.cambiazo(new ListaDatos(), aux.listaDatos);
            aux = aux.siguiente;
        }
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
        this.dot = '';
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

    deserealizarEDD(){
        let s = new Serealizacion();
        this.cabeceraX = s.cambiazo(new ListaCabecera(), this.cabeceraX);  
        this.cabeceraY = s.cambiazo(new ListaCabecera(), this.cabeceraY); 
        this.cabeceraX.deserealizarEDD();
        this.cabeceraY.deserealizarEDD(); 
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

    // graficando arbol
    dotgen() {
        let auxX = this.cabeceraX.primero;
        while(auxX.siguiente != null){
            // cabeceras
            this.dot += 'x' + auxX.dato + '--x' + auxX.siguiente.dato + ';';
            this.dot += 'x' + auxX.siguiente.dato + '--x' + auxX.dato + ';';
            auxX = auxX.siguiente;
        }
        if(this.cabeceraX.primero != null){
            this.dot += 'Matriz--x' + this.cabeceraX.primero.dato + ';';
        }

        let auxY = this.cabeceraY.primero;
        while(auxY.siguiente != null){
            // cabeceras
            this.dot += 'y' + auxY.dato + '--y' + auxY.siguiente.dato + ';';
            this.dot += 'y' + auxY.siguiente.dato + '--y' + auxY.dato + ';';
            auxY = auxY.siguiente;
        }
        if(this.cabeceraY.primero != null){
            this.dot += 'Matriz--y' + this.cabeceraY.primero.dato + ';';
        }

        auxX = this.cabeceraX.primero;
        while(auxX != null){
            let aux = auxX.listaDatos.primero;
            while(aux.derecha != null){
                this.dot += aux.dato + '--' + aux.derecha.dato + ';';
                this.dot += aux.derecha.dato + '--' + aux.dato + ';';
                aux = aux.derecha;
            }
            if(auxX.listaDatos.primero != null){
                this.dot += 'x' + auxX.dato + '--' + auxX.listaDatos.primero.dato + ';';        
            }
            auxX = auxX.siguiente;
        }

        auxY = this.cabeceraY.primero;
        while(auxY != null){
            let aux = auxY.listaDatos.primero;
            while(aux.abajo != null){
                this.dot += aux.dato + '--' + aux.abajo.dato + ';';
                this.dot += aux.abajo.dato + '--' + aux.dato + ';';
                aux = aux.abajo;
            }
            if(auxY.listaDatos.primero != null){
                this.dot += 'y' + auxY.dato + '--' + auxY.listaDatos.primero.dato + ';';        
            }
            auxY = auxY.siguiente;
        }
    }

    graficarMatriz(){
        let cadena = "";
        cadena += "digraph Matriz{ <br>\n";
        cadena += "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];<br>\n";
        cadena += "edge[style = \"bold\"]; <br>\n"

        cadena +="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;<br>"
        // graficando cabeceras en x
        let auxX = this.cabeceraX.primero;
        while(auxX != null){
            cadena += "node[label = " + auxX.dato + " fillcolor=\" azure1\" pos = \"" + auxX.dato + ",1!\"]x" + auxX.dato + ";<br>\n";
            auxX = auxX.siguiente;
        }
        auxX = this.cabeceraX.primero;
        while(auxX.siguiente != null){
            cadena += "x" + auxX.dato + "->x" + auxX.siguiente.dato + ";<br>\n";
            cadena += "x" + auxX.siguiente.dato + "->x" + auxX.dato + ";<br>\n";
            auxX = auxX.siguiente;
        }

        if(this.cabeceraX.primero != null){
            cadena += "principal->x" + this.cabeceraX.primero.dato + ";<br>\n";
        }
        // graficando cabeceras en y
        let auxY = this.cabeceraY.primero;
        while(auxY != null){
            cadena += "node[label = " + auxY.dato + " fillcolor=\" azure1\" pos = \"-1,-" + auxY.dato + "!\"]y" + auxY.dato + ";<br>\n";
            auxY = auxY.siguiente;
        }
        auxY = this.cabeceraY.primero;
        while(auxY.siguiente != null){
            cadena += "y" + auxY.dato + "->y" + auxY.siguiente.dato + ";<br>\n";
            cadena += "y" + auxY.siguiente.dato + "->y" + auxY.dato + ";<br>\n";
            auxY = auxY.siguiente;
        }
        if(this.cabeceraX.primero != null){
            cadena += "principal->y" + this.cabeceraY.primero.dato + ";<br>\n";
        }

        // graficando los nodos internos
        auxX = this.cabeceraX.primero;
        while(auxX != null){ 
            let aux = auxX.listaDatos.primero;
            while(aux != null){
                cadena += "   node[label = " + aux.dato + " fillcolor=\" gold2\" pos = \"" + aux.x + ",-" + aux.y + "!\"]x" + aux.x + "y" + aux.y + ";<br>\n";
                aux = aux.derecha;
            }
            // graficando las flechitas de x
            aux = auxX.listaDatos.primero;
            while(aux.derecha != null){
                cadena += "   x" + aux.x + "y" + aux.y + "->x" + aux.derecha.x + "y" + aux.derecha.y + ";<br>\n";
                cadena += "   x" + aux.derecha.x + "y" + aux.derecha.y + "->x" + aux.x + "y" + aux.y + ";<br>\n";
                aux = aux.derecha;
            }
            if(auxX.listaDatos.primero != null){
                cadena += "x" + auxX.dato + "->x" + auxX.listaDatos.primero.x + "y" + auxX.listaDatos.primero.y + ";<br>\n";
            }
            auxX = auxX.siguiente;
        }

        auxY = this.cabeceraY.primero;
        while(auxY != null){ 
            // graficando las flechitas de y
            let aux = auxY.listaDatos.primero;
            while(aux.abajo != null){
                cadena += "   x" + aux.x + "y" + aux.y + "->x" + aux.abajo.x + "y" + aux.abajo.y + ";<br>\n";
                cadena += "   x" + aux.abajo.x + "y" + aux.abajo.y + "->x" + aux.x + "y" + aux.y + ";<br>\n";
                aux = aux.abajo;
            }
            if(auxY.listaDatos.primero != null){
                cadena += "y" + auxY.dato + "->x" + auxY.listaDatos.primero.x + "y" + auxY.listaDatos.primero.y + ";<br>\n";
            }
            auxY = auxY.siguiente;
        }
        cadena += "<br>\n}"
        console.log(cadena);
        return cadena;
    }
}