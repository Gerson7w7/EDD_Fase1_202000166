class Serealizacion {
    constructor() { }

    serealizar(objects, tipo) {
        objects = CircularJSON.parse(objects);
        let arbolVendedores = new AVL();
        // deserealizando
        arbolVendedores = this.deserealizar(arbolVendedores, "v");
        // notificacion de carga exitosa o erronea
        let notificacion = document.getElementById('notificacionCA');
        notificacion.innerHTML = 'Creo que algo ha salido mal:('

        if (tipo == "Clientes") {
            // creando los clientes y guardándolos en el local storage
            objects.vendedores.forEach((v) => {
                let lClientes = new ListaDoble();
                v.clientes.forEach((c) => {
                    let cliente = new Cliente(c.id, c.nombre, c.correo);
                    lClientes.add(cliente);
                });
                arbolVendedores.addLista(v.id, lClientes, arbolVendedores.raiz);
            });
            localStorage.setItem("arbolVendedores", CircularJSON.stringify(arbolVendedores)); // ===================posiblemente pueda ir de los else if
            notificacion.innerHTML = 'Se ha cargado exitosamente los Clientes! :D'

        } else if (tipo == "Eventos") {
        } else if (tipo == "Proveedores") {
            let arbolProveedores = new ABB();
            // creando los proveedores y guardándolos en el local storage
            objects.proveedores.forEach((p)=> {
                let proveedor = new Proveedor(p.id, p.nombre, p.direccion, p.telefono, p.correo);
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
            localStorage.setItem("arbolVendedores", CircularJSON.stringify(arbolVendedores)); // ===================posiblemente pueda ir de los else if
            notificacion.innerHTML = 'Se ha cargado exitosamente los Vendedores! :D'
        }
    }

    deserealizar(tipoObjeto, tipo) {
        let json;
        if (tipo == "v") {
            // deserealizando los vendedores
            json = CircularJSON.parse(localStorage.getItem("arbolVendedores"));
        } else if (tipo == "e") {
            json = CircularJSON.parse(localStorage.getItem(""));
        } else if (tipo == "p") {
            json = CircularJSON.parse(localStorage.getItem(""));
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