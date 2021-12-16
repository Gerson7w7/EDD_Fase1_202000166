class Administrador {
    constructor() {
        this.username = 'Admin';
        this.password = '1234';
    }
}

class Vendedor {
    constructor(id, nombre, username, edad, correo, password) {
        this.id = id;
        this.nombre = nombre;
        this.username = username;
        this.edad = edad;
        this.correo = correo;
        this.password = password;
        this.lClientes = null;
    }
}

class Cliente {
    constructor(id, nombre, correo) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }
}

class Proveedor {
    constructor(id, nombre, direccion, telefono, correo) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }
}