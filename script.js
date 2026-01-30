const formulario = document.getElementById('miFormulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const btn = document.getElementById('btnEnviar');
    const textoOriginal = btn.innerText;
    
    btn.innerText = 'Guardando en Excel...';
    btn.disabled = true;

    // 1. Recogemos los datos
    const formData = new FormData(formulario);
    const data = Object.fromEntries(formData);

    // 2. FORZAMOS LA CÉDULA (Asegúrate que en Excel diga "Cedula")
    data['Cedula'] = document.getElementById('cedula').value;

    try {
        const response = await fetch('https://sheetdb.io/api/v1/t3134251z9xjz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [data] })
        });

        if (response.ok) {
            alert('¡Excelente! La información se guardó correctamente en el Excel.');
            formulario.reset(); 
        } else {
            alert('Error al guardar. Revisa que los nombres en el Excel coincidan.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema de conexión.');
    } finally {
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
});