class Serealizacion {
    constructor() { }

    serealizar(objects, tipo) {
        objects = CircularJSON.parse(objects);
        let arbolVendedores = new AVL();
        // deserealizando
        arbolVendedores = this.deserealizar(arbolVendedores, "v");
        // obteniendo los clientes y los meses de los eventos
        arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
        // notificacion de carga exitosa o erronea
        let notificacion = document.getElementById('notificacionCA');
        notificacion.innerHTML = 'Creo que algo ha salido mal:('

        if (tipo == "Clientes") {
            // creando los clientes y guardándolos en el local storage
            objects.vendedores.forEach((v) => {
                let lClientes = new ListaDoble();
                v.clientes.forEach((c) => {
                    let cliente = new Cliente(parseInt(c.id), c.nombre, c.correo);
                    lClientes.add(cliente);
                });
                arbolVendedores.addListaClientes(parseInt(v.id), lClientes, arbolVendedores.raiz);
            });
            localStorage.setItem("arbolVendedores", CircularJSON.stringify(arbolVendedores));
            notificacion.innerHTML = 'Se ha cargado exitosamente los Clientes! :D'

        } else if (tipo == "Eventos") {
            // creando los eventos y guardándolos en el local storage
            objects.vendedores.forEach((v)=> {
                let lEventos = new ListaDoble();        
                // primero guardamos los meses         
                v.eventos.forEach((e) => {
                    lEventos.add(e.mes);
                });
                arbolVendedores.addListaEventos(parseInt(v.id), lEventos, arbolVendedores.raiz);
                // ahora guardamos las matrices (eventos)
                v.eventos.forEach((e) => {
                    arbolVendedores.addMatrixEventos(parseInt(v.id), parseInt(e.mes), e.desc, parseInt(e.dia), parseInt(e.hora), arbolVendedores.raiz);
                });   
            });
            localStorage.setItem("arbolVendedores", CircularJSON.stringify(arbolVendedores));
            notificacion.innerHTML = 'Se ha cargado exitosamente los Eventos! :D'
        } else if (tipo == "Proveedores") {
            let arbolProveedores = new ABB();
            // creando los proveedores y guardándolos en el local storage
            objects.proveedores.forEach((p)=> {
                let proveedor = new Proveedor(parseInt(p.id), p.nombre, p.direccion, p.telefono, p.correo);
                arbolProveedores.add(proveedor);
            })
            localStorage.setItem('arbolProveedores', CircularJSON.stringify(arbolProveedores));
            notificacion.innerHTML = 'Se ha cargado exitosamente los Proveedores! :D'
        } else if (tipo == "Vendedores") {
            // creando los vendedores y guardándolos en el local storage
            objects.vendedores.forEach((v) => {
                let vendedor = new Vendedor(parseInt(v.id), v.nombre, v.username, parseInt(v.edad), v.correo, v.password);
                arbolVendedores.add(vendedor);
            });
            localStorage.setItem("arbolVendedores", CircularJSON.stringify(arbolVendedores));
            notificacion.innerHTML = 'Se ha cargado exitosamente los Vendedores! :D'
        } else if (tipo == "Inventario") {
            let arbolInventario = new ArbolB();
            // creando los productos y guardándolos en el local storage
            objects.productos.forEach((p) =>{
                arbolInventario.add(new Producto(parseInt(p.id), p.nombre, parseFloat(p.precio), parseInt(p.cantidad)));
            });
            localStorage.setItem("arbolInventario", CircularJSON.stringify(arbolInventario));
            notificacion.innerHTML = 'Se ha cargado exitosamente el Inventario! :D'
        } else if (tipo == "Facturas") {
            let arbolInventario = new ArbolB();
            // deserealizando
            arbolInventario = this.deserealizar(arbolInventario, "i");
            arbolInventario.raiz = arbolInventario.deserealizarEDD(arbolInventario.raiz);

            let hashProductos = new TablaHash();
            // creando los productos y guardándolos en el local storage
            objects.ventas.forEach((v) =>{
                let factura = new Factura(v.vendedor, v.cliente);
                v.productos.forEach((p) =>{
                    let producto;
                    producto = arbolInventario.buscar(p.id, arbolInventario.raiz, producto);
                    producto.cantidad = p.cantidad;
                    factura.productos.add(producto)
                });
                factura.total = factura.productos.totalProductos(); 
                hashProductos.add(new NodoHash(factura));
            });
            localStorage.setItem("hashProductos", CircularJSON.stringify(hashProductos));
            notificacion.innerHTML = 'Se ha cargado exitosamente las facturas! :D'
        }
    }

    deserealizar(tipoObjeto, tipo) {
        let json;
        if(tipo == "v") {
            // deserealizando los vendedores
            json = CircularJSON.parse(localStorage.getItem("arbolVendedores"));
        }else if (tipo == "p") {
            json = CircularJSON.parse(localStorage.getItem("arbolProveedores"));
        }else if (tipo == "i") {
            json = CircularJSON.parse(localStorage.getItem("arbolInventario"));
        }else if (tipo == "f") {
            json = CircularJSON.parse(localStorage.getItem("hashProductos"));
        }
        tipoObjeto = this.cambiazo(tipoObjeto, json);
        return tipoObjeto;
    }

    // el cambiazo te salva la vida
    cambiazo(tipoObjeto, json) {
        Object.assign(tipoObjeto, json);
        return tipoObjeto;
    }
}