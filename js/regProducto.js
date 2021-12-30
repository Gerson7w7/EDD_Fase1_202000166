// función para agregar un producto
function registrar(){
    // deserealizando a los empleados
    let s = new Serealizacion();
    let arbolInventario = new ArbolB();
    arbolInventario = s.deserealizar(arbolInventario, 'i');
    arbolInventario.raiz = arbolInventario.deserealizarEDD(arbolInventario.raiz);
    console.log(arbolInventario);
    // obteniendo datos del form
    let form = document.getElementById('regProducto');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let id = document.getElementById('id').value; 
        let nombre = document.getElementById('nombre').value;
        let precio = document.getElementById('precio').value; 
        let cantidad = document.getElementById('cantidad').value; 

        // actualizando el arbol de inventario en el local storage
        arbolInventario.add(new Producto(parseInt(id), nombre, parseFloat(precio), parseFloat(cantidad)));
        console.log(arbolInventario);
        localStorage.setItem('arbolInventario', CircularJSON.stringify(arbolInventario));
        document.getElementById('notificacionRProd').innerHTML = 'Se ha registrado el producto! :D';
    });
}

registrar();