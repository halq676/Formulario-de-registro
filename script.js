const formulario = document.getElementById('miFormulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const btn = document.getElementById('btnEnviar');
    const textoOriginal = btn.innerText;
    
    btn.innerText = 'Guardando...';
    btn.disabled = true;

    // Extraemos los valores manualmente de cada cuadro del formulario
    const nombreVal = document.getElementById('nombre').value;
    const cedulaVal = document.getElementById('cedula').value;
    const direccionVal = document.getElementById('direccion').value;
    const municipioVal = document.getElementById('municipio').value;
    const dedicacionVal = document.getElementById('dedicacion').value;
    const profesionVal = document.getElementById('profesion').value;

    // CREAMOS EL PAQUETE EXACTO PARA TU EXCEL
    // Importante: Los nombres a la izquierda deben ser IDENTICOS a la fila 1 de tu Excel
    const datosParaExcel = {
        "Nombres_Apellidos": nombreVal,
        "Cedula": String(cedulaVal), // Lo convertimos a texto para que Excel no lo ignore
        "Direccion": direccionVal,
        "Municipio": municipioVal,
        "Dedicacion": dedicacionVal,
        "Profesion": profesionVal
    };

    try {
        const response = await fetch('https://sheetdb.io/api/v1/t3134251z9xjz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [datosParaExcel] })
        });

        if (response.ok) {
            alert('¡Registro exitoso! Tu informacion ha sido registrada .');
            formulario.reset(); 
        } else {
            alert('Lo sentimos, hubo un error al enviar el formulario. Inténtalo de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión con el servidor.');
    } finally {
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
});