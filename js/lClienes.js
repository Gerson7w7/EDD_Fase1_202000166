function listar(){
    let s = new Serealizacion();
    let lClientes = new ListaDoble();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    lClientes = arbolVendedores.retornarListaClientes(usuario, lClientes, arbolVendedores.raiz);
    console.log(lClientes)
    let row = document.getElementById('listCliente')

    let aux = lClientes.primero;
    while(aux != null){
        row.innerHTML += '<tr><td>' + aux.dato.id + '</td><td>' + aux.dato.nombre + '</td><td>' + aux.dato.correo + '</td></tr>';
        aux = aux.siguiente;
    }
}

listar();