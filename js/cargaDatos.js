// función para cargar los archivos 
function carga(){
    let s = new Serealizacion();
    let form = document.getElementById('formCarga');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        // leyendo el tipo de archivo
        let tipo = document.getElementById('tipoArchivo').value;
        
        // leyendo el input file
        let data = document.getElementById('formFile').files[0];
        const fileReader = new FileReader();
        fileReader.onload = function () {
            s.serealizar(fileReader.result, tipo);   
        }
        fileReader.readAsText(data);
    })
}

carga();