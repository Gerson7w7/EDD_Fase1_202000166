function graficarAVL() {
    let s = new Serealizacion();
    let arbolVendedores = new AVL();

    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    document.getElementById('graphvizU').innerHTML = arbolVendedores.graphviz()
    arbolVendedores.dot = '{'
    arbolVendedores.dotgen(arbolVendedores.raiz);
    arbolVendedores.dot += '}'

    // tabla con todos los datos necesarios
    let inner = '';
    inner = tablaAVL(inner, arbolVendedores.raiz);
    document.getElementById('tablaUsuarios').innerHTML += inner;

    // usando la librería de vis-network
    let container = document.getElementById("grafUsuarios");
    let DOTstring = arbolVendedores.dot;
    let parsedData = vis.parseDOTNetwork(DOTstring);
    let data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    let options = {
        nodes: {
            widthConstraint: 20,
        },
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
    };
    let network = new vis.Network(container, data, options);
}

function graficarABB() {
    let s = new Serealizacion();
    let arbolProveedores = new ABB();

    arbolProveedores = s.deserealizar(arbolProveedores, 'p');
    document.getElementById('graphvizP').innerHTML = arbolProveedores.graphviz()
    arbolProveedores.dot = '{'
    arbolProveedores.dotgen(arbolProveedores.raiz);
    arbolProveedores.dot += '}'

    // tabla con todos los datos necesarios
    let inner = '';
    inner = tablaABB(inner, arbolProveedores.raiz);
    document.getElementById('tablaProveedores').innerHTML += inner;

    // usando la librería de vis-network
    let container = document.getElementById("grafProveedores");
    let DOTstring = arbolProveedores.dot;
    let parsedData = vis.parseDOTNetwork(DOTstring);
    let data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    let options = {
        nodes: {
            widthConstraint: 20,
        },
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
    };
    let network = new vis.Network(container, data, options);
}

function graficarListaDoble() {
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD()
    let inner = '';
    inner = op(inner, arbolVendedores.raiz);
    document.getElementById('idCliente').innerHTML = inner;

    let form = document.getElementById('gCliente');
    form.addEventListener('input', function (event) {
        event.preventDefault();
        let id = document.getElementById('idCliente').value;
        console.log(id);

        let lista = new ListaDoble();
        Object.assign(lista, arbolVendedores.retornarListaClientes(parseInt(id), lista, arbolVendedores.raiz));
        document.getElementById('graphvizC').innerHTML = lista.graphviz();
        lista.dot = '{';
        lista.dotgen();
        lista.dot += '}';

        let row = document.getElementById('tablaCliente')
        row.innerHTML = '<thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Correo</th></tr></thead>'
        let aux = lista.primero;
        while (aux != null) {
            row.innerHTML += '<tr><td>' + aux.dato.id + '</td><td>' + aux.dato.nombre + '</td><td>' + aux.dato.correo + '</td></tr>';
            aux = aux.siguiente;
        }

        // usando la librería de vis-network
        let container = document.getElementById("grafClientes");
        let DOTstring = lista.dot;
        let parsedData = vis.parseDOTNetwork(DOTstring);
        let data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
        }
        let options = {
            nodes: {
                widthConstraint: 20,
            },
            layout: {
                hierarchical: {
                    levelSeparation: 100,
                    nodeSpacing: 100,
                    parentCentralization: false,
                    direction: 'UD',        // UD, DU, LR, RL
                    sortMethod: 'directed',  // hubsize, directed
                    shakeTowards: 'roots'  // roots, leaves                        
                },
            },
        };
        let network = new vis.Network(container, data, options);
    });
}

function graficarMatrix() {
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD()
    let inner1 = '';
    inner1 = op(inner1, arbolVendedores.raiz);
    document.getElementById('idVendedor').innerHTML = inner1;

    let form = document.getElementById('gCalendario');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let id = document.getElementById('idVendedor').value;
        let mes = document.getElementById('mes').value;
        console.log(id)
        console.log(mes)
        // lista con los meses y matrices
        let lista = new ListaDoble();
        Object.assign(lista, arbolVendedores.retornarListaMeses(parseInt(id), lista, arbolVendedores.raiz));
        let aux = lista.primero;
        while (aux != null) {
            if (aux.dato == parseInt(mes)) {
                let matrix = new Matrix();
                Object.assign(matrix, aux.matrix);
                document.getElementById('graphviz').innerHTML = matrix.graficarMatriz()
                matrix.dot = '{';
                matrix.dotgen();
                matrix.dot += '}';
                // usando la librería de vis-network
                let container = document.getElementById("grafCalendario");
                let DOTstring = matrix.dot;
                let parsedData = vis.parseDOTNetwork(DOTstring);
                let data = {
                    nodes: parsedData.nodes,
                    edges: parsedData.edges
                }
                let options = {};
                let network = new vis.Network(container, data, options);
                matrix.graficarMatriz();
                break;
            }
            aux = aux.siguiente;
        }
    });
}

