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

registrar();