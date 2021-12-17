// función para agregar un usuario (empleado o vendedor)
function registrar(){
    // deserealizando a los empleados
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    // obteniendo datos del form
    let form = document.getElementById('regUsuario');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let id = document.getElementById('id').value; 
        let nombre = document.getElementById('nombre').value;
        let username = document.getElementById('username').value; 
        let edad = document.getElementById('edad').value; 
        let correo = document.getElementById('correo').value;
        let password = document.getElementById('password').value;

        // actualizando el arbol de vendedores en el local storage
        let vendedor = new Vendedor(parseInt(id), nombre, username, parseInt(edad), correo, password);
        arbolVendedores.add(vendedor);
        localStorage.setItem('arbolVendedores', CircularJSON.stringify(arbolVendedores));
        document.getElementById('notificacionRU').innerHTML = 'Se ha registrado el usuario! :D';
    });
}

registrar();