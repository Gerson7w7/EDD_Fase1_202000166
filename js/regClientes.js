// función para agregar un cliente
function registrar(){
    // deserealizando a los clientes
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    // obteniendo datos del form
    let form = document.getElementById('regCliente');
    form.addEventListener('submit', function(event){
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

registrar();