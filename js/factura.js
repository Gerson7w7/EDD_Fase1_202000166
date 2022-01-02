function crearFactura(){
    console.log('holaa')
    let s = new Serealizacion();
    // facturas
    let hashFacturas = new TablaHash();
    hashFacturas = s.deserealizar(hashFacturas, 'f');
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
    });
    let form2 = document.getElementById('regFactura');
    form2.addEventListener('submit', function (event){
        event.preventDefault();
        let cliente = document.getElementById('cliente').value;
        
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