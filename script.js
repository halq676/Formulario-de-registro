const formulario = document.getElementById('miFormulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const btn = document.getElementById('btnEnviar');
    const textoOriginal = btn.innerText;
    
    // Feedback visual para el usuario
    btn.innerText = 'Guardando en Excel...';
    btn.disabled = true;

    // Recogemos los datos del formulario
    const formData = new FormData(formulario);
    const data = Object.fromEntries(formData);

    try {
        // Enviamos los datos a tu API de SheetDB
        const response = await fetch('https://sheetdb.io/api/v1/t3134251z9xjz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [data] })
        });

        if (response.ok) {
            alert('¡Excelente! La información se guardó correctamente en el Excel.');
            formulario.reset(); // Limpia los campos
        } else {
            alert('Error al guardar. Verifica que los nombres de las columnas en Excel coincidan.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema de conexión. Inténtalo de nuevo.');
    } finally {
        // Restauramos el botón
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
});