function graficarB() {
    let s = new Serealizacion();
    let arbolInventario = new ArbolB();
    arbolInventario = s.deserealizar(arbolInventario, 'i');
    arbolInventario.raiz = arbolInventario.deserealizarEDD(arbolInventario.raiz);
    document.getElementById('graphvizI').innerHTML = arbolInventario.graphviz()
    console.log(arbolInventario.graphviz())
    arbolInventario.dotgen();

    // tabla con todos los datos necesarios
    let inner = '';
    inner = tablaB(inner, arbolInventario.raiz);
    document.getElementById('tablaInventario').innerHTML += inner;

    // usando la librería de vis-network
    let container = document.getElementById("grafInventario");
    let DOTstring = arbolInventario.dot;
    let parsedData = vis.parseDOTNetwork(DOTstring);
    let data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    let options = {
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 250,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
    };
    let network = new vis.Network(container, data, options);
}

function graficarHash() {
    let s = new Serealizacion();
    let hashProductos = new TablaHash();
    hashProductos = s.deserealizar(hashProductos, 'f');
    hashProductos.deserealizarEDD();
    console.log(hashProductos)
    document.getElementById('graphvizF').innerHTML = hashProductos.graphviz()
    hashProductos.dotgen();

    // tabla con todos los datos necesarios
    let inner = '';
    inner = tablaHash(inner, hashProductos);
    document.getElementById('tablaFactura').innerHTML += inner;

    // usando la librería de vis-network
    let container = document.getElementById("grafFactura");
    let DOTstring = hashProductos.dot;
    let parsedData = vis.parseDOTNetwork(DOTstring);
    let data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    let options = {
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 250,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },
    };
    let network = new vis.Network(container, data, options);
}

function op(inner, aux) {
    if (aux != null) {
        inner = this.op(inner, aux.izq);
        inner += '<option>' + aux.dato.id + '</option>';
        inner = this.op(inner, aux.der);
    }
    return inner;
}

function tablaAVL(inner, aux) {
    if (aux != null) {
        inner = this.tablaAVL(inner, aux.izq);
        inner += '<tr><td>' + aux.dato.id + '</td><td>' + aux.dato.nombre + '</td><td>' + aux.dato.username + '</td><td>' +
            aux.dato.edad + '</td><td>' + aux.dato.correo + '</td><td>' + aux.dato.password + '</td></tr>';
        inner = this.tablaAVL(inner, aux.der);
    }
    return inner;
}

function tablaABB(inner, aux) {
    if (aux != null) {
        inner = this.tablaABB(inner, aux.izquierda);
        inner += '<tr><td>' + aux.dato.id + '</td><td>' + aux.dato.nombre + '</td><td>' + aux.dato.direccion + '</td><td>' +
            aux.dato.telefono + '</td><td>' + aux.dato.correo + '</td></tr>';
        inner = this.tablaABB(inner, aux.derecha);
    }
    return inner;
}

function tablaB(inner, auxRaiz) {
    let aux = auxRaiz.claves.primero;
    while (aux != null) {
        inner += '<tr><td>' + aux.dato.id + '</td><td>' + aux.dato.nombre + '</td><td>' + aux.dato.precio + '</td><td>' +
            aux.dato.cantidad + '</td></tr>';
        aux = aux.siguiente;
    }
    if (!auxRaiz.esHoja(auxRaiz)) {
        //recorrer los hijos de cada clave
        aux = auxRaiz.claves.primero;
        while (aux != null) {
            inner = this.tablaB(inner, aux.izquierda);
            aux = aux.siguiente;
        }
        inner = this.tablaB(inner, auxRaiz.claves.ultimo.derecha);
    }
    return inner;
}

function tablaHash(inner, aux) {
    for (let i = 0; i < aux.size; i++) {
        if (aux.claves[i] != null) {
            inner += '<tr><td>' + aux.claves[i].dato.idVenta + '</td><td>' + aux.claves[i].dato.nVendedor + '</td><td>' + aux.claves[i].dato.nCliente + '</td><td>' +
                aux.claves[i].dato.total + '</td><td>';

            let auxLista = aux.claves[i].dato.productos.primero;
            while (auxLista != null) {
                inner += auxLista.dato.nombre + ', ';
                auxLista = auxLista.siguiente;
            }
            inner += '</td></tr>'
        }
    }
    return inner;
}

graficarAVL();
graficarABB();
graficarListaDoble();
graficarMatrix();
graficarB();
graficarHash()