// función para agregar un evento
function registrar(){
    // deserealizando a los vendedores y eventos
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    // obteniendo datos del form
    let form = document.getElementById('regEvento');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let mes = document.getElementById('mes').value; 
        let dia = document.getElementById('dia').value; 
        let hora = document.getElementById('hora').value;
        let desc = document.getElementById('desc').value;
        // actualizando el arbol de vendedores en el local storage
        arbolVendedores.addMes(usuario, parseInt(mes), arbolVendedores.raiz);
        arbolVendedores.addMatrixEventos(usuario, parseInt(mes), desc, parseInt(dia), parseInt(hora), arbolVendedores.raiz);
        localStorage.setItem('arbolVendedores', CircularJSON.stringify(arbolVendedores));
        document.getElementById('notificacionRE').innerHTML = 'Se ha registrado el evento! :D';
    });
}

function graficarMatrix() {
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD()
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let lista = new ListaDoble();
    lista = arbolVendedores.retornarListaMeses(usuario, lista, arbolVendedores.raiz);
    // poniendo en el select del html los meses que tiene el usuario
    let inner = '';
    let aux = lista.primero;
    while(aux != null){
        inner += '<option>' + aux.dato + '</option>';
        aux = aux.siguiente;
    }
    document.getElementById('mes').innerHTML = inner;

    let form = document.getElementById('gCalendario');
    form.addEventListener('input', function (event) {
        event.preventDefault();
        let mes = document.getElementById('mes').value;
        console.log(mes)
        //Object.assign(lista, arbolVendedores.retornarListaMeses(parseInt(id), lista, arbolVendedores.raiz));
        let aux = lista.primero;
        while (aux != null) {
            if (aux.dato == parseInt(mes)) {
                let matrix = new Matrix();
                Object.assign(matrix, aux.matrix);
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
                let options = {
                    // nodes: {
                    //     widthConstraint: 20,
                    // },
                    // layout: {
                    //     hierarchical: {
                    //         levelSeparation: 100,
                    //         nodeSpacing: 100,
                    //         parentCentralization: true,
                    //         direction: 'UD',        // UD, DU, LR, RL
                    //         sortMethod: 'directed',  // hubsize, directed
                    //         shakeTowards: 'roots'  // roots, leaves                        
                    //     },
                    // },
                };
                let network = new vis.Network(container, data, options);
                matrix.graficarMatriz();
                break;
            }
            aux = aux.siguiente;
        }
    });
}


registrar();
graficarMatrix();