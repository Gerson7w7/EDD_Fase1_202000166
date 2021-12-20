// función para agregar un proveedor
function registrar(){
    // deserealizando a los vendedores
    let s = new Serealizacion();
    let arbolProveedores = new ABB();
    arbolProveedores = s.deserealizar(arbolProveedores, 'p');
    // obteniendo datos del form
    let form = document.getElementById('regProveedor');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let id = document.getElementById('id').value; 
        let nombre = document.getElementById('nombre').value;
        let dir = document.getElementById('dir').value; 
        let tel = document.getElementById('tel').value; 
        let correo = document.getElementById('correo').value;

        // actualizando el arbol de vendedores en el local storage
        let proveedor = new Proveedor(parseInt(id), nombre, dir, parseInt(tel), correo);
        arbolProveedores.add(proveedor);
        localStorage.setItem('arbolProveedores', CircularJSON.stringify(arbolProveedores));
        document.getElementById('notificacionRP').innerHTML = 'Se ha registrado el proveedor! :D';
    });
}

function eliminar(){
    let form = document.getElementById('delProveedor');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // deserealizando a los clientes
        let s = new Serealizacion();
        let arbolProveedores = new ABB();
        arbolProveedores = s.deserealizar(arbolProveedores, 'p');
        // obteniendo el id del vendedor que se quiere eliminar
        let id = document.getElementById('idProveedor').value;
        // eliminando el cliente
        arbolProveedores.delete(parseInt(id));
        localStorage.setItem('arbolProveedores', CircularJSON.stringify(arbolProveedores));
        document.getElementById('notificacionEP').innerHTML = 'Se ha eliminado el proveedor correctamente.';
    });
}

function setProveedores(){
    // deserealizando a los vendedores
    let s = new Serealizacion();
    let arbolProveedores = new ABB();
    arbolProveedores = s.deserealizar(arbolProveedores, 'p');

    //arbolProveedores.inOrder(arbolProveedores.raiz)
    // poniendo los id de los vendedores en un select del html
    let inner = '';
    inner = op(inner, arbolProveedores.raiz);
    console.log(inner)
    document.getElementById('idProveedor').innerHTML = inner;
}

function op(inner, aux) {
    if (aux != null) {
        inner = this.op(inner, aux.izquierda);
        inner += '<option>' + aux.dato.id + '</option>';
        console.log(aux.dato.id)
        inner = this.op(inner, aux.derecha);
    }
    return inner;
}

registrar();
eliminar();