// función para agregar un evento
function registrar(){
    // deserealizando a los vendedores y eventos
    let s = new Serealizacion();
    let arbolVendedores = new AVL();
    arbolVendedores = s.deserealizar(arbolVendedores, 'v');
    arbolVendedores.deserealizarEDD(arbolVendedores.raiz);
    // deserealizando el usuario que ingresó
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    // obteniendo datos del form
    let form = document.getElementById('regEvento');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let mes = document.getElementById('mes').value; 
        let dia = document.getElementById('dia').value; 
        let hora = document.getElementById('hora').value;
        let desc = document.getElementById('desc').value;
        // actualizando el arbol de vendedores en el local storage
        arbolVendedores.addMes(usuario, mes, arbolVendedores.raiz);
        arbolVendedores.addMatrixEventos(usuario, mes, desc, dia, hora, arbolVendedores.raiz);
        localStorage.setItem('arbolVendedores', CircularJSON.stringify(arbolVendedores));
        document.getElementById('notificacionRE').innerHTML = 'Se ha registrado el evento! :D';
    });
}

registrar();