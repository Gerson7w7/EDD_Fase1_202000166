// obteniendo los datos de form del login
function login() {
    // creando un objeto de tipo admin
    const admin = new Administrador();
    // deserealizando
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');

    let form = document.getElementById('formLogin');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let username = document.getElementById('username').value; //obteniendo el user que se ingresó
        let password = document.getElementById('password').value; // obteniendo el password que se ingresó
        let error = document.getElementById('errorLogin')
        // validaciones para que entre al panel de admin o de usuario
        if(admin.username == username && admin.password == password) { // admin
            console.log('admin');   
            error.innerHTML= "<p></p>" 
            window.location.href = "./cargaDatos.html"; 
        }else { 
            let usuario = null;
            usuario = arbolVendedores.buscar(username, password, arbolVendedores.raiz, usuario);
            console.log(usuario)
            console.log(password)
            if(usuario != null){
                // usuario
                console.log('usuario');   
                error.innerHTML= "<p></p>" 
                localStorage.setItem('usuario', JSON.stringify(usuario.id));
                window.location.href = "./lClientes.html"; 
            }else{
                // error
                console.log('no admin');
                error.innerHTML="<p>Contraseña o usuario incorrecto :(</p>"
            }      
        }
    });   
}

// ejecutando
login();