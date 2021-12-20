// función para agregar un cliente
function registrar() {
    // deserealizando a los clientes
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    // obteniendo datos del form
    let form = document.getElementById('regCliente');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let id = document.getElementById('id').value;
        let nombre = document.getElementById('nombre').value;
        let correo = document.getElementById('correo').value;

        // actualizando el arbol de vendedores en el local storage
        let cliente = new Cliente(parseInt(id), nombre, correo);
        cliente = arbolVendedores.addCliente(usuario, cliente, arbolVendedores.raiz);
        localStorage.setItem('arbolVendedores', CircularJSON.stringify(arbolVendedores));
        document.getElementById('notificacionRU').innerHTML = 'Se ha registrado el cliente! :D';
    });
}

function eliminar(){
    let form = document.getElementById('delCliente');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // deserealizando el usuario que ingresó
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        // deserealizando a los clientes
        let s = new Serealizacion();
        let arbolVendedores = new AVL();
        arbolVendedores = s.deserealizar(arbolVendedores, 'v');
        arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
        // obteniendo el id del cliente que se quiere eliminar
        let id = document.getElementById('idCliente').value;
        // eliminando el cliente
        cliente = arbolVendedores.deleteCliente(usuario, parseInt(id), arbolVendedores.raiz);
        localStorage.setItem('arbolVendedores', CircularJSON.stringify(arbolVendedores));
        document.getElementById('notificacionEU').innerHTML = 'Se ha eliminado el cliente correctamente.';
    });
}

function setClientes(){
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    // deserealizando a los clientes
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
    let clientes = new ListaDoble();
    clientes = arbolVendedores.retornarListaClientes(usuario, clientes, arbolVendedores.raiz);

    // poniendo los id de los clientes en un select del html
    let inner = '';
    let aux = clientes.primero;
    while(aux != null){
        inner += '<option>' + aux.dato.id + '</option>';
        aux = aux.siguiente;
    }
    document.getElementById('idCliente').innerHTML = inner;
}

registrar();
eliminar();