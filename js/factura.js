function crearFactura(){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let s = new Serealizacion();
    // facturas
    let hashProductos = new TablaHash();
    hashProductos = s.deserealizar(hashProductos, 'f');
    // inventario
    let arbolInventario = new ArbolB();
    arbolInventario = s.deserealizar(arbolInventario, "i");
    arbolInventario.raiz = arbolInventario.deserealizarEDD(arbolInventario.raiz);
    // usuarios
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, "v");
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);

    let inner;
    inner = productosDisponibles(arbolInventario.raiz, inner);
    document.getElementById('productos').innerHTML = inner;
    let listaProductos = new ListaDoble()
    let form1 = document.getElementById('productosDisponibles');
    form1.addEventListener('submit', function (event){
        event.preventDefault();
        let idProducto = document.getElementById('productos').value;
        let cantidad = document.getElementById('cantidad').value;
        let producto;
        producto = arbolInventario.buscar(parseInt(idProducto), arbolInventario.raiz, producto);
        producto.cantidad = parseInt(cantidad);
        listaProductos.add(producto);
        document.getElementById('notificacionAP').innerHTML = 'Se ha añadido el producto! :D'
    });
    let form2 = document.getElementById('regFactura');
    form2.addEventListener('submit', function (event){
        event.preventDefault();
        let cliente = document.getElementById('cliente').value;
        // vendedor que está creando la factura
        let vendedor; 
        vendedor = arbolVendedores.buscarVendedor(usuario, vendedor, arbolVendedores.raiz);
        // creando la factura
        let factura = new Factura(vendedor.nombre, cliente);
        factura.productos = listaProductos;
        factura.total = factura.productos.totalProductos();
        // agregando al hash
        hashProductos.add(new NodoHash(factura)); 
        localStorage.setItem("hashProductos", CircularJSON.stringify(hashProductos));
        document.getElementById('notificacionRF').innerHTML = 'Se ha creado correctamente la factura! :D'
    });
}

function productosDisponibles(auxRaiz, inner){
    let aux = auxRaiz.claves.primero;
    while(aux != null){
        inner += '<option value="' + aux.dato.id + '">' + aux.dato.nombre + '</option>'
        aux = aux.siguiente;
    }
    if(!auxRaiz.esHoja(auxRaiz)){ 
        //recorrer los hijos de cada clave
        aux = auxRaiz.claves.primero;
        while(aux != null){
            inner = this.productosDisponibles(aux.izquierda, inner);
            aux = aux.siguiente;
        }
        inner = this.productosDisponibles(auxRaiz.claves.ultimo.derecha, inner); 
    }  
    return inner;
}

crearFactura();