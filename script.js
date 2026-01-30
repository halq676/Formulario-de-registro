const formulario = document.getElementById('miFormulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const btn = document.getElementById('btnEnviar');
    const textoOriginal = btn.innerText;
    
    btn.innerText = 'Guardando...';
    btn.disabled = true;

    // Recogemos lo que el usuario escribió
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const direccion = document.getElementById('direccion').value;
    const municipio = document.getElementById('municipio').value;
    const dedicacion = document.getElementById('dedicacion').value;
    const profesion = document.getElementById('profesion').value;

    // CREAMOS EL PAQUETE (Los nombres a la izquierda deben ser IGUALES a tu Excel)
    const datosParaExcel = {
        "Nombres_Apellidos": nombre,
        "Cedula": cedula,   // <-- Con "C" mayúscula como en tu foto
        "Direccion": direccion,
        "Municipio": municipio,
        "Dedicacion": dedicacion,
        "Profesion": profesion
    };

    try {
        const response = await fetch('https://sheetdb.io/api/v1/t3134251z9xjz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [datosParaExcel] })
        });

        if (response.ok) {
            alert('¡Registro exitoso! Ya puedes revisar tu Excel.');
            formulario.reset(); 
        } else {
            alert('Error en el servidor de Excel.');
        }
    } catch (error) {
        alert('Error de conexión.');
    } finally {
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
});